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


// ============================
// Article API 테스트
// ============================

getArticleList(1, 10, "")
  .then((data) => {
    console.log("게시글 목록:", data);
  })
  .catch((error) => {
    console.error("게시글 목록 테스트 실패:", error);
  });


createArticle(
  "스프린트 미션 테스트 게시글",
  "Article API 테스트입니다.",
  "https://example.com/article.jpg"
)
  .then((createdArticle) => {
    console.log("생성된 게시글:", createdArticle);

    return getArticle(createdArticle.id);
  })
  .then((article) => {
    console.log("게시글 상세:", article);

    return patchArticle(
      article.id,
      "수정된 게시글 제목",
      "수정된 게시글 내용입니다.",
      "https://example.com/article-updated.jpg"
    );
  })
  .then((patchedArticle) => {
    console.log("수정된 게시글:", patchedArticle);

    return deleteArticle(patchedArticle.id);
  })
  .then((result) => {
    console.log("게시글 삭제 결과:", result);
  })
  .catch((error) => {
    console.error("Article API 테스트 실패:", error);
  });


// ============================
// Product API 테스트
// ============================

async function testProductApi() {
  try {
    const productList = await getProductList(1, 10, "");
    console.log("상품 목록:", productList);

    const createdProduct = await createProduct(
      "스프린트 미션 테스트 상품",
      "Product API 테스트 상품입니다.",
      10000,
      ["테스트", "전자제품"],
      ["https://example.com/product.jpg"]
    );

    console.log("생성된 상품:", createdProduct);

    const product = await getProduct(createdProduct.id);
    console.log("상품 상세:", product);

    const patchedProduct = await patchProduct(
      product.id,
      "수정된 테스트 상품",
      "수정된 상품 설명입니다.",
      20000,
      ["테스트", "수정"],
      ["https://example.com/product-updated.jpg"]
    );

    console.log("수정된 상품:", patchedProduct);

    const deletedProduct = await deleteProduct(patchedProduct.id);
    console.log("상품 삭제 결과:", deletedProduct);
  } catch (error) {
    console.error("Product API 테스트 실패:", error);
  }
}

testProductApi();