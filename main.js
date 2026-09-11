
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
 
 
// ====================
// Article 테스트 (.then / .catch)
// ====================
 
// 게시글 목록 조회
getArticleList(1, 10, '');
 
 
// 생성 -> 조회 -> 수정 -> 삭제를 같은 게시글 id로 이어서 테스트
createArticle(
  '테스트 게시글',
  '테스트 내용입니다.',
  'https://example.com/image.jpg'
)
  .then((created) => {
    console.log('게시글 생성 완료:', created);
    return getArticle(created.id);
  })
  .then((fetched) => {
    console.log('게시글 단건 조회:', fetched);
    return patchArticle(
      fetched.id,
      '수정된 게시글',
      '수정된 내용입니다.',
      'https://example.com/newimage.jpg'
    );
  })
  .then((patched) => {
    console.log('게시글 수정 완료:', patched);
    return deleteArticle(patched.id);
  })
  .then((deleted) => {
    console.log('게시글 삭제 완료:', deleted);
  })
  .catch((error) => {
    console.error('Article CRUD 테스트 중 오류 발생:', error);
  });
 
 
// ====================
// Product 테스트 (async/await)
// ====================
 
async function testProductCRUD() {
  try {
    // 상품 목록 조회
    await getProductList(1, 10, '');
 
    // 생성 -> 조회 -> 수정 -> 삭제를 같은 상품 id로 이어서 테스트
    const created = await createProduct(
      '테스트 상품',
      '테스트 상품입니다.',
      10000,
      ['전자기기', '테스트'],
      ['https://example.com/image.jpg']
    );
    console.log('상품 생성 완료:', created);
 
    const fetched = await getProduct(created.id);
    console.log('상품 단건 조회:', fetched);
 
    const patched = await patchProduct(
      fetched.id,
      '수정된 상품',
      '수정된 상품입니다.',
      12000,
      ['전자기기', '수정'],
      ['https://example.com/newimage.jpg']
    );
    console.log('상품 수정 완료:', patched);
 
    const deleted = await deleteProduct(patched.id);
    console.log('상품 삭제 완료:', deleted);
  } catch (error) {
    console.error('Product CRUD 테스트 중 오류 발생:', error);
  }
}
 
testProductCRUD();