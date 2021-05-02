import React, { useState } from "react";
import { loadCartItems } from "../pages/Core/helper";

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const value = loadCartItems() || [];
  let count = 0;

  value.map((d) => {
    return (count = count + d.count);
  });

  const [cart, setCart] = useState(count);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
