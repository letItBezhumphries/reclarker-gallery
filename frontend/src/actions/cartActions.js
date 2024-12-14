import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants.js";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/artwork/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      artwork: data._id,
      title: data.title,
      image: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

// Old cart actions
// export const loadCart = () => async (dispatch) => {
//   try {
//     const res = await axios.get("/api/shop/my-cart");

//     dispatch({ type: LOAD_CART, payload: res.data });
//   } catch (err) {
//     dispatch({ type: CART_ERROR, payload: err });
//   }
// };

// export const clearCart = () => async (dispatch) => {
//   try {
//     const res = await axios.delete("api/shop/my-cart");
//     dispatch({ type: CLEAR_CART, payload: res.data });
//   } catch (err) {
//     dispatch({ type: CART_ERROR, payload: err });
//   }
// };

// export const addToCart = (id, quantity, history) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ quantity: quantity });

//     const res = await axios.post(`/api/shop/my-cart/${id}`, body, config);

//     dispatch({ type: ADD_TO_CART_SUCCESS, payload: res.data });

//     // history.push(`/shop/my-cart`);
//   } catch (err) {
//     dispatch({ type: ADD_TO_CART_FAIL, payload: err });
//   }
// };

// export const removeFromCart = (id, quantity) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ quantity: quantity });

//     const res = await axios.delete(`/api/shop/my-cart/${id}`, body, config);

//     console.log(
//       "removeFromCart action to api/shop/my-cart, res.data:",
//       res.data
//     );

//     dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: res.data });

//     // history.push("/shop/my-cart");
//   } catch (err) {
//     dispatch({ type: REMOVE_FROM_CART_FAIL, payload: err });
//   }
// };
