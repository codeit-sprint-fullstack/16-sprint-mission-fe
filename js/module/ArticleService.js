// ===== 전역 변수 선언 ===== //
const apiUrl = 'https://panda-market-api-crud.vercel.app/articles';

// ===== 함수 정의 ===== //

// 서버 응답 상태 확인
const validateResponse = (response) => {
  if(!response.ok){
    return response.json().then(error => {throw error});
  }
  return response.json();
}

// 에러 메시지 출력
const printErrorMessage = (error) => {
  switch(error.message){
    case 'Not Found':
      error.message = '서버 요청에 실패했습니다.'
      break;
    case 'Validation Failed':
      error.message = '매개변수를 제대로 입력해주세요.'
      break;
  }
  console.log(`⛔ 에러: ${error.message}`);
}

// 날짜 형식 변경
const formatDate = (dateValue) => {
  const createdDate = new Date(dateValue);

  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const date = createdDate.getDate();
  const hours = createdDate.getHours();
  let minutes = createdDate.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${year}.${month}.${date} ${hours}:${minutes}`;
}

// ===== 게시글 관련 함수 정의 ===== //

// 게시글 목록 불러오기
export const getArticleList = (keyword = '', pageSize = 10, page = 1) => {
  const queryUrl = `?page=${page}&pageSize=${pageSize}&orderBy=recent&keyword=${keyword}`;
  fetch(apiUrl + queryUrl)
    .then(response => validateResponse(response))
    .then(data => {
      console.log('\n📜 게시글 목록을 불러왔습니다.\n');
      console.log(`전체 게시글: ${data.totalCount}개`);
      console.log(`불러온 게시글: ${data.list.length}개\n`);
      data.list.forEach(article => {
        console.log(`[${article.id}] ${article.title} | ${formatDate(article.createdAt)}`);
      });
    })
    .catch(error => printErrorMessage(error));
}

// 게시글 정보 불러오기
export const getArticle = (id) => {
  fetch(`${apiUrl}/${id}`)
    .then(response => validateResponse(response))
    .then(article => {
      console.log('\n📄 게시글 정보를 불러왔습니다.\n');
      console.log(`번호: ${article.id}`);
      console.log(`제목: ${article.title}`);
      console.log(`내용: ${article.content}`);
      console.log(`이미지: ${article.image}`);
      console.log(`작성일: ${formatDate(article.createdAt)}`);
      console.log(`수정일: ${formatDate(article.updatedAt)}`);
    })
    .catch(error => printErrorMessage(error));
}

// 게시글 작성하기
export const createArticle = (articleData) => {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(articleData)
  })
    .then(response => validateResponse(response))
    .then(article => {
      console.log('\n📝 게시글을 작성했습니다.\n');
      console.log(`번호: ${article.id}`);
      console.log(`제목: ${article.title}`);
      console.log(`내용: ${article.content}`);
      console.log(`이미지: ${article.image}`);
      console.log(`작성일: ${formatDate(article.createdAt)}`);
    })
    .catch(error => printErrorMessage(error));
}

// 게시글 수정하기
export const patchArticle = (id, articleData) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(articleData)
  })
    .then(response => validateResponse(response))
    .then(article => {
      console.log('\n✍🏻 게시글을 수정했습니다.\n');
      console.log(`번호: ${article.id}`);
      console.log(`제목: ${article.title}`);
      console.log(`내용: ${article.content}`);
      console.log(`이미지: ${article.image}`);
      console.log(`작성일: ${formatDate(article.createdAt)}`);
      console.log(`수정일: ${formatDate(article.updatedAt)}`);
    })
    .catch(error => printErrorMessage(error));
}

// 게시글 삭제하기
export const deleteArticle = (id) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(response => validateResponse(response))
    .then(article => {
      console.log('\n🗑️ 게시글을 삭제했습니다.\n');
      console.log(`번호: ${article.id}`);
    })
    .catch(error => printErrorMessage(error));
}