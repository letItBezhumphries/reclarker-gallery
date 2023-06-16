import {
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL,
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_FAIL,
  ARTWORK_DETAILS_RESET,
  ARTWORK_CREATE_REQUEST,
  ARTWORK_CREATE_SUCCESS,
  ARTWORK_CREATE_FAIL,
  ARTWORK_UPDATE_REQUEST,
  ARTWORK_UPDATE_SUCCESS,
  ARTWORK_UPDATE_FAIL,
  ARTWORK_DELETE_REQUEST,
  ARTWORK_DELETE_SUCCESS,
  ARTWORK_DELETE_FAIL,
  ARTWORK_CREATE_REVIEW_REQUEST,
  ARTWORK_CREATE_REVIEW_SUCCESS,
  ARTWORK_CREATE_REVIEW_FAIL,
  ARTWORK_GET_RELATED_REQUEST,
  ARTWORK_GET_RELATED_SUCCESS,
  ARTWORK_GET_RELATED_RESET,
  ARTWORK_GET_RELATED_FAIL,
  ARTWORK_BY_ARTIST_FAIL,
  ARTWORK_BY_ARTIST_SUCCESS,
  ARTWORK_BY_TITLE_SUCCESS,
  ARTWORK_BY_TITLE_FAIL,
  ARTWORK_BY_EXHIBITION_SUCCESS,
  ARTWORK_BY_EXHIBITION_FAIL,
  ARTWORK_PRICE_RANGE_SUCCESS,
  ARTWORK_PRICE_RANGE_FAIL,
  ARTWORK_SEARCH_REQUEST,
  ARTWORK_SEARCH_RESET,
  ARTWORK_SEARCH_FAIL,
  ARTWORK_TOP_REQUEST,
  ARTWORK_TOP_SUCCESS,
  ARTWORK_TOP_FAIL,
} from "../constants/artworkConstants.js";
import { logout } from "./userActions";
import axios from "axios";

export const listArtworks =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ARTWORK_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/artwork?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      // const { data } = await axios.get("/api/artwork");

      // console.log("this is in the listArtworks -> data:", data);

      dispatch({ type: ARTWORK_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTWORK_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSelectedArtworkDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARTWORK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/artwork/${id}`);

    // console.log("this is in the listSelectedArtworkDetails -> data:", data);

    dispatch({ type: ARTWORK_DETAILS_SUCCESS, payload: data });

    // NEED TO GET RELATED ARTWORK HERE
    // dispatch(getRelatedArtwork(data.portfolio, id));
  } catch (error) {
    dispatch({
      type: ARTWORK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//to get all the images from the same portfolio/collection except the image that has been selected title
export const getRelatedArtwork =
  (collection, artworkId) => async (dispatch) => {
    try {
      dispatch({
        type: ARTWORK_GET_RELATED_REQUEST,
      });

      const { data } = await axios.get(
        `/api/artwork/s?collection=${collection}`
      );

      // console.log("this is in the getRelatedArtwork -> data:", data);

      // const artwork = data[0].images;

      const collectionRelated = data.filter((img) => img._id !== artworkId);

      dispatch({
        type: ARTWORK_GET_RELATED_SUCCESS,
        payload: collectionRelated,
      });
    } catch (error) {
      dispatch({
        type: ARTWORK_GET_RELATED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteArtwork = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTWORK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/artwork/${id}`, config);

    dispatch({
      type: ARTWORK_DELETE_SUCCESS,
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
      type: ARTWORK_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createArtwork = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTWORK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/artwork`, {}, config);

    dispatch({
      type: ARTWORK_CREATE_SUCCESS,
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
      type: ARTWORK_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateArtwork = (artwork) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTWORK_UPDATE_REQUEST,
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
      `/api/artwork/${artwork._id}`,
      artwork,
      config
    );

    dispatch({
      type: ARTWORK_UPDATE_SUCCESS,
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
      type: ARTWORK_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createArtworkReview =
  (artworkId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ARTWORK_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/artwork/${artworkId}/reviews`, review, config);

      dispatch({
        type: ARTWORK_CREATE_REVIEW_SUCCESS,
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
        type: ARTWORK_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const listTopRatedArtwork = () => async (dispatch) => {
  try {
    dispatch({ type: ARTWORK_TOP_REQUEST });

    const { data } = await axios.get(`/api/artwork/top`);

    // console.log("this is in the listTopRatedArtwork -> data:", data);

    dispatch({ type: ARTWORK_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ARTWORK_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//clears the state shop.image related and search fields
export const clearSelectedArtwork = () => (dispatch) => {
  try {
    dispatch({ type: ARTWORK_DETAILS_RESET });
    dispatch({ type: ARTWORK_GET_RELATED_RESET });
    dispatch(clearArtworkSearch());
  } catch (error) {
    dispatch({
      type: ARTWORK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearArtworkSearch = () => (dispatch) => {
  try {
    dispatch({ type: ARTWORK_SEARCH_RESET });
  } catch (error) {
    dispatch({
      type: ARTWORK_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//gets a single image by searching the title --this should return a single artwork that matches the searched title
export const searchArtworkByTitle =
  (title = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ARTWORK_SEARCH_REQUEST,
      });

      const { data } = await axios.get(`/api/artwork/s?title=${title}`);

      dispatch({ type: ARTWORK_BY_TITLE_SUCCESS, payload: data });

      let artworkId = data._id;

      console.log("searchArtworkByTitle data._id:", artworkId);

      dispatch(listSelectedArtworkDetails(artworkId));

      // location.push(`/api/artwork/${artworkId}`);
    } catch (error) {
      dispatch({
        type: ARTWORK_BY_TITLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// get images that match the search filter for selected collection title
export const searchArtworkByExhibition =
  (exhibition = "", page = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ARTWORK_SEARCH_REQUEST,
      });

      const { data } = await axios.get(
        `/api/artwork/s?exhibition=${exhibition}&page=${page}`
      );

      // const artwork = data[0].images;
      console.log("in search by exhibition action:", data);

      dispatch({ type: ARTWORK_BY_EXHIBITION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTWORK_BY_EXHIBITION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const sortArtworkByPriceRange = (min, max) => async (dispatch) => {
  try {
    dispatch({
      type: ARTWORK_SEARCH_REQUEST,
    });

    const { data } = await axios.get(`/api/artwork/s?min=${min}&max=${max}`);
    console.log("sort, pricerange:", data);

    dispatch({ type: ARTWORK_PRICE_RANGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ARTWORK_PRICE_RANGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchArtworkByArtist =
  (artist = "", page = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ARTWORK_SEARCH_REQUEST,
      });

      const { data } = await axios.get(
        `/api/artwork/s?artist=${artist}&page=${page}`
      );
      console.log("search artist by name:", data);

      dispatch({ type: ARTWORK_BY_ARTIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ARTWORK_BY_ARTIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
