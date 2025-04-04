import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
    const history = useNavigate();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    const [isDoctor, setIsDoctor] = useState(false);
    const [isPatient, setIsPatient] = useState(false);
    const [isTransactions, setIsTransactions] = useState(false);
    const [isPrescription, setIsPrescription] = useState(false);



    const user = JSON.parse(sessionStorage.getItem("authUser")).user;


    const [iscurrentState, setIscurrentState] = useState('Dashboard');


    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');

        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Doctor') {
            setIsDoctor(false);
        }
        if (iscurrentState !== 'Patient') {
            setIsPatient(false);
        }
        if (iscurrentState !== 'Prescription') {
            setIsPrescription(false);
        }

    }, [
        history,
        iscurrentState,
        isDashboard, isDoctor, isPatient, isPrescription
    ]);


    const adminItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: " ri-dashboard-line",
            link: "/admin/dashboard",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Dashboard');
                setIsDashboard(!isDashboard);
            }
        },
        {
            id: "doctor",
            label: "Doctor",
            icon: "las la-stethoscope",
            link: "/admin/doctor",
            stateVariables: isDoctor,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Doctor');
                setIsDoctor(!isDoctor);
            }
        },
        {
            id: "patient",
            label: "Patient",
            icon: "las la-user-friends",
            link: "/admin/patient",
            stateVariables: isPatient,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Patient');
                setIsPatient(!isPatient);
            }
        },
        {
            id: "prescription",
            label: "Prescription",
            icon: "las la-prescription",
            link: "/admin/prescription",
            stateVariables: isPrescription,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Prescription');
                setIsPrescription(!isPrescription);
            }
        },
    ]


    const doctorItems = [

        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: " ri-dashboard-line",
            link: "/doctor/dashboard",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Dashboard');
                setIsDashboard(!isDashboard);
            }
        },

        {
            id: "patient",
            label: "Patient",
            icon: "las la-user-friends",
            link: "/doctor/patient",
            stateVariables: isPatient,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Patient');
                setIsPatient(!isPatient);
            }
        },
        {
            id: "pransactions",
            label: "Transactions",
            icon: "ri-paypal-fill",
            link: "/doctor/transactions",
            stateVariables: isTransactions,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Transactions');
                setIsTransactions(!isTransactions);
            }
        },

    ]


    const patientItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: " ri-dashboard-line",
            link: "/patient",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Dashboard');
                setIsDashboard(!isDashboard);
            }
        },

    ]

    const nurseItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: " ri-dashboard-line",
            link: "/nurse",
            stateVariables: isDashboard,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Dashboard');
                setIsDashboard(!isDashboard);
            }
        },
        {
            id: "patient",
            label: "Patient",
            icon: "las la-user-friends",
            link: "/nurse/patient-list",
            stateVariables: isPatient,
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Patient');
                setIsPatient(!isPatient);
            }
        },
    ]


    const menuItems = user.role === 'admin' ? adminItems : user.role === 'doctor' ? doctorItems : user.role === 'nurse' ? nurseItems : patientItems;

    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;