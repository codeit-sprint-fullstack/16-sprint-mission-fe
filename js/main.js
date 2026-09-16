import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';




//article 실행함수

getArticleList(1,10,'')
  .then((data)=>{
    console.log(data);
  });

getArticle(6965)
  .then((data)=>{
    console.log(data);
  });

createArticle(  '테스트 게시글', '게시글 내용입니다.', 'https://example.com/image.jpg')
  .then((data)=>{
    console.log(data);
  });

patchArticle(6968, {
  title: '수정된 제목목목목금토일',
  content: '수정된 내용용용용가리',
  image: 'https://example.com/image.jpg'
})
  .then((data)=>{
    console.log(data);
  });

deleteArticle(6970)
  .then((data) => {
    console.log(data);
  });



//product 실행함수

getProductList(1,10,'')
  .then((data) => {
    console.log(data);
  });

getProduct(4310)
  .then((data) => {
    console.log(data);
  });

createProduct(
  '쿵야르',
  '쿵쿵야야르르',
  999999,
  '장난감',
  'https://example.com/image.jpg'
)
  .then((data) => {
    console.log(data);
  });

patchProduct(4310,
  {
  name: '수정된 쿵야르',
  description: '수정된 쿵쿵야야르르',
  price: 77897451,
  tags: '수정된 장난감',
  images: 'https://example.com/image.jpg'
  }
)
  .then((data) => {
    console.log(data);
  });

deleteProduct(4318)
  .then((data) => {
    console.log(data);
  }); 