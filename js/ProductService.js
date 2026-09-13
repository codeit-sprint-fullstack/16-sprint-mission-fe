const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';

export async function getProductList({ page, pageSize, keyword } = {}) {
  try {
    const res = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if (!res.ok) throw new Error(`Status Code: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Status Code: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function createProduct({ name, description, price, tags, images }) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) throw new Error(`Status Code: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function patchProduct(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Status Code: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Status Code: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}