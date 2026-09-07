const BASE_URL = "https://panda-market-api-crud.vercel.app";

export async function getProductList(
  page = 1,
  pageSize = 10,
  keyword = ""
) {
  const url =
    `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`상품 목록 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error(`상품 조회 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품을 가져오는 중 오류 발생:", error);
    throw error;
  }
}

export async function createProduct(
  name,
  description,
  price,
  tags,
  images
) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });

    if (!response.ok) {
      throw new Error(`상품 생성 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 생성 중 오류 발생:", error);
    throw error;
  }
}

export async function patchProduct(
  productId,
  name,
  description,
  price,
  tags,
  images
) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
        images,
      }),
    });

    if (!response.ok) {
      throw new Error(`상품 수정 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`상품 삭제 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    throw error;
  }
}