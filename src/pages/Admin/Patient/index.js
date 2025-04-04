import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import { getPatientsList } from '../../../store/Patients/actions';

const Patient = () => {
    document.title = "Admin Panel | Patients List";

    const dispatch = useDispatch()



    const { patients, } = useSelector((state) => state?.Patient || []);


    useEffect(() => {
        dispatch(getPatientsList())
    }, [dispatch])


    const columns = useMemo(() => [
        {
            Header: "Patient Id",
            accessor: "id",
            filterable: true,
        },
        {
            Header: "First Name",
            accessor: "firstname",
            filterable: true,
        },
        {
            Header: "Last Name",
            accessor: "lastname",
            filterable: true,
        },
        {
            Header: "Email",
            accessor: "email",
            filterable: true,
        },

    ], []);

    return (
        <React.Fragment>
            <div className="page-content">

                <Container fluid>
                    <Row>
                        <Col xxl={12}>
                            <Card>
                                <CardBody>
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={patients}
                                            isGlobalFilter={true}
                                            customPageSize={10}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-3"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            SearchPlaceholder='Search for Patient...'
                                        />

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

export default Patient;