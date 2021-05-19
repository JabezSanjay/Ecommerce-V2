import { API } from "../../../backend";

//get all categories
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API}/category/all`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Create Category
export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Get a category
export const getaCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API}/category/${categoryId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Update Category
export const updateCategory = async (categoryId, userId, token, category) => {
  try {
    const response = await fetch(
      `${API}/category/update/${categoryId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(JSON.stringify(category));
  }
};

//Delete Category
export const deleteCategory = async (categoryId, userId, token) => {
  try {
    const response = await fetch(
      `${API}/category/delete/${categoryId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Get a product
export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Get all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API}/products/all`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Create a product
export const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Delete a product

export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(
      `${API}/product/delete/${productId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Update a product

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(
      `${API}/product/update/${productId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Get all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API}/users/all`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

//Get all orders
export const getAllOrders = async (token, userId) => {
  try {
    const response = await fetch(`${API}/orders/all/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
