import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './regularCell.css'

function RegularProductCard({id, name, price, favoriteCount, images}) {
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : 'https://placeholder.com';

  return (
     <div className='regular-card-cell-wrapper'>
      <div className='regular-card-cell-image'>
        <img 
          className='regular-card-cell-image'
          src={imageUrl} 
          alt={name} 
         
        />
      </div>
      <p className = 'regular-card-cell-name'>{name}</p>
      <p className = 'regular-card-cell-price'>{price?.toLocaleString()}원</p>
      <p className = 'regular-card-cell-favorite'>
        <img className = "heart_icon" src = "../asset/ic_heart.png"/>
        {favoriteCount}</p>
    </div>
  )

}
export default RegularProductCard