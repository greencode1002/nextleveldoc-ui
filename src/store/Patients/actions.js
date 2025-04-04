import { ADD_PATIENT_DATA, ADD_PATIENT_DATA_SUCCESS, ADD_PAYPAL_PAYMENT, DELETE_PATIENT_DATA, DELETE_PATIENTS_SYMPTOMS, DELETE_PATIENTS_SYMPTOMS_SUCCESS, DOWNLOAD_PRESCRIPTION, DOWNLOAD_PRESCRIPTION_SUCCESS, GET_MY_PRESCRIPTIONS_LIST, GET_MY_PRESCRIPTIONS_LIST_SUCCESS, GET_PATIENTS_LIST, GET_PATIENTS_LIST_SUCCESS, GET_PATIENTS_SINGLE_VIEW, GET_PATIENTS_SINGLE_VIEW_FAILED, GET_PATIENTS_SINGLE_VIEW_SUCCESS, GET_PATIENTS_SYMPTOMS_LIST, GET_PATIENTS_SYMPTOMS_LIST_SUCCESS, UPDATE_PATIENT_DATA } from "./actionTypes";





export const getPatientsList = () => {
  return {
    type: GET_PATIENTS_LIST,
  };
};

export const getPatientsListSuccess = (data) => {
  return {
    type: GET_PATIENTS_LIST_SUCCESS,
    payload: data
  }
}


export const getMyPrescriptions = (data) => {

  return {
    type: GET_MY_PRESCRIPTIONS_LIST,
    payload: data
  }
}

export const getMyPrescriptionsSuccess = (data) => {
  return {
    type: GET_MY_PRESCRIPTIONS_LIST_SUCCESS,
    payload: data
  }
}

export const downloadPrescriptions = (data) => {
  return {
    type: DOWNLOAD_PRESCRIPTION,
    payload: data
  }
}

export const downloadPrescriptionsSuccess = (data) => {
  return {
    type: DOWNLOAD_PRESCRIPTION_SUCCESS,
    payload: data
  }
}



export const getPatientsSymptomsList = () => {
  return {
    type: GET_PATIENTS_SYMPTOMS_LIST,
  };
};
export const getPatientsSymptomsListSuccess = (data) => {
  return {
    type: GET_PATIENTS_SYMPTOMS_LIST_SUCCESS,
    payload: data
  };
};

export const getPatientsSingleView = (id) => {
  return {
    type: GET_PATIENTS_SINGLE_VIEW,
    payload: id
  }
}

export const getPatientsSingleViewSuccess = (data) => {
  return {
    type: GET_PATIENTS_SINGLE_VIEW_SUCCESS,
    payload: data
  }
}
export const getPatientsSingleViewFailed = () => {
  return {
    type: GET_PATIENTS_SINGLE_VIEW_FAILED,
  }
}

export const deleteSymptomData = (id) => {
  return {
    type: DELETE_PATIENTS_SYMPTOMS,
    payload: id
  }
}

export const deleteSymptomDataSuccess = (data) => {
  return {
    type: DELETE_PATIENTS_SYMPTOMS_SUCCESS,
    payload: data
  }
}

export const addNewPatients = data => {
  return {
    type: ADD_PATIENT_DATA,
    payload: data
  }
}

export const editPatientsData = data => {
  return {
    type: UPDATE_PATIENT_DATA,
    payload: data
  }
}

export const deletePatientsData = data => {
  return {
    type: DELETE_PATIENT_DATA,
    payload: data
  }
}

export const addPayPalPayment = data => {
  return {
    type: ADD_PAYPAL_PAYMENT,
    payload: data
  }
}