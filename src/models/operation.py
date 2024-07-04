from sqlalchemy import Column, Integer, Numeric, ForeignKey, Boolean
from src.models.base import Base
from sqlalchemy.orm import relationship


class Operation(Base):
    __tablename__ = 'operations'
    operation_id = Column(Integer, primary_key=True)
    operation_type_id = Column(Integer, ForeignKey("operation_types.operation_type_id"))
    operation_result = Column(Boolean)
    operation_amount = Column(Numeric(10, 2))
    operation_type = relationship('OperationType', back_populates='operation')
    transactions = relationship('Transaction', back_populates='operation')
