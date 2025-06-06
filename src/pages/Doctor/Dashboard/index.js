import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import Widget from "./Widgets";

const DoctorDashboard = () => {
    document.title = "Admin Panel | Dashboard";
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="h-100">
                                <Row>
                                    <Widget />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DoctorDashboard;
