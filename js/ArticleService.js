//import axios from "axios";

export const getArticleList = async (page, pageSize, keyword) => {
    try {
        const res = await axios.get(
            "https://panda-market-api-crud.vercel.app/articles",
            {
                params: {
                    page,
                    pageSize,
                    keyword
                }
            }
        );

        return res.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const getArticle = async (articleId) => {
  
    try {
        const res = await axios.get(
            `https://panda-market-api-crud.vercel.app/articles/${articleId}`

        );
        
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const createArticle = async (title, content, image) => {
    try {
        const res = await axios.post(
            "https://panda-market-api-crud.vercel.app/articles",
            {
                image: image,
                title: title,
                content: content
            }
        );
        
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const patchArticle = async (articleId, title, content, image) => {
    try {
        const res = await axios.patch(
            `https://panda-market-api-crud.vercel.app/articles/${articleId}`,
            {
                image: image,
                title: title,
                content: content
            }
        );
        return res.data;
    } catch (error) {
        return error;
    }


}

export const deleteArticle = async (articleId) => {
    try {
        const res = await axios.delete(
            `https://panda-market-api-crud.vercel.app/articles/${articleId}`,

        );
        return res.data;
    } catch (error) {
        console.log(error);
    }


}