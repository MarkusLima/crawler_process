from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.services.user_service import verify_access_token, bearer_scheme
from app.db.session import get_db
from app.models.user import User

def verify_token_user(
    token: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    """Verifica o token JWT e valida o e-mail associado no banco de dados."""
    email = verify_access_token(token.credentials)
    if not email:
        raise HTTPException("Token inválido")

    # Verifica se o e-mail existe no banco de dados
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException("Usuário não encontrado ou token inválido")

    return user  # Retorna o objeto do usuário