const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;

    // return fetch(baseURL + `products/search/${category}`)
    //   .then(convertToJson)
    //   .then((data) => data.Result);
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    try {
      const res = await fetch(baseURL + "checkout/", options);
      return await convertToJson(res);
    } catch (err) {
        console.error("Request error:", err);

        const errorResponse = await (await fetch(baseURL + "checkout/", options)).text();
        console.error("Response error:", errorResponse);

        throw err;
    }

      // return await fetch(baseURL + "checkout/", options).then(convertToJson);
  
    }
}