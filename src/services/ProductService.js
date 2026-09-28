const BASE_URL = "http://localhost:3000";

export async function getProductList({
  offset = 0,
  limit = 10,
  keyword = "",
}) {
  const response = await fetch(
    `${BASE_URL}/products?offset=${offset}&limit=${limit}&orderBy=recent&keyword=${encodeURIComponent(
      keyword
    )}`
  );

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

export async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }

  return response.json();
}