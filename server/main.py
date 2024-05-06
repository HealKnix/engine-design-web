from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import models
from database import SessionLocal, engine
from sqlalchemy import MetaData

metadata = MetaData()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
