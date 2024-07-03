from sqlalchemy import Column, Integer, SmallInteger, String, ForeignKey, DateTime
from src.models.base import Base


class Transaction(Base):
    __tablename__ = 'transactions'
    transaction_id = Column(Integer, primary_key=True)
    terminal_id = Column(Integer, ForeignKey('terminals.terminal_id'))
    transaction_date = Column(DateTime)
    card_number = Column(String(8), ForeignKey('cards.card_number'))
    operation_id = Column(Integer, ForeignKey('operations.operation_type'))
