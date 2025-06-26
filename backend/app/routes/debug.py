# app/routes/debug.py
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.auth import get_current_user
from app.services.llama_3_8b import detect_bugs

router = APIRouter()

class CodeInput(BaseModel):
    code: str

@router.post("/debug")
def run_debugger(data: CodeInput, user: dict = Depends(get_current_user)):
    result = detect_bugs(data.code)

    if not result or "❌" in result:
        raise HTTPException(status_code=502, detail="Bug detection failed")

    return {
        "output": result,
        "email": user["email"]
    }
"""