
import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from './ArticleService.js';


getArticleList(1, 10, '');

getArticle(7188);

// createArticle(
// '레인보우 식스 시즈',
// '레인보우 식스 시즈의 긴장감 넘치는 전술 작전 이미지입니다.', 
// 'https://i.namu.wiki/i/C0148mXtt9mvGe52a-6kWIR_7aFO4QHORvZ2BDsyj18YKLSB1wsoQ0z48QM5SIT0tQz4lh7jWt0eJDZMJ6Li2g.webp'
// );

patchArticle(
  7190,
  '수정된 제목: 레인보우 식스 시즈',
  '수정된 내용: 데이터가 성공적으로 수정되었습니다.',
  'https://i.namu.wiki/i/C0148mXtt9mvGe52a-6kWIR_7aFO4QHORvZ2BDsyj18YKLSB1wsoQ0z48QM5SIT0tQz4lh7jWt0eJDZMJ6Li2g.webp'
);

deleteArticle(7189);


import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from './ProductService.js';


getProductList(1, 10, '');

getProduct(4448);

// createProduct(
//   '게이밍 마우스',
//   'FPS 게임에 적합한 게이밍 마우스입니다.',
//   200000,
//   ['게이밍', '마우스', 'FPS'],
//   ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73OCG7retmDTekKQiCwVcnPQl6SUoxapAgUHvD_Q6nQ&s=10']
// );

patchProduct(
  4450,
  '게이밍 마우스(한정판)',
  'FPS 게임에 적합한 게이밍 마우스(한정판)입니다.',
  500000,
  ['FPS', '게이밍', '한정판 마우스'],
  ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4gsYR8UU_lTZ9Or_86sQGKOXSX9vBWop49jQnIfW7w&s=10']
);

deleteProduct(4449);