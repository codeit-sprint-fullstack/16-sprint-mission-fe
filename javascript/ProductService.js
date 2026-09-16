import {APIconfig} from "./config.js";

const { BASE_URL, CONTENT_TYPE, HTTP_METHODS} = APIconfig;

export const getProductList = async (page, pageSize, keyword) => {
    const params = new URLSearchParams({
        page: page || 1,
        pageSize: pageSize || 10,
        keyword: keyword || "",
    });

    try {
        const response = await fetch(`${BASE_URL}/products?${params}`, {
            method: HTTP_METHODS.GET,
            headers: {
                "Content-Type": CONTENT_TYPE,
            }
        });
        if (!response.ok) {
            console.log(`Error code: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}

export const getProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: HTTP_METHODS.GET,
            headers: {
                "Content-Type": CONTENT_TYPE,
            }
        });
        if (!response.ok) {
            console.log(`Error code: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}

export const createProduct = async (name, description, price, tags, images) => {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
            method: HTTP_METHODS.POST,
            headers: {
                "Content-Type": CONTENT_TYPE,
            },
            body: JSON.stringify({
                name,
                description,
                price,
                tags,
                images
            })
        });
        if (!response.ok) {
            console.log(`Error code: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}

export const patchProduct = async (id, name, description, price, tags, image) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: HTTP_METHODS.PATCH,
            headers: {
                "Content-Type": CONTENT_TYPE,
            },
            body: JSON.stringify({
                name,
                description,
                price,
                tags,
                image
            })
        });
        if (!response.ok) {
            console.log(`Error code: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            method: HTTP_METHODS.DELETE,
            headers: {
                "Content-Type": CONTENT_TYPE,
            }
        });
        if (!response.ok) {
            console.log(`Error code: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
}