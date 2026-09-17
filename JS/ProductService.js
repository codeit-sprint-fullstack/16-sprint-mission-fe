const address = "https://panda-market-api-crud.vercel.app";

// getProductList
export const getProductList = async (page, pageSize, keyword) => {
  const response = await fetch(
    `${address}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
  );
  if (!response.ok) {
    throw new Error(
      `상품 목록을 못 받았어요 — 서버가 ${response.status}로 답했어요`,
    );
  }

  // response.ok가 true일 때만
  // 아래 코드가 실행된다.
  const data = await response.json();
  return data;
};

//getProduct
export const getProduct = async (productId) => {
  const response = await fetch(`${address}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  // response.ok가 true일 때만
  // 아래 코드가 실행된다.
  const data = await response.json();
  return data;
};

//createProduct
export const createProduct = async (name, description, price, tags, images) => {
  const response = await fetch(`${address}/products`, {
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
    throw new Error(
      `상품을 만들지 못했어요 — 서버가 ${response.status}로 답했어요`,
    );
  }

  // response.ok가 true일 때만
  // 아래 코드가 실행된다.
  const data = await response.json();
  return data;
};

//patchProduct
export const patchProduct = async (
  productId,
  name,
  description,
  price,
  tags,
  images,
) => {
  const response = await fetch(`${address}/products/${productId}`, {
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
    throw new Error(
      `상품을 수정하지 못했어요 — 서버가 ${response.status}로 답했어요`,
    );
  }

  // response.ok가 true일 때만
  // 아래 코드가 실행된다.
  const data = await response.json();
  return data;
};

//deleteProduct
export const deleteProduct = async (productId) => {
  const response = await fetch(`${address}/products/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(
      `상품을 삭제하지 못했어요 — 서버가 ${response.status}로 답했어요`,
    );
  }
};
