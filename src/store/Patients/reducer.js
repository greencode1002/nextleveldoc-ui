import {
  DELETE_PATIENTS_SYMPTOMS_SUCCESS,
  GET_MY_PRESCRIPTIONS_LIST_SUCCESS,
  GET_PATIENTS_LIST_SUCCESS,
  GET_PATIENTS_SINGLE_VIEW_FAILED,
  GET_PATIENTS_SINGLE_VIEW_SUCCESS,
  GET_PATIENTS_SYMPTOMS_LIST_SUCCESS
} from "./actionTypes";

const initialState = {
  patients: [],
  myPrescription: [],
  symptomsList: [],
  patientHistory: []
};

const Patient = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS_LIST_SUCCESS:
      return {
        ...state,
        patients: action.payload?.users || []
      };
    case GET_PATIENTS_SINGLE_VIEW_SUCCESS:

      return {
        ...state,
        patientHistory: action.payload || []
      };
    case GET_PATIENTS_SINGLE_VIEW_FAILED:

      return {
        ...state,
        patientHistory: []
      };

    case GET_MY_PRESCRIPTIONS_LIST_SUCCESS:
      return {
        ...state,
        myPrescription: action.payload || []
      };

    case GET_PATIENTS_SYMPTOMS_LIST_SUCCESS:
      return {
        ...state,
        symptomsList: action.payload?.data || []  // Ensure symptomsList gets updated properly
      };
    case DELETE_PATIENTS_SYMPTOMS_SUCCESS:

      return {
        ...state,
        symptomsList: state.symptomsList.filter(
          item => item.symptom_id.toString() !== action.payload.toString()),
      };

    default:
      return state;
  }
};

export default Patient;
