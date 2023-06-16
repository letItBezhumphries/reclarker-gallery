import {
  ARTISTS_LIST_REQUEST,
  ARTISTS_LIST_SUCCESS,
  ARTISTS_LIST_FAIL,
  ARTIST_DETAILS_REQUEST,
  ARTIST_DETAILS_SUCCESS,
  ARTIST_DETAILS_FAIL,
  ARTIST_DETAILS_RESET,
  ARTISTS_POPULAR_REQUEST,
  ARTISTS_POPULAR_SUCCESS,
  ARTISTS_POPULAR_FAIL,
} from "../constants/artistConstants";

export const artistListReducer = (state = { artists: [] }, action) => {
  switch (action.type) {
    case ARTISTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ARTISTS_LIST_SUCCESS:
      return {
        loading: false,
        artists: action.payload,
      };
    case ARTISTS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const artistDetailsReducer = (state = { artist: {} }, action) => {
  switch (action.type) {
    case ARTIST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ARTIST_DETAILS_SUCCESS:
      return {
        loading: false,
        artist: action.payload,
      };
    case ARTIST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTIST_DETAILS_RESET:
      return {
        artist: {},
      };
    default:
      return state;
  }
};

export const artistsMostPopularReducer = (state = { artists: [] }, action) => {
  switch (action.type) {
    case ARTISTS_POPULAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ARTISTS_POPULAR_SUCCESS:
      return {
        loading: false,
        artists: action.payload,
      };
    case ARTISTS_POPULAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
