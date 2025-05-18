from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_hearth():
    return {"status": "ok", "message": "Hearth is alive!"}