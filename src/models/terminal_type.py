from sqlalchemy import Column, SmallInteger, String
from src.models.base import Base


class TerminalType(Base):
    __tablename__ = 'terminal_types'
    terminal_type_id = Column(SmallInteger, primary_key=True)
    terminal_type_name = Column(String(3))
