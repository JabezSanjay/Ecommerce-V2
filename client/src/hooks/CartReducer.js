const Storage = (cartItems) => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  Storage(cartItems);
  let itemCount = cartItems.reduce(
    (total, product) => total + product.count,
    0
  );
  let total = cartItems
    .reduce((total, product) => total + product.price * product.count, 0)
    .toFixed(2);
  return { itemCount, total };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find((item) => item._id === action.payload._id)) {
        state.cartItems.push({
          ...action.payload,
          count: action.count,
          total: action.count * action.payload.price,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item._id !== action.payload._id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action.payload._id),
        ],
      };
    case "INCREASE":
      let cartItemIncrease =
        state.cartItems[
          state.cartItems.findIndex((item) => item._id === action.payload._id)
        ];
      cartItemIncrease.count += action.count;

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item._id === action.payload._id)
      ].count--;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    default:
      return state;
  }
};
