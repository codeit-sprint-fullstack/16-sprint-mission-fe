const BASE_URL = "https://panda-market-api-crud.vercel.app/products";

// 상품 목록 조회
export async function getProductList(page, pageSize, keyword) {
  try {
    const response = await fetch(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    );

    if (!response.ok) {
      console.error(`에러 발생: ${response.status}`);
      throw new Error("상품 목록을 불러오지 못했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}


// 상품 하나 조회
export async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`);

    if (!response.ok) {
      console.error(`에러 발생: ${response.status}`);
      throw new Error("상품을 불러오지 못했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}


// 상품 생성
export async function createProduct(
  name,
  description,
  price,
  tags,
  images
) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        tags: tags,
        images: images,
      }),
    });

    if (!response.ok) {
      console.error(`에러 발생: ${response.status}`);
      throw new Error("상품을 생성하지 못했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}


// 상품 수정
export async function patchProduct(
  productId,
  name,
  description,
  price,
  tags,
  images
) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        tags: tags,
        images: images,
      }),
    });

    if (!response.ok) {
      console.error(`에러 발생: ${response.status}`);
      throw new Error("상품을 수정하지 못했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}


// 상품 삭제
export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`에러 발생: ${response.status}`);
      throw new Error("상품을 삭제하지 못했습니다.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
}