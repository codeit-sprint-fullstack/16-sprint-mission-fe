import * as articleService from "./ArticleService.js";
import * as productService from "./ProductService.js";

async function articleTest() {
  // 게시글 등록
  await articleService.createArticle(
    "제목",
    "내용",
    "https://example.com/image.png",
  );

  // 게시글 목록 조회
  const { list: articles, totalCount } = await articleService.getArticleList();

  console.log(`총 ${totalCount}개의 게시글이 있습니다.`);

  for (const article of articles) {
    console.log(article.id, article.title);
  }

  // 최신 게시글 조회
  const articleId = articles[0].id;
  let result = await articleService.getArticle(articleId);

  // 방금 전 등록한 게시글이 나오는지 확인
  console.log(result);

  // 게시글 수정
  await articleService.patchArticle(articleId, {
    title: "제목_수정",
  });

  result = await articleService.getArticle(articleId);

  // 수정 확인
  console.log(result);

  // 게시글 삭제
  await articleService.deleteArticle(articleId);

  // 404 에러 반환
  result = await articleService.getArticle(articleId);

  // undefined
  console.log(result);
}

async function productTest() {
  // 상품 등록
  await productService.createProduct(
    "제목",
    "내용",
    50,
    ["태그1", "태그2"],
    ["https://example.com/image1.png", "https://example.com/image2.png"],
  );

  // 상품 목록 조회
  const { list: products, totalCount } = await productService.getProductList();

  console.log(`총 ${totalCount}개의 상품이 있습니다.`);

  for (const product of products) {
    console.log(product.id, product.name);
  }

  // 최신 상품 조회
  const productId = products[0].id;
  let result = await productService.getProduct(productId);

  // 방금 전 등록한 상품이 나오는지 확인
  console.log(result);

  // 상품 수정
  await productService.patchProduct(productId, {
    name: "제목_수정",
  });

  result = await productService.getProduct(productId);

  // 수정 확인
  console.log(result);

  // 상품 삭제
  await productService.deleteProduct(productId);

  // 404 에러 반환
  result = await productService.getProduct(productId);

  // undefined
  console.log(result);
}

// articleTest();
productTest();
