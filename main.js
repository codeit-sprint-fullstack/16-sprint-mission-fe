import {getArticleList, getArticle, createArticle, patchArticle, deleteArticle} from "./ArticleService.js";
import {getProductList, getProduct, createProduct, patchProduct, deleteProduct} from "./ProductService.js";

// getArticleList();
// getArticle(6964);
// createArticle("New Article", "This is the content of the new article.", "https://example.com/image.jpg");
// patchArticle(6971, "Updated Article", "This is the updated content of the article.", "https://example.com/updated-image.jpg");
// deleteArticle(6971);

// getProductList(1, 3);
// getProduct(4309);
// createProduct("New Product", "This is the description of the new product.", 19, ["tag1", "tag2"], "https://example.com/product-image.jpg");
// patchProduct(
//     4309,
//     "Updated Product",
//     "This is the updated description of the product.",
//     29,
//     ["tag1", "tag2"],
//     "https://example.com/updated-product-image.jpg"
// );
// deleteProduct(4309);