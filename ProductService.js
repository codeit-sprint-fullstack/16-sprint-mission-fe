const BASE_URL = 'https://panda-market-api-crud.vercel.app';


//getProductList method
export async function getProductList(page, pageSize, keyword) {
  const url = `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('상품 목록을 불러오지 못했습니다.');
    }

    const data = await response.json();

    console.log(data);
    return data;
  } 

  catch (error) {
    console.error('상품 목록을 가져오지 못했습니다.',error)
  }
}


//getProduct method
export async function getProduct(id) {
  const url = `${BASE_URL}/products/${id}`;

  try{
    const response = await fetch(url);

    if (!response.ok){
        throw new Error('상품을 가져오지 못했습니다.')
    }

    const data = await response.json();

    console.log(data);
    return data;
  }

  catch (error) {
    console.error('상품을 가져오지 못했습니다.',error)
  }
}


//createProduct method
export async function createProduct(name, description, price, tags, images){
    const url = `${BASE_URL}/products` 
    const requestBody = {
        name,
        description,
        price,
        tags,
        images
  };

    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })

        if (!response.ok){
            throw new Error('상품 업로드에 실패했습니다.')
        }

        const data = await response.json();
            

        return data;
    }

    catch (error) {
        console.error('상품 업로드에 실패했습니다.', error);
    }

}


//patchProduct method
export async function patchProduct(id,name, description, price, tags, images){
    const url = `${BASE_URL}/products/${id}` 
    const requestBody = {
        name,
        description,
        price,
        tags,
        images
  };

    try{
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })

        if (!response.ok){
            throw new Error('상품 수정에 실패했습니다.')
        }

        const data = await response.json();
            

        return data;
    }

    catch (error) {
        console.error('상품 수정에 실패했습니다.', error);
    }

}


//deleteProduct method
export async function deleteProduct(id){
    const url = `${BASE_URL}/products/${id}` 


    try{
        const response = await fetch(url, {
            method: 'DELETE',
        })

        if (!response.ok){
            throw new Error('상품 삭제에 실패했습니다.')
        }

        const data = await response.json();
            
        return data;
    }

    catch (error) {
        console.error('상품 삭제에 실패했습니다.', error);
    }

}