import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './module/ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './module/ProductService.js';

// ===== 게시글 관련 ===== //

// 📜 게시글 목록 조회
getArticleList('');

// 📄 게시글 정보 조회
getArticle(0);

// 📝게시글 작성
createArticle({
  title: '제목',
  content: '내용',
  image: 'https://example.com/image.jpg'
});

// ✍🏻 게시글 수정
patchArticle({
  id: 0,
  title: '제목 수정',
  content: '내용 수정',
  image: 'https://example.com/image_edited.jpg'
});

// 🗑️ 게시글 삭제
deleteArticle(0);

// ===== 상품 관련 ===== //

// 🛒 상품 목록 조회
const productList = await getProductList('');

// 🎁 상품 정보 조회
await getProduct(productList[0].id);

// 🖼️ 상품 등록
const product = await createProduct({
  name: '이름',
  description: '설명',
  price: 10000,
  tags: ['태그1', '태그2'],
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
});

// 🏷️ 상품 수정
await patchProduct({
  id: product.id,
  name: '이름 수정',
  description: '설명 수정',
  price: 30000,
  tags: ['태그 수정 1', '태그 수정 2'],
  images: ['https://example.com/image1.png', 'https://example.com/image2.png']
});

// 🗑️ 상품 삭제
await deleteProduct(product.id);