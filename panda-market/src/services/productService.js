// 판다마켓 상품 API의 기본 주소
const BASE_URL = 'https://panda-market-api.vercel.app';

// 페이지, 정렬, 검색 조건을 쿼리 문자열로 만들어 상품 목록을 요청
export async function getProducts({ page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = {}) {
  const params = new URLSearchParams({ page, pageSize, orderBy, keyword });

  const response = await fetch(`${BASE_URL}/products?${params}`);

  if (!response.ok) {
    throw new Error('상품 목록을 불러오지 못했습니다.');
  }

  return response.json();
}
