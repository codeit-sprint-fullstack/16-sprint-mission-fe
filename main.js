const baseURL = "https://panda-market-api-crud.vercel.app";
const CONTENT_TYPE = "application/json";
const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

// Article API call functions

const getArticleList = async (page, pageSize, keyword) => {
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
        .then(response => response.json());

    console.log(data);
}


const getArticle = async (id) => {
    const data = await fetch(`${baseURL}/articles/${id}`, {
        method: HTTP_METHODS.GET,
        headers: {
            "Content-Type": CONTENT_TYPE,
        }
    })
        .then(response => response.json());

    console.log(data);
}

const createArticle = async (title, content, image) => {
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
        .then(response => response.json());

    console.log(data);
}

// getArticleList();
// getArticle(4312);
// createArticle("New Article", "This is the content of the new article.", "https://example.com/image.jpg");