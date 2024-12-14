import {
  ARTWORK_DETAILS_REQUEST,
  ARTWORK_DETAILS_SUCCESS,
  ARTWORK_DETAILS_FAIL,
  ARTWORK_DETAILS_RESET,
  ARTWORK_LIST_REQUEST,
  ARTWORK_LIST_SUCCESS,
  ARTWORK_LIST_FAIL,
  ARTWORK_CREATE_REQUEST,
  ARTWORK_CREATE_SUCCESS,
  ARTWORK_CREATE_FAIL,
  ARTWORK_CREATE_RESET,
  ARTWORK_UPDATE_REQUEST,
  ARTWORK_UPDATE_SUCCESS,
  ARTWORK_UPDATE_FAIL,
  ARTWORK_UPDATE_RESET,
  ARTWORK_DELETE_REQUEST,
  ARTWORK_DELETE_SUCCESS,
  ARTWORK_DELETE_FAIL,
  ARTWORK_GET_RELATED_REQUEST,
  ARTWORK_GET_RELATED_SUCCESS,
  ARTWORK_GET_RELATED_FAIL,
  ARTWORK_GET_RELATED_RESET,
  ARTWORK_BY_TITLE_SUCCESS,
  ARTWORK_BY_TITLE_FAIL,
  ARTWORK_BY_ARTIST_SUCCESS,
  ARTWORK_BY_ARTIST_FAIL,
  ARTWORK_BY_EXHIBITION_SUCCESS,
  ARTWORK_BY_EXHIBITION_FAIL,
  ARTWORK_PRICE_RANGE_SUCCESS,
  ARTWORK_PRICE_RANGE_FAIL,
  ARTWORK_SEARCH_REQUEST,
  ARTWORK_SEARCH_RESET,
  ARTWORK_TOP_REQUEST,
  ARTWORK_TOP_SUCCESS,
  ARTWORK_TOP_FAIL,
  ARTWORK_CREATE_REVIEW_REQUEST,
  ARTWORK_CREATE_REVIEW_SUCCESS,
  ARTWORK_CREATE_REVIEW_FAIL,
  ARTWORK_CREATE_REVIEW_RESET,
} from "../constants/artworkConstants.js";

export const artworkListReducer = (state = { artworks: [] }, action) => {
  switch (action.type) {
    case ARTWORK_LIST_REQUEST:
      return {
        loading: true,
        artworks: [],
      };
    case ARTWORK_LIST_SUCCESS:
      return {
        loading: false,
        artworks: action.payload.artworks,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ARTWORK_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const artworkDetailsReducer = (
  state = { artwork: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ARTWORK_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ARTWORK_DETAILS_SUCCESS:
      return {
        loading: false,
        artwork: action.payload,
      };
    case ARTWORK_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTWORK_DETAILS_RESET:
      return {
        loading: false,
        artwork: {},
      };
    default:
      return state;
  }
};

export const artworkDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTWORK_DELETE_REQUEST:
      return {
        loading: true,
      };
    case ARTWORK_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ARTWORK_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const artworkCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTWORK_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ARTWORK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        artwork: action.payload,
      };
    case ARTWORK_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTWORK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const artworkUpdateReducer = (state = { artwork: {} }, action) => {
  switch (action.type) {
    case ARTWORK_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case ARTWORK_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        artwork: action.payload,
      };
    case ARTWORK_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTWORK_UPDATE_RESET:
      return {
        artwork: {},
      };
    default:
      return state;
  }
};

export const artworkRelatedListReducer = (state = { related: [] }, action) => {
  switch (action.type) {
    case ARTWORK_GET_RELATED_REQUEST:
      return {
        loading: true,
        related: [],
      };
    case ARTWORK_GET_RELATED_SUCCESS:
      return {
        loading: false,
        related: action.payload,
      };
    case ARTWORK_GET_RELATED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTWORK_GET_RELATED_RESET:
      return {
        loading: true,
        related: [],
      };
    default:
      return state;
  }
};

export const artworkSearchReducer = (state = { search: [] }, action) => {
  switch (action.type) {
    case ARTWORK_SEARCH_REQUEST:
      return {
        loading: true,
        search: [],
      };
    case ARTWORK_BY_TITLE_SUCCESS:
    case ARTWORK_BY_EXHIBITION_SUCCESS:
    case ARTWORK_PRICE_RANGE_SUCCESS:
    case ARTWORK_BY_ARTIST_SUCCESS:
      return {
        loading: false,
        search: action.payload,
      };
    case ARTWORK_BY_TITLE_FAIL:
    case ARTWORK_BY_EXHIBITION_FAIL:
    case ARTWORK_PRICE_RANGE_FAIL:
    case ARTWORK_BY_ARTIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTWORK_SEARCH_RESET:
      return {};
    default:
      return state;
  }
};

export const artworkCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTWORK_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case ARTWORK_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ARTWORK_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ARTWORK_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const artworkTopRatedReducer = (state = { artwork: [] }, action) => {
  switch (action.type) {
    case ARTWORK_TOP_REQUEST:
      return {
        loading: true,
        artwork: [],
      };
    case ARTWORK_TOP_SUCCESS:
      return {
        loading: false,
        artwork: action.payload,
      };
    case ARTWORK_TOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
