'use client';

import React from 'react';
import './commentArticleCard.css'

function CommentArticleCard({ id, content, createdAt}) {
  
  return (
    <div className = "article-comment-cell-wrapper">
        <div className = "article-comment-section"> 
            <p className = "article-comment-text">{content}</p>
        </div>
        <div className = "article-comment-section"> 
            <p className = "article-comment-date">{createdAt ? createdAt.split('T')[0] : ''}</p>
            
        </div>
       
      
    </div>
  );
}

export default CommentArticleCard;
