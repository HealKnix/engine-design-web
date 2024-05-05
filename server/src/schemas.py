from typing import Union

from pydantic import BaseModel

class UserBase(BaseModel):
    full_name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    user_id: int

    class Config:
        orm_mode = True