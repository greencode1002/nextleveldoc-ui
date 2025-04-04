import { combineReducers } from "redux";

// Front
import Layout from "./Admin/layouts/reducer";
import Auth from "./Authentication/reducer";
import Doctor from "./Doctors/reducer";
import Patient from "./Patients/reducer";
// Authentication 

const rootReducer = combineReducers({
    // public
    Layout,
    Auth,
    Doctor,
    Patient,

});

export default rootReducer;