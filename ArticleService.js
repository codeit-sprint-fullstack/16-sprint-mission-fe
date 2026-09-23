const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';

// 응답 본문을 읽고, 상태 코드가 2XX가 아니면 에러를 던진다.
function handleResponse(response) {
  return response.text().then((text) => {
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      const message = data?.message ?? response.statusText;
      throw new Error(`[${response.status}] ${message}`);
    }

    return data;
  });
}

// 게시글 목록 조회
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  const params = new URLSearchParams({ page, pageSize });
  if (keyword) params.append('keyword', keyword);

  return fetch(`${BASE_URL}?${params}`, { method: 'GET' })
    .then(handleResponse)
    .catch((error) => {
      console.error('getArticleList 실패:', error.message);
    });
}

// 게시글 상세 조회
export function getArticle(articleId) {
  return fetch(`${BASE_URL}/${articleId}`, { method: 'GET' })
    .then(handleResponse)
    .catch((error) => {
      console.error('getArticle 실패:', error.message);
    });
}

// 게시글 생성
export function createArticle({ title, content, image }) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error('createArticle 실패:', error.message);
    });
}

// 게시글 수정 (바꾸고 싶은 필드만 전달)
export function patchArticle(articleId, updates) {
  return fetch(`${BASE_URL}/${articleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
    .then(handleResponse)
    .catch((error) => {
      console.error('patchArticle 실패:', error.message);
    });
}

// 게시글 삭제
export function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/${articleId}`, { method: 'DELETE' })
    .then(handleResponse)
    .catch((error) => {
      console.error('deleteArticle 실패:', error.message);
    });
}
