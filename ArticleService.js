import {APIconfig} from './config.js';

const { BASE_URL, CONTENT_TYPE, HTTP_METHODS} = APIconfig;

export const getArticleList = (page, pageSize, keyword) => {
    const params = new URLSearchParams({
        page: page || 1,
        pageSize: pageSize || 10,
        keyword: keyword || "",
    });
    fetch(`${BASE_URL}/articles?${params}`, {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

export const getArticle = (id) => {
    fetch(`${BASE_URL}/articles/${id}`, {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

export const createArticle = (title, content, image) => {
    const articleData = {
        title,
        content,
        image
    };
    fetch(`${BASE_URL}/articles`, {
        method: HTTP_METHODS.POST,
        headers: {
            "Content-Type": CONTENT_TYPE,
        },
        body: JSON.stringify(articleData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

export const patchArticle = (id, title, content, image) => {
    const articleData = {
        title,
        content,
        image
    };
    fetch(`${BASE_URL}/articles/${id}`, {
        method: HTTP_METHODS.PATCH,
        headers: {
            "Content-Type": CONTENT_TYPE,
        },
        body: JSON.stringify(articleData)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

export const deleteArticle = (id) => {
    fetch(`${BASE_URL}/articles/${id}`, {
        method: HTTP_METHODS.DELETE,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
