import React from "react";
import { Navigate } from "react-router-dom";


import LandingPage from "../pages/Landing/index.js";
//login
import Login from "../pages/Authentication/Login.js";
import Logout from "../pages/Authentication/Logout.js";
import ChangePassword from "../pages/Authentication/ChangePassword.js";
import Register from "../pages/Authentication/Register.js";


import Dashboard from "../pages/Admin/Dashboard";
import Prescription from "../pages/Admin/Prescription/index.js";
import Patient from "../pages/Admin/Patient/index.js";
import Doctor from "../pages/Admin/Doctor/index.js";


import DoctorDashboard from "../pages/Doctor/Dashboard/index.js";
import DoctorPatient from "../pages/Doctor/Patient/index.js";
import PatientDashboard from "../pages/Patient/Dashboard/index.js";

import NurseDashboard from "../pages/Nurse/Dashboard/index.js";
import PatientList from "../pages/Nurse/PatientList/index.js";
import PatientSingleView from "../pages/Nurse/PatientList/PatientSingleView.js";
import PaypalPayment from "../pages/Patient/Dashboard/PaypalPayment.js";
import Transactions from "../pages/Doctor/Transactions/index.js";

// ==================================================

const authProtectedRoutes = [
  { path: "/admin/dashboard", component: <Dashboard /> },

  // Doctor
  { path: "/admin/doctor", component: <Doctor /> },

  // Patient
  { path: "/admin/patient", component: <Patient /> },

  //  prescription
  { path: "/admin/prescription", component: <Prescription /> },


  { path: "/admin/change-password", component: <ChangePassword /> },

  //  Nurse
  { path: "/nurse", component: <NurseDashboard /> },
  { path: "/nurse/patient-list", component: <PatientList /> },
  { path: "/nurse/patient-view", component: <PatientSingleView /> },


  //  ================  doctor side   ===================

  { path: "/doctor/dashboard", component: <DoctorDashboard /> },
  { path: "/doctor/patient", component: <DoctorPatient /> },
  { path: "/doctor/patient-view", component: <PatientSingleView /> },
  { path: "/doctor/transactions", component: <Transactions /> },

  //  ==============  


  { path: "/patient", component: <PatientDashboard /> },
  { path: "/patient/pay", component: <PaypalPayment /> },


  //  ==============  
  {
    path: "/",
    exact: true,
    component: <Navigate to="/" />,
  },
  { path: "*", component: <Navigate to="/" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/admin/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/", component: <LandingPage /> },

];

export { authProtectedRoutes, publicRoutes };