// ======================================================
// api.js
// 상품 목록 + 베스트 상품 둘 다 여기 함수 하나 사용
// ======================================================
import axios from "axios";

const api = axios.create({
  // ❌ 기존
  // baseURL: "https://panda-market-api.vercel.app",

  // ✅ Express 서버
  baseURL: "http://localhost:3000/api",
});

// ✅ 인터셉터를 한 번 설정하면
// axios 응답에서 실제 데이터만 꺼내서 돌려줌
api.interceptors.response.use((response) => response.data);

// 다른 파일에서도 api를 사용하도록 내보내기
export default api;
