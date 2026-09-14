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


// Article 테스트
getArticleList(1, 10, "")
  .then((data) => {
    console.log("게시글 목록:", data);
  });


// Product 테스트
async function testProduct() {
  const data = await getProductList(1, 10, "");

  console.log("상품 목록:", data);
}

testProduct();