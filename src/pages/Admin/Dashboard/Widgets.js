import React, { useEffect } from 'react';
import CountUp from "react-countup";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { getDoctorsList } from '../../../store/Doctors/actions';
import { getPatientsList } from '../../../store/Patients/actions';

const Widgets = () => {
    const dispatch = useDispatch();

    const { doctors, } = useSelector((state) => state?.Doctor || []);
    const { patients, } = useSelector((state) => state?.Patient || []);


    const totalDocotr = doctors?.length || 0;
    const totalPatient = patients?.length || 0;

    useEffect(() => {
        dispatch(getDoctorsList())
        dispatch(getPatientsList())
        // dispatch(getPrescriptionsList())
    }, [dispatch])



    const dashWidgets = [
        {
            id: 1,
            cardColor: "primary",
            label: "No. of Doctors",
            counter: totalDocotr,
            link: "View Doctor",
            to: '/admin/doctor',
            bgcolor: "light",
            icon: "las la-stethoscope",
        },
        {
            id: 2,
            cardColor: "secondary",
            label: "No. of Patients",
            counter: totalPatient,
            link: "View Patient",
            to: '/admin/patient',
            bgcolor: "info",
            icon: "las la-user-friends",

        },
        {
            id: 3,
            cardColor: "success",
            label: "No. of Prescriptions",
            counter: 0,
            link: "View Prescription",
            to: '/admin/prescription',
            bgcolor: "success",
            icon: "las la-file-prescription",
        },

    ];


    return (
        <React.Fragment>
            {dashWidgets.map((item, key) => (
                <Col xl={3} md={6} key={key}>
                    <Card className={"card-animate bg-" + item.cardColor}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-bold text-white-50 text-truncate mb-0">{item.label}</p>
                                </div>

                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-bold ff-secondary mb-4 text-white"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            separator={","}
                                            end={item.counter}
                                            duration={4}
                                        />
                                    </span></h4>
                                    <Link to={item.to} className="text-decoration-underline text-white-50">{item.link}</Link>
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    <span className="avatar-title rounded fs-3 bg-soft-light">
                                        <i className={`text-white ${item.icon}`}></i>
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>))}
        </React.Fragment>
    );
};

export default Widgets;