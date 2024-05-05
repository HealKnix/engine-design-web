from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    full_name = Column(String)
    password = Column(String)
    user_group = Column(String)
    role = Column(String)


