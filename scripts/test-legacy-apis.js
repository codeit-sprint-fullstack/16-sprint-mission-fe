import { getArticle, getArticleList } from "../ArticleService.js";
import { getProduct, getProductList } from "../ProductService.js";

async function testLegacyApis() {
  try {
    const articles = await getArticleList(1, 10, "");
    console.log("게시글 목록:", articles);
    if (articles.list[0]) {
      console.log("첫 게시글:", await getArticle(articles.list[0].id));
    }

    const products = await getProductList(1, 10, "");
    console.log("상품 목록:", products);
    if (products.list[0]) {
      console.log("첫 상품:", await getProduct(products.list[0].id));
    }
  } catch (error) {
    console.error("레거시 API 조회 실패:", error.message);
    process.exitCode = 1;
  }
}

testLegacyApis();
