from sqlalchemy import Column, Integer, SmallInteger, String, ForeignKey
from src.models.base import Base


class Terminal(Base):
    __tablename__ = 'terminals'
    terminal_id = Column(Integer, primary_key=True)
    terminal_type_id = Column(SmallInteger, ForeignKey('terminal_types.terminal_type_id'))
    city_id = Column(Integer, ForeignKey('cities.city_id'))
    terminal_address = Column(String(250))
