import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsList } from '../../../store/Doctors/actions';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';

const Doctor = () => {
    document.title = "Admin Panel | Doctor List";

    const dispatch = useDispatch()

    const { doctors, } = useSelector((state) => state?.Doctor || []);


    useEffect(() => {
        dispatch(getDoctorsList())
    }, [dispatch])


    const columns = useMemo(() => [
        {
            Header: "Doctor Id",
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
                                            data={doctors}
                                            isGlobalFilter={true}
                                            customPageSize={10}
                                            className="custom-header-css"
                                            divClass="table-responsive table-card mb-3"
                                            tableClass="align-middle table-nowrap"
                                            theadClass="table-light"
                                            SearchPlaceholder='Search for Doctor...'
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

export default Doctor;