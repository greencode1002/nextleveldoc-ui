import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { ADD_NEW_SYMPTOMS, GET_DOCTORS_LIST, GET_PATIENTS_LIST, UPDATE_SYMPTOMS_DATA, } from "./actionTypes";

import { addPatienSymptoms, updatePatienSymptoms, } from "../../helpers/backend_helper";
import { toast } from "react-toastify";
import { getPatientsSymptomsList } from "../Patients/actions";
import { updateSymptomsDataSuccess } from "./actions";





function* AddNewSymptoms({ payload: data }) {
  try {
    const response = yield call(addPatienSymptoms, data);

    if (response.status === 201) {
      yield put(getPatientsSymptomsList());
      toast.success(response?.data.message, { autoClose: 3000 });
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error, { autoClose: 3000 });
  }
}

function* UpdateSymptomsData({ payload: data }) {
  try {
    const response = yield call(updatePatienSymptoms, data);

    if (response.status === 200) {
      yield put(getPatientsSymptomsList());
      toast.success(response?.data.message, { autoClose: 3000 });
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error, { autoClose: 3000 });
  }
}


function* nurseSaga() {


  yield takeEvery(ADD_NEW_SYMPTOMS, AddNewSymptoms);
  yield takeEvery(UPDATE_SYMPTOMS_DATA, UpdateSymptomsData);
}

export default nurseSaga;
