from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class Variable(Base):
    __tablename__ = 'variables'

    id = Column(Integer, primary_key=True, autoincrement=True)
    short_name = Column(String(25), nullable=False)
    formulas = relationship("Formula", secondary="variable_formula", back_populates="variables")