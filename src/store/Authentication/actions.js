import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER, LOGOUT_USER_SUCCESS, REGISTER_USER, REGISTER_USER_SUCCESS } from "./actionTypes";



export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginUserSuccess = user => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const logoutUser = (id) => {
  return {
    type: LOGOUT_USER,
    payload: id,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};


export const registerUser = (user, history) => {

  return {
    type: REGISTER_USER,
    payload: { user, history }
  }
}
export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user
  }
}
