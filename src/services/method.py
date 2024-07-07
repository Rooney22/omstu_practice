from fastapi import Depends
from typing import BinaryIO
from src.db.db import Session, get_session
from src.models.city import City
from src.models.card import Card
from src.models.terminal import Terminal
from src.models.transaction import Transaction
from src.models.operation import Operation
from src.models.operation_type import OperationType
from src.models.terminal_type import TerminalType
from src.models.client import Client
from datetime import datetime
from dateutil.relativedelta import relativedelta
import pandas as pd


class MethodsService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def insert(self, input_file: BinaryIO):
        df = pd.read_csv(input_file)
        operation_res_map = {
            'Успешно' : True,
            'Отказ' : False
        }
        for index, row in df.iterrows():
            transaction_id = row['id_transaction']
            if self.session.query(Transaction).filter(Transaction.transaction_id == transaction_id).first():
                continue
            transaction_date = row['date']
            card_number = row['card']
            passport_valid_to = row['passport_valid_to']
            if passport_valid_to == 'бессрочно':
                passport_valid_to = datetime.now() + relativedelta(years=100)
            card = (self.session
                    .query(Card)
                    .filter(Card.card_number == card_number)
                    .first()
                    )
            if not card:
                card = self.create_card(card_number, row['phone'], row['client'], row['passport'],
                                        passport_valid_to, row['date_of_birth'])
            operation_result = operation_res_map[row['operation_result']]
            operation = (self.session
                         .query(Operation)
                         .filter(Operation.operation_type.has(OperationType.operation_type_name == row['operation_type']))
                         .filter(Operation.operation_result == operation_result)
                         .filter(Operation.operation_amount == row['amount'])
                         .first()
                         )
            if not operation:
                operation = self.create_operation(row['operation_type'], operation_result, row['amount'])
            terminal = (self.session
                         .query(Terminal)
                         .filter(Terminal.city.has(City.city_name == row['city']))
                         .filter(Terminal.terminal_type.has(TerminalType.terminal_type_name == row['terminal_type']))
                         .filter(Terminal.terminal_address == row['address'])
                         .first()
                         )
            if not terminal:
                terminal = self.create_terminal(row['terminal_type'], row['city'], row['address'])
            transaction = Transaction(transaction_id=transaction_id,
                                      transaction_date=transaction_date,
                                      card_number=card_number,
                                      operation_id=operation.operation_id,
                                      terminal_id=terminal.terminal_id)
            if int(index) % 50 == 0:
                print(index)
            self.session.add(transaction)
            self.session.commit()

    def create_card(self, card_number, phone_hashed, client_id, passport_hashed, passport_valid_to, date_of_birth):
        client = (self.session
                  .query(Client)
                  .filter(Client.client_id == client_id)
                  .first()
                  )
        if not client:
            client = self.create_client(client_id, passport_hashed, passport_valid_to, date_of_birth)
        card = Card(card_number=card_number, phone_hashed=phone_hashed, client_id=client.client_id)
        self.session.add(card)
        self.session.commit()
        return card

    def create_client(self, client_id, passport_hashed, passport_valid_to, date_of_birth):
        client = Client(client_id=client_id, passport_hashed=passport_hashed, passport_valid_to=passport_valid_to,
                        date_of_birth=date_of_birth)
        self.session.add(client)
        self.session.commit()
        return client

    def create_operation(self, operation_type_name, operation_result, operation_amount):
        operation_type = (self.session
                          .query(OperationType)
                          .filter(OperationType.operation_type_name == operation_type_name)
                          ).first()
        if not operation_type:
            operation_type = self.create_operation_type(operation_type_name)
        operation = Operation(operation_type_id=operation_type.operation_type_id,
                              operation_amount=operation_amount,
                              operation_result=operation_result,
                              )
        self.session.add(operation)
        self.session.commit()
        return operation

    def create_operation_type(self, operation_type_name):
        operation_type = OperationType(operation_type_name=operation_type_name)
        self.session.add(operation_type)
        self.session.commit()
        return operation_type

    def create_terminal(self, terminal_type_name, city_name, terminal_address):
        terminal_type = (self.session
                         .query(TerminalType)
                         .filter(TerminalType.terminal_type_name == terminal_type_name)
                         ).first()
        if not terminal_type:
            terminal_type = self.create_terminal_type(terminal_type_name)
        city = (self.session
                .query(City)
                .filter(City.city_name == city_name)
                ).first()
        if not city:
            city = self.create_city(city_name)
        terminal = Terminal(terminal_type_id=terminal_type.terminal_type_id,
                            city_id=city.city_id,
                            terminal_address=terminal_address)
        self.session.add(terminal)
        self.session.commit()
        return terminal

    def create_terminal_type(self, terminal_type_name):
        terminal_type = OperationType(terminal_type_name=terminal_type_name)
        self.session.add(terminal_type)
        self.session.commit()
        return terminal_type

    def create_city(self, city_name):
        city = City(city_name=city_name)
        self.session.add(city)
        self.session.commit()
        return city
