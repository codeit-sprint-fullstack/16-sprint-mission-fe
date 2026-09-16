const BASE_URL = "https://panda-market-api-crud.vercel.app";

export async function getProductList(
  page = 1,
  pageSize = 10,
  keyword = ""
) {
  const query = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  try {
    const response = await fetch(`${BASE_URL}/products?${query}`);

    if (!response.ok) {
      throw new Error(`상품 목록 조회 실패: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getProduct(productId) {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${productId}`
    );

    if (!response.ok) {
      throw new Error(`상품 상세 조회 실패: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
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

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
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
    const response = await fetch(
      `${BASE_URL}/products/${productId}`,
      {
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
      }
    );

    if (!response.ok) {
      throw new Error(`상품 수정 실패: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`상품 삭제 실패: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
  }
}