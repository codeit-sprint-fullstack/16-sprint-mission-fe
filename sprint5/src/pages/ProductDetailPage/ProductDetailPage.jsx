import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/productApi';

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);

        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>{product.price}원</p>

      <div>
        {product.tags.map((tag) => (
          <span key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;