import {APIconfig} from './config.js';

const { baseURL, HTTP_METHODS, CONTENT_TYPE } = APIconfig;

export const getArticleList = async (page, pageSize, keyword) => {
    const params = new URLSearchParams({
        page: page || 1,
        pageSize: pageSize || 10,
        keyword: keyword || "",
    });
    const data = await fetch(`${baseURL}/articles?${params}`, {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));

    console.log(data);
}

export const getArticle = async (id) => {
    const data = await fetch(`${baseURL}/articles/${id}`, {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));

    console.log(data);
}

export const createArticle = async (title, content, image) => {
    const articleData = {
        title,
        content,
        image
    };
    const data = await fetch(`${baseURL}/articles`, {
        method: HTTP_METHODS.POST,
        headers: {
            "Content-Type": CONTENT_TYPE,
        },
        body: JSON.stringify(articleData)
    })
        .then(response => response.json())
        .catch(error => console.log(error));

    console.log(data);
}

export const patchArticle = async (id, title, content, image) => {
    const articleData = {
        title,
        content,
        image
    };
    const data = await fetch(`${baseURL}/articles/${id}`, {
        method: HTTP_METHODS.PATCH,
        headers: {
            "Content-Type": CONTENT_TYPE,
        },
        body: JSON.stringify(articleData)
    })
        .then(response => response.json())
        .catch(error => console.log(error));

    console.log(data);
}

export const deleteArticle = async (id) => {
    const data = await fetch(`${baseURL}/articles/${id}`, {
        method: HTTP_METHODS.DELETE,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));

    console.log(data);
}
