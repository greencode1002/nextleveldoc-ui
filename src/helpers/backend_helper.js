import axios from "axios";
import { APIClient } from "./api_helper";

import * as url from "./url_helper";


const api = new APIClient();

// ================== Admin ================================ //


export const userLogin = data => api.create(url.USER_LOGIN, data)
export const userRegister = data => api.create(url.USER_REGISTER, data);
export const editUser = data => api.put(url.UPDATE_USER + '/' + data.id, data);
export const deleteUser = data => api.delete(url.DELETE_USER + '/' + data.id);


export const getDoctors = () => api.get(url.GET_DOCTORS)
export const getTransactions = () => api.get(url.GET_TRANSACTIONS)
export const createTransactions = (data) => api.create(url.ADD_TRANSACTIONS, data)
export const addPrescription = (data) => api.create(url.ADD_PRESCRIPTION, data)

export const getPatients = () => api.get(url.GET_PATIENTS)
export const getPatientHistory = (id) => api.get(url.GET_PATIENTS_HISTORY + '/' + id)
export const getMyprescription = (id) => api.get(url.GET_PRESCRIPTION + '/' + id);

export const getPatienSymptoms = () => api.get(url.GET_SYMPTOMS);
export const addPatienSymptoms = (data) => api.create(url.ADD_SYMPTOMS, data)
export const updatePatienSymptoms = (data) => api.put(url.UPDATE_SYMPTOMS + '/' + data.symptom_id, data)
export const deletePatienSymptoms = (id) => api.delete(url.DELETE_SYMPTOMS + '/' + id)

//admin Change Password
export const updateChangePassword = (data) => api.create(url.UPDATE_CHANGE_PASSWORD_ADMIN, data);
export const userChangePassword = (data) => api.create(url.UPDATE_CHANGE_PASSWORD_USER, data);


export const downloadPrescription = async (symptom_id) => {
    return await axios.get(url.DOWNLOAD_PRESCRIPTION + '/' + symptom_id, {
        responseType: "arraybuffer", // Ensures binary data is received
    });
};
