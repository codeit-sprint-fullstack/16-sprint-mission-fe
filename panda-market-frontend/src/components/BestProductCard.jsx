import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './bestCell.css'


function BestProductCard({id, name, price, favoriteCount, images}) {
  
  
const imageUrl = images && images.length > 0
    ? images[0]
    : null;

  return (
    <div className='best-card-cell-wrapper'>
      <div className='best-card-cell-image'>
        <img
          className="best-card-cell-image"
          src={imageUrl || "../asset/img_default.svg"}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "../asset/img_default.svg";
          }}
        />
      </div>
      <p className = 'best-card-cell-name'>{name}</p>
      <p className = 'best-card-cell-price'>{price?.toLocaleString()}원</p>
      <p className = 'best-card-cell-favorite'>
        <img className = "heart-icon" src = "../asset/ic_heart.png"/>
        {favoriteCount}</p>
    </div>
  )

}
export default BestProductCard