import { ElectronicProduct } from './models/ElectronicProduct.js';
import { Product } from './models/Product.js';
import * as ProductService from './services/ProductService.js';
import * as ArticleService from './services/ArticleService.js';

const RUN_API_MUTATIONS = process.env.RUN_API_MUTATIONS === 'true';

async function getProductListAndInstantiate() {
  const rawProducts = await ProductService.getProductList(1, 20, '');

  const products = [];
  for (const rawProduct of rawProducts) {
    if (rawProduct.tags.includes('전자제품')) {
      products.push(
        new ElectronicProduct(
          rawProduct.name,
          rawProduct.description,
          rawProduct.price,
          rawProduct.tags,
          rawProduct.images,
          rawProduct.favoriteCount,
          rawProduct.manufacturer,
        ),
      );
    } else {
      products.push(
        new Product(
          rawProduct.name,
          rawProduct.description,
          rawProduct.price,
          rawProduct.tags,
          rawProduct.images,
          rawProduct.favoriteCount,
        ),
      );
    }
  }

  console.log(products);
}

async function testProductService() {
  // 첫 20개 상품을 조회하고, 첫 번째 상품을 상세조회.
  const getProductListResponse = await ProductService.getProductList(1, 20, '');
  const firstProduct = getProductListResponse[0];

  console.log(getProductListResponse);

  if (firstProduct) {
    const getProductResponse = await ProductService.getProduct(firstProduct.id);
    console.log(getProductResponse);
  }
}

async function testArticleService() {
  // 첫 20개 게시글을 조회하고, 첫 번째 게시글을 상세조회.
  const getArticleListResponse = await ArticleService.getArticleList(1, 20, '');
  const firstArticle = getArticleListResponse[0];

  console.log(getArticleListResponse);

  if (firstArticle) {
    const getArticleResponse = await ArticleService.getArticle(firstArticle.id);
    console.log(getArticleResponse);
  }
}

async function testProductMutationService() {
  let createdProductId;

  try {
    const createProductResponse = await ProductService.createProduct(
      '포토카드',
      '액자 포함',
      10000,
      undefined,
      ['소품'],
      ['https://picsum.photos/200/300'],
    );
    createdProductId = createProductResponse.id;

    const patchProductResponse = await ProductService.patchProduct(
      createdProductId,
      createProductResponse.name,
      '액자 미포함',
      10000,
      createProductResponse.tags,
      createProductResponse.images,
    );

    console.log(createProductResponse);
    console.log(patchProductResponse);
  } finally {
    if (createdProductId) {
      const deleteProductResponse = await ProductService.deleteProduct(createdProductId);
      console.log(deleteProductResponse);
    }
  }
}

async function testArticleMutationService() {
  let createdArticleId;

  try {
    const createArticleResponse = await ArticleService.createArticle(
      '안녕하세요',
      '내용입니다',
      'https://picsum.photos/200',
    );
    createdArticleId = createArticleResponse.id;

    const patchArticleResponse = await ArticleService.patchArticle(
      createdArticleId,
      createArticleResponse.title,
      '앞으로 잘 부탁드립니다.',
      createArticleResponse.image,
    );

    console.log(createArticleResponse);
    console.log(patchArticleResponse);
  } finally {
    if (createdArticleId) {
      const deleteArticleResponse = await ArticleService.deleteArticle(createdArticleId);
      console.log(deleteArticleResponse);
    }
  }
}

async function main() {
  await getProductListAndInstantiate();
  await testProductService();
  await testArticleService();

  if (RUN_API_MUTATIONS) {
    await testProductMutationService();
    await testArticleMutationService();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
