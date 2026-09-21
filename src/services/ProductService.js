// src/services/ProductService.js

const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProductList({
page = 1,
pageSize = 10,
orderBy = "recent",
keyword = "",
}) {
try {
const response = await fetch(
`${BASE_URL}/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
);

if (!response.ok) {
throw new Error("상품 목록을 불러오지 못했습니다.");
}

const data = await response.json();

return data;
} catch (error) {
console.error(error);
throw error;
}
}