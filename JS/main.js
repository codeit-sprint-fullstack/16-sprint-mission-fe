import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticleList,
  patchArticle,
} from "./ArticleService.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductList,
  patchProduct,
} from "./ProductService.js";

// getArticleList(1, 10, "")
//   .then((result) => {
//     // 성공하면 실제 데이터가 들어옴
//     console.log("게시글 목록 성공:", result);
//     return result;
//   })
//   .catch((error) => {
//     // 네트워크 오류 또는 throw 된 오류
//     console.log(error.message);
//   });

// getArticle(1)
//   .then((result) => {
//     console.log("게시글 하나 조회 성공:", result);
//     return result;
//   })
//   .catch((error) => {
//     // 네트워크 오류 또는 throw 된 오류
//     console.log("게시글 조회 실패:", error.message);
//   });

// createArticle(
//   "제목",
//   "내용",
//   "https://example.com/",
// )
//   .then((result) => {
//     console.log("게시글 생성 성공:", result);
//     return result;
//   })
//   .catch((error) => {
//     // 네트워크 오류 또는 throw 된 오류
//     console.log("게시글 생성 실패:", error.message);
//   });

// patchArticle(400, "수정 제목", "수정 내용", "https://example.com/")
//   .then((result) => {
//     console.log("수정 성공:", result);
//     return result;
//   })
//   .catch((error) => {
//     // 네트워크 오류 또는 throw 된 오류
//     console.log("수정 실패:", error.message);
//   });

// deleteArticle(400)
//   .then(() => {
//     console.log("삭제 성공");
//   })
//   .catch((error) => {
//     // 네트워크 오류 또는 throw 된 오류
//     console.log("삭제 실패", error.message);
//   });

// //
// //
// //

// // getProductList
// const getProductList2 = async () => {
//   try {
//     const list = await getProductList(1, 10, "상품목록");
//     // 오류가 없다면
//     // 정상적으로 화면을 그린다.
//     console.log("상품 목록 성공:", list);
//   } catch (reason) {
//     // fetch 자체가 실패해도 여기로 옴
//     // 우리가 throw한 오류도 여기로 옴
//     console.log(`${reason.message}`);
//   }
// };
// getProductList2();

//getProduct
// const getProduct2 = async () => {
//   try {
//     const product = await getProduct(2222);
//     // 오류가 없다면
//     // 정상적으로 화면을 그린다.
//     console.log("상품 목록 성공:", product);
//   } catch (reason) {
//     // fetch 자체가 실패해도 여기로 옴
//     // 우리가 throw한 오류도 여기로 옴
//     console.log(`상품 불러오기 실패 — ${reason.message}`);
//   }
// };
// getProduct2();

//createProduct
// const createProduct2 = async () => {
//   try {
//     const product = await createProduct(
//       "맥북",
//       "맥북 판매합니다",
//       1000000,
//       ["전자제품"],
//       ["https://example.com/image.jpg"],
//     );
//     // 오류가 없다면
//     // 정상적으로 화면을 그린다.
//     console.log("상품 생성 성공:", product);
//   } catch (reason) {
//     // fetch 자체가 실패해도 여기로 옴
//     // 우리가 throw한 오류도 여기로 옴
//     console.log(`상품 생성 실패 — ${reason}`);
//   }
// };
// createProduct2();

// //patchProduct
// const patchProduct2 = async () => {
//   try {
//     const product = await patchProduct(
//       3333,
//       "수정된 상품",
//       "수정된 설명",
//       20000,
//       ["수정"],
//       ["https://example.com/image.jpg"],
//     );
//     // 오류가 없다면
//     // 정상적으로 화면을 그린다.
//     console.log("상품 수정 성공:", product);
//   } catch (reason) {
//     // fetch 자체가 실패해도 여기로 옴
//     // 우리가 throw한 오류도 여기로 옴
//     console.log(`${reason.message}`);
//   }
// };

// patchProduct2();

// //patchProduct
// const deleteProduct2 = async () => {
//   try {
//     const list = await deleteProduct(5);
//     // 오류가 없다면
//     // 정상적으로 화면을 그린다.
//     console.log("상품 삭제 성공");
//     // console.log(list) undefined
//     // 원래는 const data = await response.json(); return data;
//     // 이런걸 반환하는데 delete는 반환을 안해서 list없음
//   } catch (reason) {
//     // fetch 자체가 실패해도 여기로 옴
//     // 우리가 throw한 오류도 여기로 옴
//     console.log(` ${reason}`);
//   }
// };

// deleteProduct2();
