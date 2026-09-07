export const getProductList = async (page, pageSize, keyword) => {
    try {
        const res = await axios.get(
            `https://panda-market-api-crud.vercel.app/products`, {
            params: {
                page: page,
                pageSize: pageSize,
                keyword: keyword
            }
        }
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProduct = async (productId) => {
    try {
        const res = await axios.get(
            `https://panda-market-api-crud.vercel.app/products/${productId}`
        );

        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (name, description, price, tags, images) => {
    try {
        const res = await axios.post(
            `https://panda-market-api-crud.vercel.app/products`,
            {
                name: name,
                description: description,
                price: price,
                tags: tags,
                images: images
            }
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const patchProduct = async (productId, name, description, price, tags, images) => {
    try {
        const res = await axios.get(
            `https://panda-market-api-crud.vercel.app/products/${productId}`,
            {
                name: name,
                description: description,
                price: price,
                tags: tags,
                images: images
            }
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (productId) => {
    try {
        const res = await axios.delete(
            `https://panda-market-api-crud.vercel.app/products/${productId}`
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

