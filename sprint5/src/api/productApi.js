// import axios from 'axios';

const BASE_URL = 'https://panda-market-jnwj.onrender.com';

export const getProducts = async ({
  offset = 0,
  limit = 10,
  keyword = '',ㄴ
}) => {
  const query = new URLSearchParams({
    offset,
    limit,
    keyword,
  });

  const response = await fetch(
    `${BASE_URL}/products?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error('상품 목록을 불러오는데 실패했습니다.');
  }

  return response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(
    `${BASE_URL}/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    }
  );

  if (!response.ok) {
    throw new Error('상품 등록에 실패했습니다.');
  }

  return response.json();
};

export const getProduct = async (productId) => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}`
  );

  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }

  return response.json();
};