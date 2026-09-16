import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

// 게시글 목록 조회 후 첫 번째 게시글 상세 조회
getArticleList(1, 10, "")
  .then((result) => {
    console.log("게시글 목록:", result);

    const firstArticleId = result.list[0].id;

    return getArticle(firstArticleId);
  })
  .then((article) => {
    console.log("게시글 상세:", article);
  });
  
// 게시글 생성 테스트 완료
// 새로고침할 때마다 게시글이 생성되지 않도록 주석 처리
// createArticle(
//   "송정현 스프린트3 테스트 게시글",
//   "Article API의 POST 요청을 테스트하는 게시글입니다.",
//   "https://picsum.photos/400/300"
// ).then((createdArticle) => {
//   console.log("생성된 게시글:", createdArticle);
// });

// 게시글 수정 테스트
// patchArticle(
//   6984,
//   "수정된 테스트 게시글",
//   "PATCH 요청으로 게시글 내용을 수정했습니다.",
//   "https://example.com/updated-image.jpg"
// ).then((updatedArticle) => {
//   console.log("수정된 게시글:", updatedArticle);
// });

// 게시글 삭제 테스트
// deleteArticle(6984).then((deletedArticle) => {
//   console.log("삭제된 게시글:", deletedArticle);
// });

async function testProductService() {
  const productList = await getProductList(1, 10, "");

  console.log("상품 목록:", productList);

  const firstProductId = productList.list[0].id;
  const product = await getProduct(firstProductId);

  console.log("상품 상세:", product);

  // 상품 생성, 수정, 삭제 테스트 완료
  // 반복 실행을 방지하기 위해 주석 처리

  // const createdProduct = await createProduct(
  //   "송정현 CRUD 테스트 상품",
  //   "생성, 수정, 삭제를 연속으로 테스트합니다.",
  //   10000,
  //   ["테스트", "스프린트3"],
  //   ["https://example.com/product.jpg"]
  // );

  // console.log("생성된 상품:", createdProduct);

  // const updatedProduct = await patchProduct(
  //   createdProduct.id,
  //   "수정된 송정현 CRUD 테스트 상품",
  //   "PATCH 요청으로 상품 정보를 수정했습니다.",
  //   15000,
  //   ["수정", "스프린트3"],
  //   ["https://example.com/updated-product.jpg"]
  // );

  // console.log("수정된 상품:", updatedProduct);

  // const deletedProduct = await deleteProduct(createdProduct.id);

  // console.log("삭제된 상품:", deletedProduct);
}

testProductService();


