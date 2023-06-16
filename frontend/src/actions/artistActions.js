import {
  ARTISTS_LIST_REQUEST,
  ARTISTS_LIST_SUCCESS,
  ARTISTS_LIST_FAIL,
  ARTIST_DETAILS_REQUEST,
  ARTIST_DETAILS_SUCCESS,
  ARTIST_DETAILS_FAIL,
  ARTISTS_POPULAR_REQUEST,
  ARTISTS_POPULAR_SUCCESS,
  ARTISTS_POPULAR_FAIL,
} from "../constants/artistConstants";
import axios from "axios";

export const listArtists = () => async (dispatch) => {
  try {
    dispatch({
      type: ARTISTS_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/artists", config);

    // console.log("in listArtists action -> data:", data);

    dispatch({
      type: ARTISTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTISTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const getArtistDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ARTIST_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/artists/${id}`, config);

    // console.log("the artist details:", data);

    dispatch({
      type: ARTIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTIST_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const getPopularArtists = () => async (dispatch) => {
  try {
    dispatch({
      type: ARTISTS_POPULAR_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/artists/popular", config);

    // console.log("in listArtists action -> data:", data);

    dispatch({
      type: ARTISTS_POPULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTISTS_POPULAR_FAIL,
      payload: message,
    });
  }
};
