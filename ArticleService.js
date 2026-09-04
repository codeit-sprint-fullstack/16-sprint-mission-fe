import {APIconfig} from './config.js';

const { baseURL, HTTP_METHODS, CONTENT_TYPE } = APIconfig;

export const getArticleList = (page, pageSize, keyword) => {
    const params = new URLSearchParams({
        page: page || 1,
        pageSize: pageSize || 10,
        keyword: keyword || "",
    });
    fetch(`${baseURL}/articles?${params}`, {
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
    fetch(`${baseURL}/articles/${id}`, {
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
    fetch(`${baseURL}/articles`, {
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
    fetch(`${baseURL}/articles/${id}`, {
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
    fetch(`${baseURL}/articles/${id}`, {
        method: HTTP_METHODS.DELETE,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
