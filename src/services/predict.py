from typing import BinaryIO
from src.db.db import Session
from src.models.city import City
from src.models.card import Card
from src.models.terminal import Terminal
from src.models.transaction import Transaction
from src.models.operation import Operation
from src.models.operation_type import OperationType
from src.models.terminal_type import TerminalType
from src.models.client import Client
from src.models.predict_view import PredictView
from sqlalchemy import select, update
from sklearn.preprocessing import LabelEncoder
from datetime import datetime, date
from dateutil.relativedelta import relativedelta
import pandas as pd
import numpy as np


class PredictService:

    @staticmethod
    def find_age_factor(age):
        if age > 60:
            return 0.4
        return 0

    @staticmethod
    def find_amount_factor(amount):
        if amount >= 100000:
            return 0.5
        return 0

    @staticmethod
    def find_time_factor_dif(time):
        if time >= 6:
            return 0.00
        return 0.8 - time * 0.02

    @staticmethod
    def find_hour_factor(hour):
        if hour >= 8:
            return 0.00
        return 0.6 - abs(3 - hour) * 0.1

    @staticmethod
    def pandas_query(session):
        conn = session.connection()
        query = select(PredictView)

        return pd.read_sql_query(query, conn)

    @staticmethod
    def pandas_query_not_null(session):
        conn = session.connection()
        query = select(PredictView).where(PredictView.fraud_probability.is_not(None))
        return pd.read_sql_query(query, conn)

    async def predict(self, df, session):
        df['date'] = pd.to_datetime(df['date'])
        df.sort_values(by=['card', 'date'], inplace=True)
        df['prev_date'] = df.groupby('card')['date'].shift()
        df['time_difference_seconds'] = (df['date'] - df['prev_date']).dt.total_seconds()
        df['time_difference_seconds'] = (df['time_difference_seconds']
        .replace(
            np.nan,
            np.mean(df['time_difference_seconds']))
        )
        df = df[['id_transaction', 'date', 'card', 'date_of_birth', 'operation_type', 'amount', 'operation_result',
                 'terminal_type', 'city', 'time_difference_seconds']]
        df['date_of_birth'] = pd.to_datetime(df['date_of_birth'])
        df['age'] = (df['date'].dt.year - df['date_of_birth'].dt.year).astype(int)
        df = df.drop('date_of_birth', axis=1)
        df['hour'] = df['date'].dt.hour
        df = df.drop('date', axis=1)
        df['factor_time_dif'] = df['time_difference_seconds'].apply(self.find_time_factor_dif)
        df['factor_hour'] = df['hour'].apply(self.find_hour_factor)
        df['prev_city'] = df.groupby('card')['city'].shift()
        df['prev_city'] = df['prev_city'].replace(np.nan, -1)
        df['factor_city'] = 0.00
        df.loc[(df['prev_city'] != df['city']) & (df['prev_city'] != -1), 'factor_city'] = 0.8
        df['amount_factor'] = df['amount'].apply(self.find_amount_factor)
        df['age_factor'] = df['age'].apply(self.find_age_factor)
        df_factors = df[['age_factor', 'amount_factor', 'factor_city', 'factor_hour', 'factor_time_dif']]
        result = []
        for index, row in df_factors.iterrows():
            factors = sorted(list(row), reverse=True)
            now_factor = 0.0
            for factor in factors:
                now_factor += (1.0 - now_factor) * factor
            result.append(now_factor)
        df['fraud_probability'] = result
        for index, row in df.iterrows():
            q = (update(Transaction)
                 .where(Transaction.transaction_id == row['id_transaction'])
                 .values(transaction_fraud_probability=row['fraud_probability']))
            await session.execute(q)
        await session.commit()

    async def predict_all(self):
        async with Session() as session:
            df = await session.run_sync(self.pandas_query)
            await self.predict(df, session)

    async def predict_not_null(self):
        async with Session() as session:
            df = await session.run_sync(self.pandas_query_not_null)
            await self.predict(df, session)
