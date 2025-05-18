from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.midleware.verify_token import verify_token_user
from app.schemas.user import UserCreate, User, UserToken, UserBaseLogin
from app.services.user_service import create_user, authenticate_user
from app.db.session import get_db

router = APIRouter()

@router.post("/register", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    
    try:
        if user.password != user.confirm_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="As senhas não coincidem",
            )
        return create_user(db, user)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao criar usuário: {str(e)}",
        )

@router.post("/login", response_model=UserToken)
def login(userLogin: UserBaseLogin, db: Session = Depends(get_db)):

    try:
        user = authenticate_user(db, userLogin.email, userLogin.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciais inválidas",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao realizar login: {str(e)}",
        )

@router.get("/me")
def read_current_user(current_user: dict = Depends(verify_token_user)):
    """Retorna o usuário atual autenticado."""

    try:
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário não autenticado",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return {"id": current_user.id, "email": current_user.email, "username": current_user.username}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao obter usuário atual: {str(e)}",
        )