const BASE_URL = "https://panda-market-api-crud.vercel.app";

/**
 *
 * @param {string} url
 * @param {RequestInit} option
 * @returns
 */
export async function request(url, option) {
  try {
    const response = await fetch(BASE_URL + url, {
      ...option,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: status >= 400, >= 500 별 처리
      throw new Error(`http status code with ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("error in request:", error.message);
  }
}
