const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const query = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  return fetch(`${BASE_URL}/articles?${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 목록 조회 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function getArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 상세 조회 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function createArticle(title, content, image) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 생성 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function patchArticle(articleId, title, content, image) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 수정 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 삭제 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
}