import { GET_DOCTORS_LIST_SUCCESS, GET_PAYPAL_TRANSACTIONS_SUCCESS } from "./actionTypes.js";




const initialState = {
  doctors: [],
  transactions: []
};

const Doctor = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTORS_LIST_SUCCESS:
      return {
        ...state,
        doctors: action.payload?.users || []
      };
    case GET_PAYPAL_TRANSACTIONS_SUCCESS:

      return {
        ...state,
        transactions: action.payload || []
      };
    default:
      return state;
  }
};
export default Doctor;
