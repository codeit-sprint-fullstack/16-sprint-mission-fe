const BASE_URL = "https://panda-market-api-crud.vercel.app/articles";

// 게시글 목록 조회
export function getArticleList(page, pageSize, keyword) {
  return fetch(
    `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then((response) => {
      if (!response.ok) {
        console.error(`에러 발생: ${response.status}`);
        throw new Error("게시글 목록을 불러오지 못했습니다.");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message);
    });
}


// 게시글 하나 조회
export function getArticle(articleId) {
  return fetch(`${BASE_URL}/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        console.error(`에러 발생: ${response.status}`);
        throw new Error("게시글을 불러오지 못했습니다.");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message);
    });
}


// 게시글 생성
export function createArticle(title, content, image) {
  return fetch(BASE_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`에러 발생: ${response.status}`);
        throw new Error("게시글을 생성하지 못했습니다.");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message);
    });
}


// 게시글 수정
export function patchArticle(articleId, title, content, image) {
  return fetch(`${BASE_URL}/${articleId}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`에러 발생: ${response.status}`);
        throw new Error("게시글을 수정하지 못했습니다.");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message);
    });
}


// 게시글 삭제
export function deleteArticle(articleId) {
  return fetch(`${BASE_URL}/${articleId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`에러 발생: ${response.status}`);
        throw new Error("게시글을 삭제하지 못했습니다.");
      }

      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message);
    });
}