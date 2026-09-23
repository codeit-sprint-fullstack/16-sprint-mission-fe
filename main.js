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

async function testArticleService() {
  console.log('\n========== Article ==========');

  const list = await getArticleList(1, 3, '');
  console.log('[getArticleList]', list);

  const created = await createArticle({
    title: '스프린트 미션 테스트 글',
    content: 'createArticle로 작성한 게시글입니다.',
    image: 'https://example.com/sample.png',
  });
  console.log('[createArticle]', created);
  if (!created) return; // 생성 실패 시 이후 테스트 중단

  const article = await getArticle(created.id);
  console.log('[getArticle]', article);

  const patched = await patchArticle(created.id, { title: '수정된 제목' });
  console.log('[patchArticle]', patched);

  const deleted = await deleteArticle(created.id);
  console.log('[deleteArticle]', deleted);

  // 에러 처리 확인: 삭제한 게시글을 다시 조회하면 에러 메시지가 출력되어야 한다.
  await getArticle(created.id);
}

async function testProductService() {
  console.log('\n========== Product ==========');

  const list = await getProductList(1, 3, '');
  console.log('[getProductList]', list);

  const created = await createProduct({
    name: '스프린트 테스트 상품',
    description: 'createProduct로 등록한 상품입니다.',
    price: 10000,
    tags: ['테스트', '스프린트'],
    images: ['https://example.com/product.png'],
  });
  console.log('[createProduct]', created);
  if (!created) return;

  const product = await getProduct(created.id);
  console.log('[getProduct]', product);

  const patched = await patchProduct(created.id, { price: 15000 });
  console.log('[patchProduct]', patched);

  const deleted = await deleteProduct(created.id);
  console.log('[deleteProduct]', deleted);

  // 에러 처리 확인
  await getProduct(created.id);
}

async function main() {
  await testArticleService();
  await testProductService();
}

main();
