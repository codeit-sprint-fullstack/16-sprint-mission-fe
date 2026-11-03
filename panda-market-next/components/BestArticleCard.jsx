'use client';

import React from 'react';
import Link from 'next/link';
import './bestArticleCell.css';

function BestArticleCard({ id, title, content, favoriteCount }) {
  return (
    <Link href={`/article/${id}`} className="best-article-cell-link">
      <div className="best-article-cell-wrapper">
        <div className="best-article-tag">
          <img className="best-medal-icon" src="/asset/best_medal.png" alt="굿" />
          Best
        </div>

        <p className="best-article-cell-title">{title}</p>

        <p className="best-article-cell-favorite">
          <img className="heart-icon" src="/asset/ic_heart.png" alt="좋아요" />
          {favoriteCount}
        </p>
      </div>
    </Link>
  );
}

export default BestArticleCard;
