from sqlalchemy import Column, Integer, String
from src.models.base import Base
from sqlalchemy.orm import relationship

class OperationType(Base):
    __tablename__ = 'operation_types'
    operation_type_id = Column(Integer, primary_key=True)
    operation_type_name = Column(String(15))
    operations = relationship('Operation', back_populates='operation_type')
