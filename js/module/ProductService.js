// ===== 전역 변수 선언 ===== //
const apiUrl = 'https://panda-market-api-crud.vercel.app/products';

// ===== 함수 정의 ===== //

// 서버 응답 상태 확인
const validateResponse = async (response) => {
  if(!response.ok){
    const error = await response.json();
    throw error;
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

// ===== 상품 관련 함수 정의 ===== //

// 상품 목록 불러오기
export const getProductList = async (keyword = '', pageSize = 10, page = 1) => {
  try{
    const queryUrl = `?page=${page}&pageSize=${pageSize}&orderBy=recent&keyword=${keyword}`;
    const response = await fetch(apiUrl + queryUrl);
    const data = await validateResponse(response);
    
    console.log('\n🛒 상품 목록을 불러왔습니다.\n');
    console.log(`전체 상품: ${data.totalCount}개`);
    console.log(`불러온 상품: ${data.list.length}개\n`);
    data.list.forEach(product => {
      console.log(`[${product.id}] ${product.name} | ${product.price.toLocaleString()}원`);
    });

    return data.list;
  }catch(error){
    printErrorMessage(error);
  }
}

// 상품 정보 불러오기
export const getProduct = async (id) => {
  try{
    const response = await fetch(`${apiUrl}/${id}`);
    const product = await validateResponse(response);

    console.log('\n🎁 상품 정보를 불러왔습니다.\n');
    console.log(`번호: ${product.id}`);
    console.log(`상품: ${product.name}`);
    console.log(`설명: ${product.description}`);
    console.log(`가격: ${product.price.toLocaleString()}원`);
    console.log(`태그: ${product.tags.join(', ')}`);
    console.log(`이미지: ${product.images.join(', ')}`);
    console.log(`등록일: ${formatDate(product.createdAt)}`);
    console.log(`수정일: ${formatDate(product.updatedAt)}`);
  }catch(error){
    printErrorMessage(error);
  }
}

// 상품 등록하기
export const createProduct = async (productData) => {
  try{
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(productData)
    });
    const product = await validateResponse(response);

    console.log('\n🖼️ 상품을 등록했습니다.\n');
    console.log(`번호: ${product.id}`);
    console.log(`상품: ${product.name}`);
    console.log(`설명: ${product.description}`);
    console.log(`가격: ${product.price.toLocaleString()}원`);
    console.log(`태그: ${product.tags.join(', ')}`);
    console.log(`이미지: ${product.images.join(', ')}`);
    console.log(`등록일: ${formatDate(product.createdAt)}`);

    return product;
  }catch(error){
    printErrorMessage(error);
  }
}

// 상품 수정하기
export const patchProduct = async (id, productData) => {
  try{
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(productData)
    });
    const product = await validateResponse(response);

    console.log('\n🏷️ 상품을 수정했습니다.\n');
    console.log(`번호: ${product.id}`);
    console.log(`상품: ${product.name}`);
    console.log(`설명: ${product.description}`);
    console.log(`가격: ${product.price.toLocaleString()}원`);
    console.log(`태그: ${product.tags.join(', ')}`);
    console.log(`이미지: ${product.images.join(', ')}`);
    console.log(`등록일: ${formatDate(product.createdAt)}`);
    console.log(`수정일: ${formatDate(product.updatedAt)}`);
  }catch(error){
    printErrorMessage(error);
  }
}

// 상품 삭제하기
export const deleteProduct = async (id) => {
  try{
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });
    const product = await validateResponse(response);

    console.log('\n🗑️ 상품을 삭제했습니다.\n');
    console.log(`번호: ${product.id}`);
  }catch(error){
    printErrorMessage(error);
  }
}