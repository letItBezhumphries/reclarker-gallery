import {
  UPLOAD_S3_URL_REQUEST,
  UPLOAD_S3_URL_SUCCESS,
  UPLOAD_S3_URL_FAIL,
  UPLOAD_S3_URL_RESET,
  UPLOAD_IMAGE_ARTWORK_REQUEST,
  UPLOAD_IMAGE_ARTWORK_SUCCESS,
  UPLOAD_IMAGE_ARTWORK_FAIL,
  UPLOAD_IMAGE_ARTWORK_RESET,
  UPLOAD_IMAGE_TO_S3_REQUEST,
  UPLOAD_IMAGE_TO_S3_SUCCESS,
  UPLOAD_IMAGE_TO_S3_FAIL,
} from "../constants/uploadConstants.js";

const initialState = {
  loading: true,
  upload: null,
  s3url: null,
  success: false,
  error: {},
};

export const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_S3_URL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_S3_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        s3url: action.payload,
      };
    case UPLOAD_S3_URL_RESET:
      return {
        ...state,
        loading: false,
        s3url: null,
      };
    case UPLOAD_IMAGE_TO_S3_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case UPLOAD_IMAGE_TO_S3_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case UPLOAD_S3_URL_FAIL:
    case UPLOAD_IMAGE_TO_S3_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_ARTWORK_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case UPLOAD_IMAGE_ARTWORK_SUCCESS:
      return {
        loading: false,
        success: true,
        image: action.payload,
      };
    case UPLOAD_IMAGE_ARTWORK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPLOAD_IMAGE_ARTWORK_RESET:
      return {};
    default:
      return state;
  }
};
