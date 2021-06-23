import { API } from "../../../backend";

export const addItemtoCart = (item) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItemsFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // eslint-disable-next-line
    cart.map((product, i) => {
      if (productId === product._id) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const loadCartItems = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  next();
};

export const createOrder = async (userId, authToken, orderData) => {
  try {
    const reponse = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(orderData),
    });
    return await reponse.json();
  } catch (err) {
    return console.log(err);
  }
};

export const loadFavorites = async (userId, authToken) => {
  try {
    const response = await fetch(`${API}/user/get/favorite/${userId}`, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
