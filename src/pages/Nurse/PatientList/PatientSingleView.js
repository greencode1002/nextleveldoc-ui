import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientsSingleView } from '../../../store/Patients/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';

const PatientSingleView = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const id = location.state?.id;
    const { patientHistory } = useSelector((state) => state?.Patient);


    useEffect(() => {

        dispatch(getPatientsSingleView(id));

    }, [dispatch])



    const columns = useMemo(() => [

        {
            Header: "Medicine",
            accessor: "medicine",
            filterable: true,
            Cell: (cell) => {
                return <React.Fragment> {cell.value === null ? 'N/A' : cell.value} </React.Fragment>;
            },
        },
        {
            Header: "Dosage",
            accessor: "dosage",
            filterable: true,
            Cell: (cell) => {
                return <React.Fragment> {cell.value === null ? 'N/A' : cell.value} </React.Fragment>;
            },
        },
        {
            Header: "Notes",
            accessor: "notes",
            filterable: true,
            Cell: (cell) => {
                return <React.Fragment> {cell.value === null ? 'N/A' : cell.value} </React.Fragment>;
            },
        },
        {
            Header: "Prescription Status",
            accessor: "is_prescribed",
            filterable: true,
            Cell: (cell) => {

                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Done'}</span>
                        : <span className="badge badge-soft-warning text-uppercase">{'Pending'}</span>
                    }
                </React.Fragment>;
            },

        },
        {
            Header: "Payment Status",
            accessor: "is_payment_completed",
            filterable: true,
            Cell: (cell) => {
                return <React.Fragment>
                    {cell.value === 1 ? <span className="badge badge-soft-success text-uppercase">{'Complete'}</span>
                        : <span className="badge badge-soft-warning text-uppercase">{'Pending'}</span>
                    }
                </React.Fragment>;
            },
        },


    ], []);


    return (
        <React.Fragment>

            <div className="page-content">

                <Container fluid>
                    <Row>
                        <Col xxl={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex align-items-center flex-wrap gap-2">
                                        <div className="d-flex flex-grow-1 gap-1 mb-2">

                                            <i className="ri-arrow-left-line me-1 align-bottom pb-1 px-1" onClick={() => navigate(-1)} />

                                            <span className="text-body fw-medium">
                                                Patients History
                                            </span>
                                        </div>

                                    </div>
                                    <div className="d-flex align-items-center flex-wrap gap-2">
                                        <div className="d-flex flex-grow-1 gap-1">

                                            <div className="hstack gap-3 flex-wrap">
                                                <div className="text-muted">
                                                    Name :{" "}
                                                    <span className="text-body fw-medium">
                                                        {patientHistory[0]?.firstname}{" "}{patientHistory[0]?.lastname}
                                                    </span>
                                                </div>
                                                <div className="text-muted">
                                                    Email :{" "}
                                                    <span className="text-body fw-medium">
                                                        {patientHistory[0]?.email}
                                                    </span>
                                                </div>
                                                <div className="text-muted">
                                                    Age :{" "}
                                                    <span className="text-body fw-medium">
                                                        {patientHistory[0]?.age}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={patientHistory || []}
                                            // isGlobalFilter={true}
                                            customPageSize={patientHistory?.length || 10}
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

export default PatientSingleView;