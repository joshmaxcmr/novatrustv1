from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from decimal import Decimal


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    phone: str
    first_name: str
    last_name: str
    role: Optional[str] = "client"


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None


class User(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int


class TokenData(BaseModel):
    email: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Account Schemas
class AccountBase(BaseModel):
    account_type: str
    balance: Optional[Decimal] = 0


class AccountCreate(AccountBase):
    user_id: int


class Account(AccountBase):
    id: int
    user_id: int
    account_number: str
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


# Transaction Schemas
class TransactionBase(BaseModel):
    transaction_type: str
    amount: Decimal
    description: Optional[str] = None


class TransactionCreate(TransactionBase):
    account_id: int


class Transaction(TransactionBase):
    id: int
    account_id: int
    reference: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Appointment Schemas
class AppointmentBase(BaseModel):
    service_type: str
    appointment_date: datetime
    notes: Optional[str] = None


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(BaseModel):
    service_type: Optional[str] = None
    appointment_date: Optional[datetime] = None
    notes: Optional[str] = None
    status: Optional[str] = None


class Appointment(AppointmentBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


# Document Schemas
class DocumentBase(BaseModel):
    document_type: str
    file_name: str


class DocumentCreate(DocumentBase):
    file_path: str
    file_size: int
    mime_type: str


class Document(DocumentBase):
    id: int
    user_id: int
    file_path: str
    file_size: int
    mime_type: str
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


# Blog Schemas
class BlogPostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    featured_image: Optional[str] = None


class BlogPostCreate(BlogPostBase):
    slug: str


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    featured_image: Optional[str] = None
    status: Optional[str] = None


class BlogPost(BlogPostBase):
    id: int
    slug: str
    status: str
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


# Chat Schemas
class ChatSessionBase(BaseModel):
    session_id: str


class ChatSessionCreate(ChatSessionBase):
    user_id: Optional[int] = None


class ChatSession(ChatSessionBase):
    id: int
    user_id: Optional[int]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ChatMessageBase(BaseModel):
    message: str
    sender_type: str
    message_type: Optional[str] = "text"


class ChatMessageCreate(ChatMessageBase):
    session_id: int
    sender_id: Optional[int] = None


class ChatMessage(ChatMessageBase):
    id: int
    session_id: int
    sender_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True


# Response Schemas
class Response(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


class PaginatedResponse(BaseModel):
    success: bool
    message: str
    data: List[dict]
    total: int
    page: int
    per_page: int
    pages: int