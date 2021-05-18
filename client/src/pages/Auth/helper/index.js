import { API } from "../../../backend";
import { User } from "../../../store";

export const register = async (user) => {
  try {
    const response = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (message) {
    return console.log(message);
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    User.clearUserDetails();
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log())
      .catch((err) => console.log(err));
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    User.setUserDetails(data);
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (User.getUserDetails()) {
    return User.getUserDetails();
  } else {
    return false;
  }
};
