from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password
from jose import jwt
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

bearer_scheme = HTTPBearer(
    description="Insira o token JWT no formato: **Bearer <token>**"
)

# Configurações do JWT
SECRET_KEY = "your_secret_key"  # Substitua por uma chave secreta segura
ALGORITHM = "HS256"

def create_user(db: Session, user: UserCreate):
    try:
        hashed_password = get_password_hash(user.password)
        db_user = User(username=user.username, hashed_password=hashed_password, email=user.email)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"id": db_user.id, "username":db_user.username, "email":db_user.email}
    except Exception as e:
        raise Exception(f"Erro ao criar usuário: {str(e)}")

def authenticate_user(db: Session, email: str, password: str):
    try:

        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None

        # Criação do JWT token
        token = create_access_token(data={"sub": user.email})

        return {"access_token": token, "id": user.id, "username":user.username, "email":user.email}
    
    except Exception as e:
        raise Exception(f"Erro ao autenticar usuário: {str(e)}")

def create_access_token(data: dict):
    """Gera um token JWT com os dados fornecidos."""
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    email: str = payload.get("sub")
    if email is None:
        raise Exception("Token inválido")
    
    return email


