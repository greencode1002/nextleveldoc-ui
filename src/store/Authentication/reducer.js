import {
  LOGIN_ADMIN,
  LOGIN_ADMIN_SUCCESS,
  LOGOUT_ADMIN,
  LOGOUT_ADMIN_SUCCESS,
  API_ERROR,
  RESET_ADMIN_LOGIN_FLAG,
  LOGOUT_USER_SUCCESS,
  LOGIN_USER_SUCCESS
} from "./actionTypes";

const initialState = {
  errorMsg: "",
  loading: false,
  error: false,
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: false,
      };
      break;

    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default authReducer;
