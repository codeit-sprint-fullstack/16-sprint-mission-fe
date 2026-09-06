import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './module/ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './module/ProductService.js';

// ===== 게시글 관련 ===== //

// 📜 게시글 목록 조회
getArticleList('');

// 📄 게시글 정보 조회
// getArticle(0);

// 📝게시글 작성
// createArticle(
//   '제목',
//   '내용',
//   'https://example.com/image.jpg'
// );

// ✍🏻 게시글 수정
// patchArticle(
//   0,
//   '제목 수정',
//   '내용 수정',
//   'https://example.com/image_edited.jpg'
// );

// 🗑️ 게시글 삭제
// deleteArticle(0);

// ===== 상품 관련 ===== //

// 🛒 상품 목록 조회
getProductList('');

// 🎁 상품 정보 조회
// getProduct(0);

// 🖼️ 상품 등록
// createProduct(
//   '이름',
//   '설명',
//   10000,
//   ['태그1', '태그2'],
//   ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
// );

// 🏷️ 상품 수정
// patchProduct(
//   0,
//   '이름 수정',
//   '설명 수정',
//   30000,
//   ['태그 수정 1', '태그 수정 2'],
//   ['https://example.com/image1.png', 'https://example.com/image2.png']
// );

// 🗑️ 상품 삭제
// deleteProduct(0);