import { request } from "./request.js";

/**
 *
 * @param {number} page 1-based
 * @param {number} pageSize
 * @param {'recent' | 'favorite'} orderBy
 * @param {string} keyword
 * @returns
 */
export function getProductList(
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
) {
  const query = new URLSearchParams();
  query.set("page", page);
  query.set("pageSize", pageSize);
  query.set("orderBy", orderBy);
  query.set("keyword", keyword);

  return request("/products?" + query.toString(), { method: "GET" });
}

/**
 *
 * @param {number} productId
 */
export function getProduct(productId) {
  return request("/products/" + productId, { method: "GET" });
}

/**
 *
 * @param {string} name
 * @param {string} description
 * @param {number} price
 * @param {string[]} tags
 * @param {string[]} images
 * @returns
 */
export function createProduct(name, description, price, tags, images) {
  return request("/products", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      price,
      tags,
      images,
    }),
  });
}

/**
 *
 * @param {number} productId
 * @param {object} body
 */
export function patchProduct(productId, body) {
  return request("/products/" + productId, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

/**
 *
 * @param {number} productId
 */
export function deleteProduct(productId) {
  return request("/products/" + productId, { method: "DELETE" });
}
