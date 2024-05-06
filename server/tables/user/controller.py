from sqlalchemy.orm import Session

from models import User
import schemas


def get_user(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()


def get_user_by_full_name(db: Session, full_name: str):
    return db.query(User).filter(User.full_name == full_name).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = User(full_name=user.full_name, password=fake_hashed_password, user_group=user.user_group, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user