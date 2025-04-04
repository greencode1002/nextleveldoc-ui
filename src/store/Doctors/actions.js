import { ADD_PRESCRIPTIONS, ADD_PRESCRIPTIONS_SUCCESS, GET_DOCTORS_LIST, GET_DOCTORS_LIST_SUCCESS, GET_PAYPAL_TRANSACTIONS, GET_PAYPAL_TRANSACTIONS_SUCCESS, } from "./actionTypes";




export const getDoctorsList = () => {
  return {
    type: GET_DOCTORS_LIST,
  };
};

export const getDoctorsListSuccess = (data) => {
  return {
    type: GET_DOCTORS_LIST_SUCCESS,
    payload: data
  }
}

export const addPrescriptions = (data) => {
  return {
    type: ADD_PRESCRIPTIONS,
    payload: data
  };
};

export const addPrescriptionsSuccess = (data) => {
  return {
    type: ADD_PRESCRIPTIONS_SUCCESS,
    payload: data
  }
}

export const getPayPalTransactions = () => {
  return {
    type: GET_PAYPAL_TRANSACTIONS
  }
}

export const getPayPalTransactionsSuccess = (data) => {
  return {
    type: GET_PAYPAL_TRANSACTIONS_SUCCESS,
    payload: data
  }
}