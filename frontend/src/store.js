import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";
import {
  artworkListReducer,
  artworkDetailsReducer,
  artworkUpdateReducer,
  artworkCreateReducer,
  artworkSearchReducer,
  artworkDeleteReducer,
  artworkRelatedListReducer,
  artworkCreateReviewReducer,
  artworkTopRatedReducer,
} from "./reducers/artworkReducers";
import {
  artistListReducer,
  artistDetailsReducer,
  artistsMostPopularReducer,
} from "./reducers/artistReducers";
import { exhibitListReducer } from "./reducers/exhibitionReducers";
import { uploadReducer, uploadImageReducer } from "./reducers/uploadReducers";

const reducer = combineReducers({
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  artistList: artistListReducer,
  artistDetails: artistDetailsReducer,
  artistsPopular: artistsMostPopularReducer,
  exhibitList: exhibitListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  artworkList: artworkListReducer,
  artworkRelated: artworkRelatedListReducer,
  artworkDetails: artworkDetailsReducer,
  artworkUpdate: artworkUpdateReducer,
  artworkCreate: artworkCreateReducer,
  artworkDelete: artworkDeleteReducer,
  artworkSearchList: artworkSearchReducer,
  artworkCreateReview: artworkCreateReviewReducer,
  artworkTopRated: artworkTopRatedReducer,
  uploadInfo: uploadReducer,
  uploadImage: uploadImageReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

// console.log("in Store.js", userInfoFromStorage);

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
