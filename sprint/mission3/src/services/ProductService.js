import axios from 'axios';

import { API_HOST } from '../constant/constant.js';

export async function getProductList(page, pageSize, keyword) {
  try {
    const response = await axios.get(`${API_HOST}/products`, {
      params: { page, pageSize, keyword },
    });

    return response.data;
  } catch (error) {
    // error.response가 있다면, 서버 측에서 에러응답을 반환한 경우입니다.
    if (error.response) {
      const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;

      console.error(errorMessage);

      throw new Error(`[StatusCode ${error.response.status}] ${error.response.data.message}`);
    }

    // error.response가 없다면, 네트워크 오류 등으로 서버가 응답하지 않은 경우입니다.
    throw error;
  }
}

export async function getProduct(productId) {
  try {
    const response = await axios.get(`${API_HOST}/products/${productId}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;

      console.error(errorMessage);

      throw new Error(`[StatusCode ${error.response.status}] ${error.response.data.message}`);
    }

    throw error;
  }
}

export async function createProduct(name, description, price, manufacturer, tags, images) {
  try {
    const response = await axios.post(`${API_HOST}/products`, {
      name,
      description,
      price,
      manufacturer,
      tags,
      images,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;

      console.error(errorMessage);

      throw new Error(`[StatusCode ${error.response.status}] ${error.response.data.message}`);
    }

    throw error;
  }
}

export async function patchProduct(productId, name, description, price, tags, images) {
  try {
    const response = await axios.patch(`${API_HOST}/products/${productId}`, {
      name,
      description,
      price,
      tags,
      images,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;

      console.error(errorMessage);

      throw new Error(`[StatusCode ${error.response.status}] ${error.response.data.message}`);
    }

    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`${API_HOST}/products/${productId}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = `[StatusCode ${error.response.status}] ${error.response.data.message}`;

      console.error(errorMessage);

      throw new Error(`[StatusCode ${error.response.status}] ${error.response.data.message}`);
    }

    throw error;
  }
}
