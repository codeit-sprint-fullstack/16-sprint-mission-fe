import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './ProductService.js';

async function testArticle() {
  console.log('=== [Article(게시글) 테스트 시작] ===');
  
  const newArticle = await createArticle({ 
    title: '테스트 제목입니다 :)', 
    content: '이미지 링크로 꼭 봐보세요 :)', 
    image: 'https://kr.xinhuanet.com/2015-02/21/134008555_14244176272421n.jpg' 
  });
  
  const createdId = newArticle.id;
  console.log("생성된 게시글 ID:", createdId);

  console.log("\n1. 게시글 상세 조회");
  const article = await getArticle(createdId);
  console.log(article);

  console.log("\n2. 게시글 수정");
  const updated = await patchArticle(createdId, { title: '수정된 게시글 제목입니다!' });
  console.log(updated);

  console.log("\n3. 게시글 삭제");
  await deleteArticle(createdId);

  console.log("삭제 되었는지 다시 출력");
  const DelArticle = await getArticle(createdId);
  console.log(DelArticle);

}

async function testProduct() {
  console.log('\n=== [Product(상품) 테스트 시작] ===');

  console.log("\n1. 상품 목록 조회");
  const list = await getProductList({ page: 1, pageSize: 10, keyword: '' });
  console.log(`총 ${list.totalCount}개 상품 조회 성공`);

  console.log("\n2. 상품 생성");
  const newProduct = await createProduct({ 
    name: '맥미니 M9999 ultra', 
    description: '세계 최강 사양 맥미니 입니다. 꼭 구매하세요!', 
    price: 1000, 
    tags: ['mac', 'macmini', '미니pc'], 
    images: ['https://example.com/img.png'] 
  });
  const createdId = newProduct.id;
  console.log("생성된 상품 ID:", createdId);

  console.log("\n3. 생성된 상품  상세 조회");
  const product = await getProduct(createdId);
  console.log(product);

  console.log("\n4. 상품 수정 (가격변경)");
  const updated = await patchProduct(createdId, { price: 2000 });
  console.log(updated);

  console.log("\n5. 상품 삭제");
  await deleteProduct(createdId);

  console.log("삭제 되었는지 다시 출력");
  const DelProduct = await getProduct(createdId);
  console.log(DelProduct);
}

async function errorTest() {
    console.log('\n=== [에러 테스트 시작] ===');
    
}

async function run() {
  await testArticle();
  await testProduct();
}

run();