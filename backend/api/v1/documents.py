from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
import os
import uuid
from pathlib import Path

from core.database import get_db
from core.config import settings
from api.v1.auth import get_current_active_user
from models import User, Document
from schemas import Document as DocumentSchema, Response

router = APIRouter()

# Ensure upload directory exists
Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)


@router.get("/", response_model=List[DocumentSchema])
def read_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get user's documents"""
    documents = db.query(Document).filter(
        Document.user_id == current_user.id
    ).all()
    return documents


@router.post("/upload", response_model=Response)
async def upload_document(
    document_type: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Upload a document"""
    # Validate file size
    if file.size > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Fichier trop volumineux"
        )
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Save to database
    db_document = Document(
        user_id=current_user.id,
        document_type=document_type,
        file_path=file_path,
        file_name=file.filename,
        file_size=file.size,
        mime_type=file.content_type
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    return Response(
        success=True,
        message="Document téléchargé avec succès",
        data={"document_id": db_document.id}
    )