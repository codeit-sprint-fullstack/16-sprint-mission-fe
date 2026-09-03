import { request } from "./request.js";

/**
 *
 * @param {number} page 1-based
 * @param {number} pageSize
 * @param {'recent' | 'favorite'} orderBy
 * @param {string} keyword
 * @returns
 */
export function getArticleList(
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

  return request("/articles?" + query.toString(), { method: "GET" });
}

/**
 *
 * @param {number} articleId
 */
export function getArticle(articleId) {
  return request("/articles/" + articleId, { method: "GET" });
}

/**
 *
 * @param {string} title
 * @param {string} content
 * @param {string} image
 */
export function createArticle(title, content, image) {
  return request("/articles", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  });
}

/**
 *
 * @param {number} articleId
 * @param {object} body
 */
export function patchArticle(articleId, body) {
  return request("/articles/" + articleId, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

/**
 *
 * @param {number} articleId
 */
export function deleteArticle(articleId) {
  return request("/articles/" + articleId, { method: "DELETE" });
}
