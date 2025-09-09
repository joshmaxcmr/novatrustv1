from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.database import get_db
from api.v1.auth import get_current_active_user
from models import User, BlogPost
from schemas import (
    BlogPost as BlogPostSchema,
    BlogPostCreate,
    BlogPostUpdate,
    Response,
    PaginatedResponse
)

router = APIRouter()


@router.get("/", response_model=PaginatedResponse)
def read_blog_posts(
    skip: int = 0,
    limit: int = 10,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get published blog posts"""
    query = db.query(BlogPost).filter(BlogPost.status == "published")
    
    if category:
        query = query.filter(BlogPost.category == category)
    
    total = query.count()
    posts = query.offset(skip).limit(limit).all()
    
    return PaginatedResponse(
        success=True,
        message="Articles récupérés avec succès",
        data=[post.__dict__ for post in posts],
        total=total,
        page=skip // limit + 1,
        per_page=limit,
        pages=(total + limit - 1) // limit
    )


@router.get("/{post_slug}", response_model=BlogPostSchema)
def read_blog_post(post_slug: str, db: Session = Depends(get_db)):
    """Get specific blog post by slug"""
    post = db.query(BlogPost).filter(
        BlogPost.slug == post_slug,
        BlogPost.status == "published"
    ).first()
    
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article non trouvé"
        )
    
    return post


@router.post("/", response_model=Response)
def create_blog_post(
    post: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create new blog post (admin only)"""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permissions insuffisantes"
        )
    
    # Check if slug already exists
    existing_post = db.query(BlogPost).filter(BlogPost.slug == post.slug).first()
    if existing_post:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un article avec ce slug existe déjà"
        )
    
    db_post = BlogPost(
        title=post.title,
        slug=post.slug,
        content=post.content,
        excerpt=post.excerpt,
        featured_image=post.featured_image,
        category=post.category,
        tags=post.tags,
        author_id=current_user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    return Response(
        success=True,
        message="Article créé avec succès",
        data={"post_id": db_post.id}
    )