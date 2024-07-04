from fastapi import Depends
from typing import BinaryIO
from datetime import datetime
from src.db.db import Session, get_session
from src.models.city import City
from src.models.card import Card
from src.models.terminal import Terminal
from src.models.operation import Operation
import pickle
import pandas as pd


class MethodsService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def insert(self, input_file: BinaryIO):
        df = pd.read_csv(input_file)
        cities = df['city']
        cities_db = [City(city_name=city) for city in set(cities)]
        self.session.add_all(cities_db)
        self.session.commit()
