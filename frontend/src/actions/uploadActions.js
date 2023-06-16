import axios from "axios";
import {
  UPLOAD_IMAGE_ARTWORK_REQUEST,
  UPLOAD_IMAGE_ARTWORK_SUCCESS,
  UPLOAD_IMAGE_ARTWORK_FAIL,
  UPLOAD_S3_URL_REQUEST,
  UPLOAD_S3_URL_SUCCESS,
  UPLOAD_S3_URL_FAIL,
  UPLOAD_IMAGE_TO_S3_REQUEST,
  UPLOAD_IMAGE_TO_S3_SUCCESS,
  UPLOAD_IMAGE_TO_S3_FAIL,
} from "../constants/uploadConstants";

export const getS3SignedUrl = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_S3_URL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/upload/s3Url", config);

    console.log("in the gets3SignedUrl action:", data);

    dispatch({
      type: UPLOAD_S3_URL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_S3_URL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postImageToBucket = (url, file) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_IMAGE_TO_S3_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios.put(url, file, config);

    console.log("in postImageToBucket action succes!");

    dispatch({
      type: UPLOAD_IMAGE_TO_S3_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_TO_S3_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postImageForm = (id, form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_IMAGE_ARTWORK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/uploads3/images/${id}`,
      form,
      config
    );

    console.log("success in postImageForm action, data:", data);

    dispatch({
      type: UPLOAD_IMAGE_ARTWORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_ARTWORK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
