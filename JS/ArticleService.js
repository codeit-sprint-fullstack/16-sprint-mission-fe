const address = "https://panda-market-api-crud.vercel.app";

// getArticleList
export const getArticleList = (page, pageSize, keyword) => {
  return fetch(
    `${address}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
  )
    .then((response) => {
      // 404, 500 같은 서버 오류 확인
      if (!response.ok) {
        throw new Error(`실패: ${response.status}`);
      }

      // 응답 데이터를 JS 객체로 변환
      return response.json();
    })
    .catch((error) => {
      // 네트워크 오류 또는 throw 된 오류
      throw error;
    });
};

//
// getArticle
export const getArticle = (articleId) => {
  // ❌ /products/articleld/${articleld}
  // /articles/{articleId} <- "여기에 게시글 번호 넣어주세요"
  // ⭕ /articles/${id}
  return fetch(`${address}/articles/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

//
// createArticle
export const createArticle = (title, content, image) => {
  return fetch(`${address}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: image,
      content: content,
      title: title,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

//
//patchArticle
export const patchArticle = (articleId, title, content, image) => {
  return fetch(`${address}/articles/${articleId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: image,
      content: content,
      title: title,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

//
//deleteArticle
export const deleteArticle = (articleId) => {
  return fetch(`${address}/articles/${articleId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      // 삭제는 응답 JSON을 사용할 필요가 없다면
      // response.json() 생략 가능
    })
    .catch((error) => {
      throw error;
    });
};
