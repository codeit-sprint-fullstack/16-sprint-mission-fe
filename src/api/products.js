const BASE_URL = "https://panda-market-api.vercel.app/products";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}) {
  const searchParams = new URLSearchParams({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  const response = await fetch(`${BASE_URL}?${searchParams}`);

  if (!response.ok) {
    throw new Error("상품 목록을 불러오지 못했습니다.");
  }

  return response.json();
}