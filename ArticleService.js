

const getArticleList = (page, pageSize, keyword) => {
  fetch(`https://panda-market-api-crud.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('에러 발생');
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};


const getArticle = (id) => {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('에러 발생');
    }

    return response.json();
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error)
  });
};


const createArticle = (title, content, image) => {
  fetch ('https://panda-market-api-crud.vercel.app/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      content: content,
      image: image
    })
  })
  .then  ((response) => {
    if (!response.ok) {
      throw new Error('에러 발생');
    }

    return response.json();
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error)
  });
};



const patchArticle = (id, title, content, image) => {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      image: image,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('에러 발생');
      }
      return response.json();
    })
    .then((data) => {
      console.log('수정 결과:', data);
    })
    .catch((error) => {
      console.log(error);
    });
};


const deleteArticle = (id) => {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: 'DELETE'})
    .then((response) => {
      if(!response.ok) {
        throw new Error ('에러 발생') 
      }
      return response.json();
    })
    .then((data) => {
      console.log('삭제 결과', data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
};