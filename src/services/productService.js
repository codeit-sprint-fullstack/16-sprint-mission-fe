import axios from "axios";
const BASE_URL = "https://panda-market-api.vercel.app";
export async function getProducts({ page = 1, pageSize = 10, orderBy = 'recent', keyword = ""} = {}) {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: {page, pageSize, orderBy, keyword },
    });
    return response.data;
  } catch (error) {
    console.error("상품 목록을 불러오는 중 오류가 발생했습니다.", error);
    throw error;
  }
}