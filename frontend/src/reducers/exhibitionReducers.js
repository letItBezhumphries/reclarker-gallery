import {
  EXHIBITION_LIST_REQUEST,
  EXHIBITION_LIST_SUCCESS,
  EXHIBITION_LIST_FAIL,
} from "../constants/exhibitionConstants";

export const exhibitListReducer = (state = { exhibits: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case EXHIBITION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXHIBITION_LIST_SUCCESS:
      return {
        ...state,
        exhibits: payload.exhibits,
        loading: false,
      };
    case EXHIBITION_LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default: {
      return state;
    }
  }
};
