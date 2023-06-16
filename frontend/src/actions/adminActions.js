import axios from "axios";
import {
  ADMIN_PORTFOLIO_CREATE_REQUEST,
  ADMIN_PORTFOLIO_CREATE_SUCCESS,
  ADMIN_PORTFOLIO_CREATE_FAIL,
  ADMIN_ARTWORK_CREATE_REQUEST,
  ADMIN_ARTWORK_CREATE_SUCCESS,
  ADMIN_ARTWORK_CREATE_FAIL,
  ADMIN_ARTWORK_DETAILS_REQUEST,
  ADMIN_ARTWORK_DETAILS_SUCCESS,
  ADMIN_ARTWORK_DETAILS_FAIL,
  ADMIN_LIST_MY_ARTWORK_REQUEST,
  ADMIN_LIST_MY_ARTWORK_SUCCESS,
  ADMIN_LIST_MY_ARTWORK_FAIL,
  ADMIN_DASHBOARD_LOAD_SUCCESS,
  ADMIN_DASHBOARD_LOAD_FAIL,
  ADMIN_LIST_MY_PORTFOLIOS_REQUEST,
  ADMIN_LIST_MY_PORTFOLIOS_SUCCESS,
  ADMIN_LIST_MY_PORTFOLIOS_FAIL,
  ADMIN_LIST_MY_EXHIBITIONS_REQUEST,
  ADMIN_LIST_MY_EXHIBITIONS_SUCCESS,
  ADMIN_LIST_MY_EXHIBITIONS_FAIL,
  ADMIN_LIST_MY_GALLERY_REQUEST,
  ADMIN_LIST_MY_GALLERY_SUCCESS,
  ADMIN_LIST_MY_GALLERY_FAIL,
} from "../constants/adminConstants";

//@route  GET /gallery
//@desc loads the gallery of background images for the Gallery Carousel
export const loadGallery = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_MY_GALLERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/artwork/mygallery", config);

    dispatch({ type: ADMIN_LIST_MY_GALLERY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADMIN_LIST_MY_GALLERY_FAIL, payload: err.msg });
  }
};

//@route  GET api/images/shop
//@desc loads all the images for the available inventory in the shop
export const loadMyArtwork = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_MY_ARTWORK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/artwork/my", config);

    dispatch({ type: ADMIN_LIST_MY_ARTWORK_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADMIN_LIST_MY_ARTWORK_FAIL, payload: err.msg });
  }
};

export const loadMyPortfolios = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_MY_PORTFOLIOS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/portfolios/my", config);

    dispatch({ type: ADMIN_LIST_MY_PORTFOLIOS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADMIN_LIST_MY_PORTFOLIOS_FAIL, payload: err.msg });
  }
};

export const loadMyExhibitions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_MY_EXHIBITIONS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/admin/exhibits/my", config);

    dispatch({ type: ADMIN_LIST_MY_EXHIBITIONS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADMIN_LIST_MY_EXHIBITIONS_FAIL, payload: err.msg });
  }
};

export const loadShop = () => (dispatch) => {
  try {
    dispatch(loadGallery());
    dispatch(loadPortfolios());
    dispatch(loadImages());
    dispatch(loadExhibitions());
    dispatch({ type: ADMIN_DASHBOARD_LOAD_SUCCESS });
  } catch (err) {
    dispatch({ type: ADMIN_DASHBOARD_LOAD_FAIL, payload: err.msg });
  }
};

export const getArtworkDetails = (filename) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ARTWORK_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/artwork/${filename}`);

    console.log("IN GET ARTWORK", data);

    dispatch({ type: ADMIN_ARTWORK_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADMIN_ARTWORK_DETAILS_FAIL, payload: err.msg });
  }
};

//@route  POST admin/upload/artwork
//@desc creates a new Image instance in db that stores the details for a single artwork
export const addArtwork =
  (formData, edit, history, file) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_ARTWORK_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const body = {
        ...formData,
        ...file,
      };

      const { data } = await axios.post("/api/artwork", body, config);

      console.log("in action addArtwork", data);

      dispatch({
        type: ADMIN_ARTWORK_CREATE_SUCCESS,
        payload: data,
      });

      console.log("success creating artwork");

      history.goBack();
      history.goBack();
    } catch (err) {
      dispatch({
        type: ADMIN_ARTWORK_CREATE_FAIL,
        payload: err.msg,
      });
    }
  };

// creates new portfolio
export const addPortfolio =
  ({ title, description }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_PORTFOLIO_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const body = JSON.stringify({ title, description });

      const { data } = await axios.post("/api/portfolios", body, config);

      dispatch({
        type: ADMIN_PORTFOLIO_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: ADMIN_PORTFOLIO_CREATE_FAIL,
      });
    }
  };
