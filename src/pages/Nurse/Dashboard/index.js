import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Widgets from './Widgets';

const NurseDashboard = () => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="h-100">
                                <Row>
                                    <Widgets />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NurseDashboard;