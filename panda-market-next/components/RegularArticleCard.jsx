'use client';

import React from 'react';
import Link from 'next/link';
import './regularArticleCell.css';

function RegularArticleCard({ id, title, content, createdAt, favoriteCount }) {
  return (
    <Link href={`/article/${id}`} className="regular-article-cell-link">
      <div className="regular-article-cell-wrapper">
        <div className="article-cell-container">
          <p className="article-regular-article-cell-title">{title}</p>
        </div>

        <div className="article-cell-container">
          <p className="article-cell-upload-date">{createdAt ? createdAt.split('T')[0] : ''}</p>
        </div>
      </div>
    </Link>
  );
}

export default RegularArticleCard;
