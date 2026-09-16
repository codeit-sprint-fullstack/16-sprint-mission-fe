const productUrl = 'https://panda-market-api-crud.vercel.app/products';

export const getProductList = async (page, pageSize, keyword)=> {
  try {
    const res = await fetch(
      `${productUrl}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );
    if(!res.ok){
      console.log('상품 목룍을 불러오는데 실패했습니다.')
    }
    const result = await res.json();
    return result;
  } catch(error){
    console.error(error.message);
  }
};

export const getProduct = async(productId)=> {
  try {
    const res = await fetch(
      `${productUrl}/${productId}`
    );
    if(!res.ok){
      console.log('상품을 불러오는데 실패했습니다.')
    }
    const result = await res.json();
    return result;
  } catch(error){
    console.error(error.message);
  }
};

export const createProduct = async ( name, description, price, tags, images)=> {
  try {
    const res = await fetch(productUrl,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images
      }),
    });
    if(!res.ok){
      console.log('상품 생성에 실패했습니다.')
    }
    const result = await res.json();
    return result;
  } catch(error){
    console.error(error.message);
  }
};

export const patchProduct = async (productId, data)=> {
  try {
    const res = await fetch(`${productUrl}/${productId}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if(!res.ok){
      console.log('상품 수정에 실패했습니다.')
    }
    const result = await res.json();
    return result;
  } catch(error){
    console.error(error.message);
  }
};

export const deleteProduct = async(productId)=> {
  try {
    const res = await fetch(`${productUrl}/${productId}`,{
      method: 'DELETE'
    });
    if(!res.ok){
      console.log('상품 삭제에 실패했습니다.')
    }
    const result = await res.json();
    return result;
  } catch(error){
    console.error(error.message);
  }
};