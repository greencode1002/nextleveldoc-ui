import React, { useEffect } from 'react';
import PayPalButton from '../../../Components/Common/PayPalButton';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { addPayPalPayment } from '../../../store/Patients/actions';
import { useDispatch } from 'react-redux';

const PaypalPayment = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()


    const { medicine, notes, dosage, updated_at, symptom_id } = location.state
    const user = JSON.parse(sessionStorage.getItem("authUser")).user;

    const handleSuccessPayment = (value) => {

        if (value.status === "COMPLETED") {

            const newVal = {
                patient_id: user.id,
                symptom_id: symptom_id,
                amount: value?.purchase_units[0]?.amount?.value,
                payment_status: true
            }

            dispatch(addPayPalPayment(newVal))

        }
    }

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>

                    <Row className="justify-content-center">

                        <Col lg={6}>

                            <Card>
                                <div className="d-flex flex-grow-1 gap-1 m-2">
                                    <i className="ri-arrow-left-line me-1 align-bottom pb-1 px-1 fs-18" onClick={() => navigate(-1)} />
                                </div>

                                <CardBody>
                                    <div className="text-center">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <h4 className="mt-4 fw-bold">PayPal Payment</h4>


                                                <div className="d-flex align-items-center flex-wrap gap-2">
                                                    <div className="d-flex flex-grow-1 gap-1">
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div className="text-muted">
                                                                Name :{" "}
                                                                <span className="text-body fw-medium">
                                                                    {user?.firstname}{" "}{user?.lastname}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center flex-wrap gap-2">
                                                    <div className="d-flex flex-grow-1 gap-1">

                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div className="hstack gap-3 flex-wrap">
                                                                <div className="text-muted">
                                                                    Medicine :{" "}
                                                                    <span className="text-body fw-medium">
                                                                        {medicine}
                                                                    </span>
                                                                </div>
                                                                <div className="text-muted">
                                                                    Dosage :{" "}
                                                                    <span className="text-body fw-medium">
                                                                        {dosage}
                                                                    </span>
                                                                </div>
                                                                <div className="text-muted">
                                                                    Notes :{" "}
                                                                    <span className="text-body fw-medium">
                                                                        {notes}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <PayPalButton amount={1}
                                                        handleSuccessPayment={handleSuccessPayment}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>


                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </div>
        </React.Fragment>
    );
};

export default PaypalPayment;