const BASE_URL = "https://panda-market-api.vercel.app";

export const getProducts = async ({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}) => {
  const query = new URLSearchParams({
    page,
    pageSize,
    keyword,
    orderBy,
  });

  const response = await fetch(
    `${BASE_URL}/products?${query.toString()}`,
  );

  if (!response.ok) {
    throw new Error("상품 목록을 불러오는데 실패했습니다.");
  }

  return response.json();
};