import React, { useEffect } from 'react';
import CountUp from "react-countup";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { getPatientsList, getPatientsSymptomsList } from '../../../store/Patients/actions';

const Widgets = () => {
    const dispatch = useDispatch();

    const { patients, symptomsList } = useSelector((state) => state?.Patient);

    const totalSymptoms = symptomsList?.length || 0;
    const totalPatient = patients?.length || 0;


    useEffect(() => {
        dispatch(getPatientsList());
        dispatch(getPatientsSymptomsList());

    }, [])

    const dashWidgets = [

        {
            id: 1,
            cardColor: "secondary",
            label: "No. of Symptoms",
            counter: totalSymptoms,
            link: "View Patient",
            to: '/nurse/patient-list',
            bgcolor: "info",
            icon: "las la-user-friends",

        },
        {
            id: 2,
            cardColor: "success",
            label: "No. of Patient",
            counter: totalPatient,
            link: "View Patient",
            to: '/nurse/patient-list',
            bgcolor: "success",
            icon: "las la-user-friends",
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