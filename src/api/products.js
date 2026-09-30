const BASE_URL =
  "https://one6-sprint-mission-fe.onrender.com/products";

export async function getProducts({
  page = 1,
  pageSize = 10,
  keyword = "",
  signal,
}) {
  const offset = (page - 1) * pageSize;

  const searchParams = new URLSearchParams({
    offset,
    limit: pageSize,
    orderBy: "recent",
    keyword,
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return response.json();
}

export async function createProduct({
  name,
  description,
  price,
  tags,
}) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price,
      tags,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "상품을 등록하지 못했습니다.");
  }

  return data;
}