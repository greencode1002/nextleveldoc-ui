import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downloadPrescriptions, getMyPrescriptions } from '../../../store/Patients/actions';
import { Card, CardBody, Col, Container, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import axios from 'axios';
import { toast } from 'react-toastify';
import PayPalButton from '../../../Components/Common/PayPalButton';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(sessionStorage.getItem("authUser")).user;

    const { myPrescription } = useSelector((state) => state.Patient);


    useEffect(() => {

        if (user?.id) {
            dispatch(getMyPrescriptions(user.id))
        }
    }, [dispatch,])



    const handleDownloadPrescriptions = async (value) => {
        dispatch(downloadPrescriptions(value.symptom_id))


    }



    const columns = useMemo(() => [
        {
            Header: "Patient Id",
            accessor: "id",
            filterable: true,
        },
        {
            Header: "Medicine",
            accessor: "medicine",
            filterable: true,
        },
        {
            Header: "Dosage",
            accessor: "dosage",
            filterable: true,
        },
        {
            Header: "Notes",
            accessor: "notes",
            filterable: true,
        },
        {
            Header: "Actions",
            Cell: (cellProps) => {

                return (
                    <UncontrolledDropdown>
                        {cellProps.row.original.is_payment_completed ?
                            <DropdownToggle className="btn btn-soft-success btn-sm dropdown" tag="button"
                                onClick={() => {
                                    handleDownloadPrescriptions(cellProps.row.original)
                                }}

                            >
                                Download
                            </DropdownToggle>

                            : <DropdownToggle href="#" className="btn btn-soft-secondary btn-sm dropdown" tag="button"

                                onClick={() => {
                                    navigate('/patient/pay', {
                                        state: cellProps.row.original
                                    });
                                }}
                            >
                                Pay Now
                            </DropdownToggle>

                        }
                    </UncontrolledDropdown>
                )
            }
        }


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
                                            data={myPrescription}
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

export default PatientDashboard;