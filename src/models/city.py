from sqlalchemy import Column, Integer, String
from src.models.base import Base
from sqlalchemy.orm import relationship

class City(Base):
    __tablename__ = 'cities'
    city_id = Column(Integer, primary_key=True)
    city_name = Column(String)
    terminals = relationship('Terminal', back_populates='city')
