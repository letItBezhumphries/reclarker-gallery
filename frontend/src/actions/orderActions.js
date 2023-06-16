import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_PAYMENT_INTENT_REQUEST,
  ORDER_PAYMENT_INTENT_SUCCESS,
  ORDER_PAYMENT_INTENT_FAIL,
  ORDER_POST_PAYMENT_REQUEST,
  ORDER_POST_PAYMENT_SUCCESS,
  ORDER_POST_PAYMENT_FAIL,
  ORDER_PAYMENT_METHOD_REQUEST,
  ORDER_PAYMENT_METHOD_SUCCESS,
  ORDER_PAYMENT_METHOD_FAIL,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { logout } from "./userActions";
import axios from "axios";

export const createOrder =
  (order, payment_method_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });
      localStorage.removeItem("cartItems");
      // dispatch(initPaymentIntent(data._id, payment_method_id));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

// init payment with stripe.js
export const initPaymentIntent =
  (id, paymentMethod) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAYMENT_INTENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const body = JSON.stringify({
        currency: "usd",
        payment_method_id: paymentMethod,
      });

      const { data } = await axios.post(
        `/api/order/${id}/payment`,
        body,
        config
      );

      // console.log('in action initPaymentIntent, data:', data);

      dispatch({ type: ORDER_PAYMENT_INTENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({ type: ORDER_PAYMENT_INTENT_FAIL, payload: message });
    }
  };

export const postPaymentIntent =
  (paymentMethod, currency, isSavingCard, shipping, paymentIntent) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_POST_PAYMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // let id = paymentMethod.id;
      console.log(
        "in action postPaymentIntent [arguments passed] paymentMethod:",
        paymentMethod,
        "currency:",
        currency,
        "shipping:",
        shipping,
        "isSavingCard:",
        isSavingCard,
        "paymentIntent:",
        paymentIntent
      );

      const body = JSON.stringify({
        payment_method_id: paymentMethod.id,
        payment_intent_id: paymentIntent,
        currency: "usd",
        isSavingCard: isSavingCard,
        shipping: shipping,
      });

      const { data } = await axios.post(
        "/api/order/stripe/payment",
        body,
        config
      );

      console.log("action [order.js] createPaymentIntent", data);

      dispatch({ type: ORDER_POST_PAYMENT_SUCCESS, payload: data });

      //should set it up so that the receipt_url is sent back to the client
      //which can be added to the success page
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({ type: ORDER_POST_PAYMENT_FAIL, payload: message });
    }
  };

export const addPaymentMethod =
  (paymentMethod, shipping, paymentIntent) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAYMENT_METHOD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const body = JSON.stringify({
        payment_method_id: paymentMethod,
        shipping: shipping,
        payment_intent_id: paymentIntent,
      });

      // if (shipping) {
      //   dispatch(addAddress(shipping));
      // }

      //send to api/stripe/payment-method
      const { data } = await axios.post(
        "/api/order/stripe/payment-method",
        body,
        config
      );

      console.log("in postPaymentMethod action, res.data:", data);

      dispatch({
        type: ORDER_PAYMENT_METHOD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_PAYMENT_METHOD_FAIL,
        payload: message,
      });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};
