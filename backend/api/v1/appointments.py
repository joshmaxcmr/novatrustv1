from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from core.database import get_db
from api.v1.auth import get_current_active_user
from models import User, Appointment
from schemas import (
    Appointment as AppointmentSchema,
    AppointmentCreate,
    AppointmentUpdate,
    Response
)

router = APIRouter()


@router.get("/", response_model=List[AppointmentSchema])
def read_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get user's appointments"""
    appointments = db.query(Appointment).filter(
        Appointment.user_id == current_user.id
    ).all()
    return appointments


@router.post("/", response_model=Response)
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new appointment"""
    # Validate appointment date is in the future
    if appointment.appointment_date <= datetime.now():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La date du rendez-vous doit être dans le futur"
        )
    
    db_appointment = Appointment(
        user_id=current_user.id,
        service_type=appointment.service_type,
        appointment_date=appointment.appointment_date,
        notes=appointment.notes
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    
    return Response(
        success=True,
        message="Rendez-vous créé avec succès",
        data={"appointment_id": db_appointment.id}
    )


@router.put("/{appointment_id}", response_model=Response)
def update_appointment(
    appointment_id: int,
    appointment_update: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update appointment"""
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.user_id == current_user.id
    ).first()
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rendez-vous non trouvé"
        )
    
    update_data = appointment_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(appointment, field, value)
    
    db.commit()
    
    return Response(
        success=True,
        message="Rendez-vous mis à jour avec succès"
    )


@router.delete("/{appointment_id}", response_model=Response)
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Cancel appointment"""
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.user_id == current_user.id
    ).first()
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rendez-vous non trouvé"
        )
    
    appointment.status = "cancelled"
    db.commit()
    
    return Response(
        success=True,
        message="Rendez-vous annulé avec succès"
    )