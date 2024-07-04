from sqlalchemy import Column, SmallInteger, String
from src.models.base import Base
from sqlalchemy.orm import relationship


class TerminalType(Base):
    __tablename__ = 'terminal_types'
    terminal_type_id = Column(SmallInteger, primary_key=True)
    terminal_type_name = Column(String(3))
    terminals = relationship('Terminal', back_populates='terminal_type')
