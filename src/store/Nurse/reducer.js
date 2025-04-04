import { GET_PATIENTS_LIST_SUCCESS } from "./actionTypes";


const initialState = {
  patients: [],
};

const Patient = (state = initialState, action) => {

  switch (action.type) {

    case GET_PATIENTS_LIST_SUCCESS:
      state = {
        patients: action.payload?.users || []
      };
      break;


    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Patient;
