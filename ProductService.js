import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";

const BASE_URL = "https://panda-market-api-crud.vercel.app";

async function request(url, options = {}) {
  try {
    const response = await axios({
      url,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function getProductList(
  page = 1,
  pageSize = 10,
  keyword = ""
) {
  return request(`${BASE_URL}/products`, {
    method: "GET",
    params: {
      page,
      pageSize,
      keyword,
    },
  });
}

export async function getProduct(productId) {
  return request(`${BASE_URL}/products/${productId}`, {
    method: "GET",
  });
}

export async function createProduct(
  name,
  description,
  price,
  tags,
  images
) {
  return request(`${BASE_URL}/products`, {
    method: "POST",
    data: {
      name,
      description,
      price,
      tags,
      images,
    },
  });
}

export async function patchProduct(
  productId,
  name,
  description,
  price,
  tags,
  images
) {
  return request(`${BASE_URL}/products/${productId}`, {
    method: "PATCH",
    data: {
      name,
      description,
      price,
      tags,
      images,
    },
  });
}

export async function deleteProduct(productId) {
  return request(`${BASE_URL}/products/${productId}`, {
    method: "DELETE",
  });
}