from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str

class UserBaseLogin(BaseModel):
    email: str
    password: str

class UserCreate(UserBase):
    password: str
    confirm_password: str

class User(UserBase):
    id: int

class UserToken(User):
    access_token: str

    class Config:
        from_attributes = True  # Substitui orm_mode