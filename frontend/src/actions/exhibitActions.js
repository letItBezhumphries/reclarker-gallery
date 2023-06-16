import axios from "axios";
import {
  EXHIBITION_LIST_REQUEST,
  EXHIBITION_LIST_SUCCESS,
  EXHIBITION_LIST_FAIL,
} from "../constants/exhibitionConstants";

export const listExhibits = () => async (dispatch) => {
  try {
    dispatch({ type: EXHIBITION_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/api/exhibits", config);

    console.log("in listExhibits action -> data:", data);

    dispatch({ type: EXHIBITION_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: EXHIBITION_LIST_FAIL,
      payload: message,
    });
  }
};
