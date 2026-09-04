const baseURL = "https://panda-market-api-crud.vercel.app";

const getArticleList = async (page, pageSize, keyword) => {
    const params = new URLSearchParams({
        page: page || 1,
        pageSize: pageSize || 10,
        keyword: keyword || "",
    });

    const data = await fetch(`${baseURL}/articles?${params}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json());

    console.log(data);
}
getArticleList();