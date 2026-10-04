const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}) {
  // 페이지 번호를 offset으로 변환
  const offset = (page - 1) * pageSize;

  const params = new URLSearchParams({
    offset: String(offset),
    limit: String(pageSize),
    orderBy,
    keyword,
  });

  const response = await fetch(
    `${BASE_URL}/products?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

// 상품 등록 API
export async function createProduct({
  name,
  description,
  price,
  tags,
}) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price: Number(price),
      tags,
    }),
  });

  if (!response.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }

  return response.json();
}
