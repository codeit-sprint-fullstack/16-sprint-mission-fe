import { getArticle, getArticleList, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from "./ProductService.js"

// const test1 = await getProductList(1, 10 ,"");
// console.log("품목들받기 : ",test1);
// const test2 = await getProduct(4324);
// console.log("품목받기 : ", test2);
// const test3 = await createProduct(
//     "모래시계",
//     "강화유리와 합금 그리고 가루를 넣은 모래시계",
//     90000,
//     "사치품",
//     "https://example.com/...");
// console.log("상품생성 : ", test3);
// const test4 = await deleteProduct(4353);
// console.log("품목삭제 :", test4);

// const test5 = await getArticleList(1, 10 , "");
// console.log("게시글받기 : ", test5);
// const test6 = await getArticle(6965);
// console.log("게시글받기 : ", test6);
// const test7 = await createArticle(
//     "제목입니당",
//     "내용이고요",
//     "https://example.com/...");
// console.log(test7);
// const test8 = await deleteArticle(6988);
// console.log("게시글삭제 : ", test8);