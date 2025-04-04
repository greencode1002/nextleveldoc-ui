import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_ADMIN, LOGIN_USER, LOGOUT_ADMIN, LOGOUT_USER, REGISTER_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginAdminSuccess, logoutAdminSuccess } from "./actions";

import { postLogin, postLogOut, userLogin, userRegister } from "../../helpers/backend_helper";
import { toast } from "react-toastify";
import axios from "axios";


function* LoginUser({ payload: { user, history } }) {

  try {
    const response = yield call(userLogin, {
      email: user.Email,
      password: user.Password,
    });
    if (response.status === 200) {
      sessionStorage.setItem("authUser", JSON.stringify(response.data));
      axios.defaults.headers.common["Authorization"] = "Bearer " + response?.data?.token;


      if (response.data.user.role === 'admin') {
        history('/admin/dashboard')
      } else if (response.data.user.role === 'patient') {
        history('/patient')
      } else if (response.data.user.role === 'doctor') {
        history('/doctor/dashboard')
      } else {
        history('/nurse')
      }
    } else {
      toast.error(response.data.message, { autoClose: 3000 });
    }
  } catch (error) {
    toast.error(error, { autoClose: 3000 });
  }
}


function* logoutAdmin({ payload: id }) {
  sessionStorage.removeItem("authAdmin");
  // try {
  //   const response = yield call(postLogOut, { adminId: id });

  //   if (response.success === true) {
  //     toast.success(response.message, { autoClose: 3000 });
  //     sessionStorage.removeItem("authAdmin");
  //     yield put(logoutAdminSuccess(response));
  //   } else {
  //     toast.error(response.message, { autoClose: 3000 });
  //   }
  // } catch (error) {
  //   yield put(apiError(LOGOUT_ADMIN, error));
  // }
}

function* RegisterUser({ payload: { user, history } }) {
  try {
    const response = yield call(userRegister, user);

    toast.success(response.data.message, { autoClose: 3000 });

    history('/login')
  } catch (error) {
    console.log('error', error);

  }
}


function* authSaga() {
  yield takeEvery(LOGOUT_USER, logoutAdmin);


  yield takeEvery(LOGIN_USER, LoginUser);

  yield takeEvery(REGISTER_USER, RegisterUser);
}

export default authSaga;
