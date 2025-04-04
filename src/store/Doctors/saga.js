import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { ADD_PRESCRIPTIONS, GET_DOCTORS_LIST, GET_PAYPAL_TRANSACTIONS, } from "./actionTypes";

import { addPrescription, getDoctors, getTransactions, } from "../../helpers/backend_helper";
import { toast } from "react-toastify";
import { getDoctorsListSuccess, getPayPalTransactionsSuccess, } from "./actions";
import { getPatientsSymptomsList } from "../Patients/actions";





function* GetDoctorsList() {
  try {
    const response = yield call(getDoctors);
    if (response.status === 200) {
      yield put(getDoctorsListSuccess(response.data));
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error, { autoClose: 3000 });

  }
}
function* GetPayPalTransactions() {
  try {
    const response = yield call(getTransactions);

    if (response.status === 200) {
      yield put(getPayPalTransactionsSuccess(response.data));
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error, { autoClose: 3000 });

  }
}

function* AddPrescriptions({ payload }) {

  try {
    const response = yield call(addPrescription, payload);

    if (response.status === 201) {
      yield put(getPatientsSymptomsList(response.data));

    }
    toast.success(response.data.message, { autoClose: 3000 });
  } catch (error) {
    toast.error(error, { autoClose: 3000 });

    console.log('error', error);

  }
}


function* doctorSaga() {


  yield takeEvery(GET_DOCTORS_LIST, GetDoctorsList);
  yield takeEvery(ADD_PRESCRIPTIONS, AddPrescriptions);
  yield takeEvery(GET_PAYPAL_TRANSACTIONS, GetPayPalTransactions);
}

export default doctorSaga;
