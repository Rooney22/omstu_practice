from sqlalchemy import Column, Integer, String
from src.models.base import Base


class OperationType(Base):
    __tablename__ = 'operation_types'
    operation_type_id = Column(Integer, primary_key=True)
    operation_type_name = Column(String(15))
