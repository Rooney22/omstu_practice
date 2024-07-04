from sqlalchemy import Column, String, Date
from src.models.base import Base
from sqlalchemy.orm import relationship

class Client(Base):
    __tablename__ = 'clients'
    client_id = Column(String(7), primary_key=True)
    passport_hashed = Column(String(8))
    passport_valid_to = Column(Date)
    cards = relationship('Card', back_populates='client')
