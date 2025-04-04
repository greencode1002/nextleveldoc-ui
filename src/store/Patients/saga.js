import { call, put, takeEvery, } from "redux-saga/effects";

// Login Redux States
import { ADD_PATIENT_DATA, ADD_PAYPAL_PAYMENT, DELETE_PATIENT_DATA, DELETE_PATIENTS_SYMPTOMS, DOWNLOAD_PRESCRIPTION, GET_MY_PRESCRIPTIONS_LIST, GET_PATIENTS_LIST, GET_PATIENTS_SINGLE_VIEW, GET_PATIENTS_SYMPTOMS_LIST, UPDATE_PATIENT_DATA, } from "./actionTypes";

import { createTransactions, deletePatienSymptoms, deleteUser, downloadPrescription, editUser, getMyprescription, getPatienSymptoms, getPatientHistory, getPatients, userRegister, } from "../../helpers/backend_helper";
import { toast } from "react-toastify";
import { deleteSymptomDataSuccess, downloadPrescriptionsSuccess, getMyPrescriptions, getMyPrescriptionsSuccess, getPatientsList, getPatientsListSuccess, getPatientsSingleViewFailed, getPatientsSingleViewSuccess, getPatientsSymptomsListSuccess } from "./actions";
import { getPayPalTransactions } from "../Doctors/actions";



function* AddPatientsData({ payload }) {
  try {
    const response = yield call(userRegister, payload);
    toast.success(response.data.message, { autoClose: 3000 });
    yield put(getPatientsList())
  } catch (error) {
    console.log('error', error);

  }
}

function* UpdatePatientsData({ payload }) {
  try {
    const response = yield call(editUser, payload);
    toast.success(response.data.message, { autoClose: 3000 });
    yield put(getPatientsList())
  } catch (error) {
    console.log('error', error);

  }
}

function* DeletePatientsData({ payload }) {
  try {
    const response = yield call(deleteUser, payload);
    toast.success(response.data.message, { autoClose: 3000 });
    yield put(getPatientsList())
  } catch (error) {
    console.log('error', error);

  }
}

function* GetPatientsList() {
  try {
    const response = yield call(getPatients,);
    if (response.status === 200) {
      yield put(getPatientsListSuccess(response.data));
    }
  } catch (error) {
    toast.error(error, { autoClose: 3000 });

  }
}


function* GetPatientsSingleView({ payload }) {
  try {
    const response = yield call(getPatientHistory, payload);

    if (response.status === 200) {
      yield put(getPatientsSingleViewSuccess(response.data));
    }
  } catch (error) {
    console.log('error', error);
    yield put(getPatientsSingleViewFailed());

    toast.error(error, { autoClose: 3000 });

  }
}


function* DeletePatientSymptoms({ payload }) {


  try {
    const response = yield call(deletePatienSymptoms, payload);

    if (response.status === 200) {
      yield put(deleteSymptomDataSuccess(payload));
      toast.success(response.data.message, { autoClose: 3000 });

    }
  } catch (error) {
    console.log('err:R', error);
    toast.error(error, { autoClose: 3000 });

  }
}


function* GetMyPrescriptions({ payload }) {
  try {
    const response = yield call(getMyprescription, payload);
    if (response.status === 200) {

      yield put(getMyPrescriptionsSuccess(response.data));
    }
  } catch (error) {
    toast.error(error, { autoClose: 3000 });
  }
}

function* AddPayPalPayment({ payload }) {

  try {
    const response = yield call(createTransactions, payload);
    if (response.status === 201) {

      yield put(getMyPrescriptions(payload.patient_id));
      yield put(getPayPalTransactions(response.data));
      toast.success(response.data.message, { autoClose: 3000 });

    }
  } catch (error) {
    toast.error(error, { autoClose: 3000 });
  }
}


function* GetPatientsSymptomsList() {

  try {
    const response = yield call(getPatienSymptoms);

    if (response.status === 200) {
      yield put(getPatientsSymptomsListSuccess(response))
      // yield put(getNewSymptomsSuccess(response.data));
    } else if (response?.token === false) {
      toast.error(response?.message || response?.msg, { autoClose: 3000 });

    }
  } catch (error) {
    toast.error(error, { autoClose: 3000 });
  }
}


function* DownloadPrescriptions({ payload }) {
  try {
    const response = yield call(downloadPrescription, payload);
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `prescription_${payload}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      yield put(downloadPrescriptionsSuccess(response.data));
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error, { autoClose: 3000 });

  }
}


function* patientSaga() {


  yield takeEvery(GET_PATIENTS_LIST, GetPatientsList);
  yield takeEvery(ADD_PATIENT_DATA, AddPatientsData);
  yield takeEvery(UPDATE_PATIENT_DATA, UpdatePatientsData);
  yield takeEvery(DELETE_PATIENT_DATA, DeletePatientsData);
  yield takeEvery(GET_PATIENTS_SINGLE_VIEW, GetPatientsSingleView);
  yield takeEvery(GET_MY_PRESCRIPTIONS_LIST, GetMyPrescriptions);
  yield takeEvery(GET_PATIENTS_SYMPTOMS_LIST, GetPatientsSymptomsList);
  yield takeEvery(DOWNLOAD_PRESCRIPTION, DownloadPrescriptions);
  yield takeEvery(DELETE_PATIENTS_SYMPTOMS, DeletePatientSymptoms);

  yield takeEvery(ADD_PAYPAL_PAYMENT, AddPayPalPayment);

}

export default patientSaga;
