import fetch from 'node-fetch';

import { API_HOST } from '../constant/constant.js';

/**
 * 게시글 목록 조회
 *
 * @param page 페이지 번호
 * @param pageSize 페이지 당 불러올 게시글 개수
 * @param keyword 검색 키워드
 */
export function getArticleList(page, pageSize, keyword) {
  return fetch(`${API_HOST}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((fetchResult) => normalizeFetchResult(fetchResult))
    .then((normalizedFetchResult) => handleNormalizedFetchResult(normalizedFetchResult))
    .catch((error) => handleError(error));
}

/**
 * 게시글 조회
 *
 * @param articleId 게시글 아이디
 */
export function getArticle(articleId) {
  return fetch(`${API_HOST}/articles/${articleId}`)
    .then((fetchResult) => normalizeFetchResult(fetchResult))
    .then((normalizedFetchResult) => handleNormalizedFetchResult(normalizedFetchResult))
    .catch((error) => handleError(error));
}

/**
 * 게시글 생성
 *
 * @param title 제목
 * @param content 내용
 * @param image 이미지 링크
 */
export function createArticle(title, content, image) {
  return fetch(`${API_HOST}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((fetchResult) => normalizeFetchResult(fetchResult))
    .then((normalizedFetchResult) => handleNormalizedFetchResult(normalizedFetchResult))
    .catch((error) => handleError(error));
}

/**
 * 게시글 수정
 *
 * @param articleId 수정할 게시글 아이디
 * @param title 제목
 * @param content 내용
 * @param image 이미지 링크
 */
export function patchArticle(articleId, title, content, image) {
  return fetch(`${API_HOST}/articles/${articleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then((fetchResult) => normalizeFetchResult(fetchResult))
    .then((normalizedFetchResult) => handleNormalizedFetchResult(normalizedFetchResult))
    .catch((error) => handleError(error));
}

/**
 * 게시글 삭제
 *
 * @param articleId 삭제할 게시글 아이디
 */
export function deleteArticle(articleId) {
  return fetch(`${API_HOST}/articles/${articleId}`, {
    method: 'DELETE',
  })
    .then((fetchResult) => normalizeFetchResult(fetchResult))
    .then((normalizedFetchResult) => handleNormalizedFetchResult(normalizedFetchResult))
    .catch((error) => handleError(error));
}

/**
 * fetch() 함수의 응답을 표준화된 형태로 변환합니다.
 *
 * @return
 *  - result.isSuccessful : 요청이 성공했는지 여부 (200번대 응답 여부)
 *  - result.status : 응답상태 코드
 *  - result.payload : 응답결과 또는 에러사유
 */
function normalizeFetchResult(response) {
  // 204 No Content 인 경우에는 응답 페이로드가 존재하지 않습니다.
  // 위의 이유로 `response.json()` 를 호출했을 때 에러가 발생하므로 별도처리합니다.
  if(response.status === 204) {
    return { isSuccessful: response.ok, status: response.status, payload: null };
  }

  return response
    .json()
    .then((payload) => ({ isSuccessful: response.ok, status: response.status, payload }));
}

/**
 * 성공 응답인 경우에는 응답 페이로드를 반환하고,
 * 실패 응답인 경우에는 사유가 담겨진 에러를 발생시킵니다.
 * 
 * `normalizeFetchResult` 에서 표준화된 데이터를 받아 처리하므로, 각 함수를 짧고 간결하게 작성할 수 있습니다.
 */
function handleNormalizedFetchResult(fetchResult) {
  // 200번대 응답이 아니라면, 발생사유가 담긴 에러를 발생시킨다.
  if (fetchResult.isSuccessful === false) {
    const errorMessage = `[StatusCode ${fetchResult.status}] ${fetchResult.payload.message}`;
    throw new Error(errorMessage);
  }

  return fetchResult.payload;
}

function handleError(error) {
  // 에러가 발생한 경우, 에러 내용을 콘솔에 출력하고 에러를 다시 던진다.
  console.error(error.message);

  throw error;
}
