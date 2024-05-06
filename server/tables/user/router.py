from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from main import get_db, app
from schemas import UserBase
from controller import *


@app.post("/users/", response_model=UserBase)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_full_name(db, full_name=user.full_name)
    if db_user:
        raise HTTPException(status_code=400, detail="full_name already registered")
    return create_user(db=db, user=user)


@app.get("/users/", response_model=list[UserBase])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{id}", response_model=UserBase)
def read_user(id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, id=id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
