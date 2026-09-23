const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';

// 응답 본문을 읽고, 상태 코드가 2XX가 아니면 에러를 던진다.
async function handleResponse(response) {
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message = data?.message ?? response.statusText;
    throw new Error(`[${response.status}] ${message}`);
  }

  return data;
}

// 상품 목록 조회
export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const params = new URLSearchParams({ page, pageSize });
    if (keyword) params.append('keyword', keyword);

    const response = await fetch(`${BASE_URL}?${params}`, { method: 'GET' });
    return await handleResponse(response);
  } catch (error) {
    console.error('getProductList 실패:', error.message);
  }
}

// 상품 상세 조회
export async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`, { method: 'GET' });
    return await handleResponse(response);
  } catch (error) {
    console.error('getProduct 실패:', error.message);
  }
}

// 상품 생성
export async function createProduct({ name, description, price, tags, images }) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('createProduct 실패:', error.message);
  }
}

// 상품 수정 (바꾸고 싶은 필드만 전달)
export async function patchProduct(productId, updates) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('patchProduct 실패:', error.message);
  }
}

// 상품 삭제
export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`, { method: 'DELETE' });
    return await handleResponse(response);
  } catch (error) {
    console.error('deleteProduct 실패:', error.message);
  }
}
