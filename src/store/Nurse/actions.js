import { ADD_NEW_SYMPTOMS, ADD_NEW_SYMPTOMS_SUCCESS, UPDATE_SYMPTOMS_DATA, UPDATE_SYMPTOMS_DATA_SUCCESS } from "./actionTypes";







export const addNewSymptoms = (data) => {
  return {
    type: ADD_NEW_SYMPTOMS,
    payload: data
  };
};

export const addNewSymptomsSuccess = (data) => {
  return {
    type: ADD_NEW_SYMPTOMS_SUCCESS,
    payload: data
  }
}
export const updateSymptomsData = (data) => {
  return {
    type: UPDATE_SYMPTOMS_DATA,
    payload: data
  };
};

export const updateSymptomsDataSuccess = (data) => {
  return {
    type: UPDATE_SYMPTOMS_DATA_SUCCESS,
    payload: data
  }
}
