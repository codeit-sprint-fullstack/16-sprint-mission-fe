const articleUrl = 'https://panda-market-api-crud.vercel.app/articles';

export const getArticleList  = (page, pageSize, keyword)=> {
  return fetch(`
    ${articleUrl}/?page=${page}&pageSize=${pageSize}&keyword=${keyword}
  `).then((res)=> {
    if(!res.ok){
      console.log('게시글 목룍을 불러오는데 실패했습니다.')
    };
    return res.json();
  }).catch((error)=>{
    console.error(error.message)
  });
};

export const getArticle = (articleId)=> {
  return fetch(
    `${articleUrl}/${articleId}`
  ).then((res)=> {
    if(!res.ok){
      console.log('게시글 목룍을 불러오는데 실패했습니다.')
    }
    return res.json()
  }).catch((error)=>{
    console.error(error.message)
  });
};

export const createArticle = (title, content, image)=> {
  return fetch(articleUrl,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      content,
      image
    })
  }).then((res)=> {
    if(!res.ok){
      console.log('게시글 생성에 실패했습니다.');
    }
    return res.json()
  }).catch((error)=>{
    console.error(error.message);
  });
};

export const patchArticle = (articleId, data)=> {
  return fetch(`${articleUrl}/${articleId}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res)=>{
    if(!res.ok){
      console.log('게시글 수정에 실패했습니다.');
    }
    return res.json();
  }).catch((error)=>{
    console.error(error.message);
  });
};

export const deleteArticle = (articleId)=> {
  return fetch(`${articleUrl}/${articleId}`,{
    method: 'DELETE'
  }).then((res)=>{
    if(!res.ok){
      console.log('게시글 삭제에 실패했습니다.');
    }
    return res.json();
  }).catch((error)=>{
    console.error(error.message);
  });
};

