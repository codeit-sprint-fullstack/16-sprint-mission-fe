const BASE_URL = "https://panda-market-api-crud.vercel.app";

export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const url =
    `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 목록 조회 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error("게시글 목록을 가져오는 중 오류 발생:", error);
      throw error;
    });
}

export function getArticle(articleId) {
  return fetch(`${BASE_URL}/articles/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`게시글 조회 실패: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      console.error("게시글을 가져오는 중 오류 발생:", error);
      throw error;
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
      console.error("게시글 생성 중 오류 발생:", error);
      throw error;
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
      console.error("게시글 수정 중 오류 발생:", error);
      throw error;
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
      console.error("게시글 삭제 중 오류 발생:", error);
      throw error;
    });
}