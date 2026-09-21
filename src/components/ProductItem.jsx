import { Link } from 'react-router';
import defaultImage from '../assets/product_default.png';
import './ProductItem.scss';

const ProductItem = ({
    className = '',
    postId,
    name,
    price,
  }) => {
  return (
    <div className={`product${className}`}>
      <div className='img-box'>
        <Link to={`/items/${postId}`}>
          <img
            src={defaultImage}
            alt={name}
            onError={(event) => {
              event.target.src = defaultImage;
            }}
          />
        </Link>
      </div>
      <p className='title'>
        <Link to={`/items/${postId}`}>{name}</Link>
      </p>
      <p className='price'>
        <Link to={`/items/${postId}`}>{price?.toLocaleString()}원</Link>
      </p>
      <button className='like-btn'>
        <span className='like-count'>0</span>
      </button>
    </div>
  );
};

export default ProductItem;