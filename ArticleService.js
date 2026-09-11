const BASE_URL = 'https://panda-market-api-crud.vercel.app';


//getArticleList method
export function getArticleList(page, pageSize, keyword) {
  const url =
    `${BASE_URL}/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('게시글 목록을 불러오지 못했습니다.');
      }

      return response.json();
    })

    .then((data) => {
      console.log(data);
      return data;
    })

    .catch((error) => {
      console.error(error);
    });
}


//getArticle method
export function getArticle(id){
    const url = `${BASE_URL}/articles/${id}`;
    
    return fetch(url)
    .then ((response)=> {
        if (!response.ok){
            throw new Error('게시글을 불러오지 못했습니다.');
        }
    
        return response.json();
    })

    .then((data)=>{
        console.log(data);
        return data;
    })

    .catch((error) => {
        console.error(error);
    });
}


//createArticle method
export function createArticle(title, content, image) {
  const url = `${BASE_URL}/articles`;

  const requestBody = {
    title,
    content,
    image,
  };

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('게시물 업로드에 실패했습니다.');
      }

      return response.json();
    })

    .then((data) => {
      console.log(data);
      return data;
    })

    .catch((error) => {
      console.error(error);
    });
}


//patchArticle method
export function patchArticle(id, title, content, image) {
  const url = `${BASE_URL}/articles/${id}`;

  const requestBody = {
    title,
    content,
    image,
  };

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('게시물 수정에 실패했습니다.');
      }

      return response.json();
    })

    .then((data) => {
      console.log(data);
      return data;
    })

    .catch((error) => {
      console.error(error);
    });
}


//delete Article method
export function deleteArticle(id) {
  const url = `${BASE_URL}/articles/${id}`;

  return fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('게시물 삭제에 실패했습니다.');
      }
      return response.json();

    })
    .catch((error) => {
      console.error(error);
    });
}

