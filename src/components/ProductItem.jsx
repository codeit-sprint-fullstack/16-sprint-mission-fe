import defaultImage from '../assets/product_default.png';
import './ProductItem.scss';

const ProductItem = ({
    className = '',
    image,
    name,
    price,
    favoriteCount
  }) => {  
    
  const handleAnchor = (event) => {
    event.preventDefault();
  };
  
  return (
    <div className={`product${className}`}>
      <div className='img-box'>
        <a href='#' onClick={handleAnchor}>
          <img
            src={image ?? defaultImage}
            alt={name}
            onError={(event) => {
              event.target.src = defaultImage;
            }}
          />
        </a>
      </div>
      <p className='title'>
        <a href='#' onClick={handleAnchor}>{name}</a>
      </p>
      <p className='price'>
        <a href='#' onClick={handleAnchor}>{price?.toLocaleString()}원</a>
      </p>
      <button className='like-btn'>
        <span className='like-count'>{favoriteCount?.toLocaleString()}</span>
      </button>
    </div>
  );
};

export default ProductItem;