from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid

from core.database import get_db
from api.v1.auth import get_current_active_user
from models import User, ChatSession, ChatMessage
from schemas import (
    ChatSession as ChatSessionSchema,
    ChatSessionCreate,
    ChatMessage as ChatMessageSchema,
    ChatMessageCreate,
    Response
)

router = APIRouter()


@router.post("/session", response_model=Response)
def create_chat_session(
    session_data: ChatSessionCreate = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create new chat session"""
    session_id = str(uuid.uuid4())
    
    db_session = ChatSession(
        user_id=current_user.id,
        session_id=session_id
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    
    return Response(
        success=True,
        message="Session de chat créée avec succès",
        data={"session_id": session_id}
    )


@router.get("/session/{session_id}/messages", response_model=List[ChatMessageSchema])
def get_chat_messages(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get messages for a chat session"""
    session = db.query(ChatSession).filter(
        ChatSession.session_id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session de chat non trouvée"
        )
    
    messages = db.query(ChatMessage).filter(
        ChatMessage.session_id == session.id
    ).order_by(ChatMessage.created_at).all()
    
    return messages


@router.post("/session/{session_id}/message", response_model=Response)
def send_message(
    session_id: str,
    message: ChatMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Send message in chat session"""
    session = db.query(ChatSession).filter(
        ChatSession.session_id == session_id,
        ChatSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Session de chat non trouvée"
        )
    
    db_message = ChatMessage(
        session_id=session.id,
        sender_type="user",
        sender_id=current_user.id,
        message=message.message,
        message_type=message.message_type
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # TODO: Implement bot response logic here
    
    return Response(
        success=True,
        message="Message envoyé avec succès",
        data={"message_id": db_message.id}
    )