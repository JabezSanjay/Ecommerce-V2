import Cookies from "js-cookie";

const storeKeys = {
  user: {
    userDetails: "user",
  },
};

function cookieStorageHandler(key, value, method) {
  switch (method) {
    case "save":
      Cookies.set(key, value);
      break;
    case "get":
      return Cookies.get(key);
    case "remove":
      Cookies.remove(key);
      break;
    default:
      break;
  }
}

const User = {
  setUserDetails(details) {
    cookieStorageHandler(storeKeys.user.userDetails, details, "save");
  },

  getUserDetails() {
    const details = cookieStorageHandler(
      storeKeys.user.userDetails,
      null,
      "get"
    );
    return details ? JSON.parse(details) : null;
  },
  clearUserDetails() {
    cookieStorageHandler(storeKeys.user.userDetails, null, "remove");
  },
  clearAll() {
    Object.values(storeKeys.user).forEach((value) => {
      cookieStorageHandler(value, null, "remove");
    });
  },
};

const Common = {
  clearAll() {
    Object.values(storeKeys).forEach((value) => {
      cookieStorageHandler(value, null, "remove");
    });
    Object.values(storeKeys.user).forEach((value) => {
      cookieStorageHandler(value, null, "remove");
    });
  },
};

export { User, Common };
