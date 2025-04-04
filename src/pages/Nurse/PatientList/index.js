import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPatients, deletePatientsData, editPatientsData, getPatientsList, getPatientsSymptomsList } from '../../../store/Patients/actions';
import { Card, CardBody, CardHeader, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import { addNewSymptoms, updateSymptomsData } from '../../../store/actions';
import { Link } from 'react-router-dom';
import AddSymptomsPage from '../../../Components/Common/AddSymptoms';
import SymptomsList from './SymptomsList';
import AddPatient from './AddPatient';
import { toast } from 'react-toastify';

const PatientList = () => {
    document.title = "Nurse Panel | Patients List";

    const dispatch = useDispatch()

    const [isSymptomsModal, setSymptomsModal] = useState(false);
    const [isPatientsModal, setPatientsModal] = useState(false);
    const [isSymptomsEdit, setSymptomsEdit] = useState(false);
    const [pattientData, setPattientData] = useState({});

    const user = JSON.parse(sessionStorage.getItem("authUser")).user;
    const { patients, } = useSelector((state) => state?.Patient);


    useEffect(() => {
        dispatch(getPatientsList());

        dispatch(getPatientsSymptomsList());

    }, [])


    const handleAddSymptoms = (value) => {
        setPattientData(value)
        setSymptomsModal(true);

    }

    const handleSubmitPatients = (value) => {

        dispatch(addNewPatients(value))
        setPatientsModal(false)
    }
    const handleEditSubmitPatient = (value) => {

        dispatch(editPatientsData(value))
        setPatientsModal(false)
    }

    const handleEditPatient = value => {
        setPattientData(value)
        setPatientsModal(true)
    }

    const handleDeletePatient = value => {
        dispatch(deletePatientsData(value))

    }

    const handleSubmitSymptoms = (value) => {
        dispatch(addNewSymptoms(value));
        setSymptomsModal(false);
    }

    const onEditSymptomsClick = (value) => {
        setPattientData(value)
        setSymptomsModal(true);
        setSymptomsEdit(true)
    }

    const handleEditSubmitSymptoms = (value) => {

        dispatch(updateSymptomsData(value));
        setSymptomsModal(false);
        setSymptomsEdit(false)

    }


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
        {
            Header: "Actions",
            Cell: (cellProps) => {

                return (
                    <>

                        <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item edit" title="Call">
                                <Link to="/nurse/patient-view" state={{ id: cellProps.row.original.id }} className="text-muted d-inline-block">
                                    <i className="ri-eye-fill fs-16"></i>
                                </Link>
                            </li>

                            <li className="list-inline-item">
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        href="#"
                                        className="btn btn-soft-secondary btn-sm dropdown"
                                        tag="button"
                                    >
                                        <i className="ri-more-fill align-middle"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem href="#" className="dropdown-item add-item-bt"
                                            onClick={() => { const contactData = cellProps.row.original; handleAddSymptoms(contactData); }}
                                        >
                                            <i className="ri-add-fill me-1 align-bottom"></i>
                                            Add Symptoms
                                        </DropdownItem>


                                        <DropdownItem href="#" className="dropdown-item add-item-bt"
                                            onClick={() => { const contactData = cellProps.row.original; handleEditPatient(contactData); }}

                                        >
                                            <i className="ri-pencil-fill me-1 align-bottom"></i> {" "}
                                            Edit
                                        </DropdownItem>
                                        <DropdownItem
                                            className="dropdown-item remove-item-btn"
                                            href=""
                                            onClick={() => {
                                                handleDeletePatient(cellProps.row.original)
                                            }}
                                        >
                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>
                        </ul>

                    </>

                );
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
                                        <div className="d-flex flex-grow-1 gap-1">
                                            Patients List
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="hstack text-nowrap gap-2">

                                                <button className="btn btn-primary" onClick={() => { setPatientsModal(true) }}>
                                                    <i className="ri-add-fill me-1 align-bottom"></i>
                                                    Add Patient
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
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

                                <AddPatient
                                    show={isPatientsModal}
                                    onSubmitClick={handleSubmitPatients}
                                    onCloseClick={() => setPatientsModal(false)}
                                    pattientData={pattientData}
                                    onEditSubmitClick={handleEditSubmitPatient}
                                // user={user}
                                />

                                <AddSymptomsPage
                                    show={isSymptomsModal}
                                    onSubmitClick={handleSubmitSymptoms}
                                    onCloseClick={() => {
                                        setSymptomsModal(false)
                                        setSymptomsEdit(false)
                                    }}
                                    pattientData={pattientData}
                                    user={user}
                                    isSymptomsEdit={isSymptomsEdit}
                                    onEditSubmitClick={handleEditSubmitSymptoms}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <SymptomsList
                            onEditClick={onEditSymptomsClick}

                        />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );

};


export default PatientList;