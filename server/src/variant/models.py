from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from server.src import database
class Variant(database.Base):
    __tablename__ = 'variants'

    id = Column(Integer, primary_key=True, autoincrement=True)
    voltage = Column(Float)
    power = Column(Float)
    cnt_pole = Column(Integer)
    solved = Column(Boolean)
    slide = Column(Float)
    class_hr = Column(String(1))
    engine_id = Column(Integer, ForeignKey('engines.id'))
    engine = relationship("Engine", back_populates="variants")
    users = relationship("User", secondary="variants_users", back_populates="variants")