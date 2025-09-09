from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.database import get_db
from api.v1.auth import get_current_active_user
from models import User, Account
from schemas import Account as AccountSchema, AccountCreate, Response

router = APIRouter()


@router.get("/", response_model=List[AccountSchema])
def read_accounts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get user's accounts"""
    accounts = db.query(Account).filter(Account.user_id == current_user.id).all()
    return accounts


@router.post("/", response_model=Response)
def create_account(
    account: AccountCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new account"""
    # Generate account number (simplified)
    import random
    account_number = f"NT{random.randint(100000000, 999999999)}"
    
    db_account = Account(
        user_id=current_user.id,
        account_number=account_number,
        account_type=account.account_type,
        balance=account.balance or 0
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    
    return Response(
        success=True,
        message="Compte créé avec succès",
        data={"account_id": db_account.id, "account_number": account_number}
    )