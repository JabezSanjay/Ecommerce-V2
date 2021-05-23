import { API } from "../../../backend";

export const getAllUserOrders = async (userId, token) => {
  try {
    const response = await fetch(`${API}/user/orders/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
