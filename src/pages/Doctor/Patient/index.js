import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, DropdownToggle, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledDropdown } from 'reactstrap';
import TableContainer from '../../../Components/Common/TableContainer';
import { getPatientsList, getPatientsSymptomsList } from '../../../store/Patients/actions';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { addPrescriptions } from '../../../store/Doctors/actions';
import { Link } from 'react-router-dom';



const DoctorPatient = () => {
    document.title = "Doctor Panel | Patients List";

    const dispatch = useDispatch()
    const user = JSON.parse(sessionStorage.getItem("authUser")).user;

    const [modal, setModal] = useState(false);
    const [pattientData, setPattientData] = useState({});

    const { symptomsList } = useSelector((state) => state?.Patient || []);


    useEffect(() => {
        // dispatch(getPatientsList());
        dispatch(getPatientsSymptomsList());
    }, [dispatch])



    const handleAddPrescription = (value) => {
        setPattientData(value)
        setModal(true);

    }

    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            medicine: '',
            dosage: "",
            notes: "",
        },
        validationSchema: Yup.object({
            medicine: Yup.string().required("Please Enter Medicine Details"),
            dosage: Yup.string().required("Please Enter Dosage Details"),
            notes: Yup.string().required("Please Enter Notes"),
        }),
        onSubmit: (values) => {
            const newValue = {
                doctor_id: user.id,
                symptom_id: pattientData.symptom_id,
                medicine: values.medicine,
                dosage: values.dosage,
                notes: values.notes
            }

            dispatch(addPrescriptions(newValue));
            validation.resetForm();
            setModal(false);
        }
    })


    const handleValidDate = date => {
        const date1 = moment(new Date(date)).format("DD MMM Y");
        return date1;
    };
    const handleValidTime = (time) => {
        const time1 = moment(new Date(time)).format("hh:mm A");
        return time1;

    };

    const columns = useMemo(() => [
        {
            Header: "Date & Time",
            accessor: "created_at",
            Cell: (cellProps) => (
                <div>
                    {handleValidDate(cellProps.row.original.created_at)},{" "}
                    <small className="text-muted">{handleValidTime(cellProps.row.original.created_at)}</small>
                </div>
            ),
        },
        {
            Header: "Patient Name",
            accessor: "patient_name",
            filterable: true,
        },
        {
            Header: "Patient Age",
            accessor: "age",
            filterable: true,
        },
        {
            Header: "Symptoms",
            accessor: "symptoms",
            filterable: true,
        },

        {
            Header: "Actions",
            Cell: (cellProps) => {
                const is_prescribed = cellProps.row.original.is_prescribed

                return (
                    <ul className="list-inline hstack gap-2 mb-0">
                        <li className="list-inline-item edit" title="Call">
                            <Link to="/doctor/patient-view" state={{ id: cellProps.row.original.patient_id }} className="text-muted d-inline-block">
                                <i className="ri-eye-fill fs-16"></i>
                            </Link>
                        </li>

                        <li className="list-inline-item">
                            {
                                is_prescribed === 0 ?

                                    <UncontrolledDropdown>
                                        <DropdownToggle href="#" className="btn btn-soft-secondary btn-sm dropdown fs-14" tag="button"
                                            onClick={() => { const contactData = cellProps.row.original; handleAddPrescription(contactData); }}

                                        >
                                            <i className="ri-add-fill me-1 align-bottom"></i>
                                            Add Prescription
                                        </DropdownToggle>

                                    </UncontrolledDropdown >
                                    :
                                    <span className="badge badge-soft-success fs-14"> Prescribed </span>

                            }
                        </li>
                    </ul>




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
                                <CardBody>
                                    <div>
                                        <TableContainer
                                            columns={columns}
                                            data={symptomsList}
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
                                <Modal id='showModal' isOpen={modal} centered size='mg'>
                                    <ModalHeader className="bg-soft-info p-3" >
                                        Add Prescription
                                    </ModalHeader>
                                    <Form className="tablelist-form" onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}>

                                        <ModalBody>
                                            <Input type="hidden" id="id-field" />

                                            <Row className="g-3">
                                                <Col lg={12}>
                                                    <p> Patient Name: {pattientData?.patient_name}</p>
                                                    <p> Patient Age: {pattientData?.age}</p>
                                                </Col>
                                                <Col lg={12}>

                                                    <Label htmlFor="medicine-field" className="form-label">Medicine</Label>
                                                    <Input
                                                        name="medicine"
                                                        id="medicine-field"
                                                        className="form-control"
                                                        placeholder="Enter medicine"
                                                        type="textarea"
                                                        validate={{ required: { value: true }, }}
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.medicine || ""}
                                                        invalid={validation.touched.medicine && validation.errors.medicine ? true : false}
                                                    />
                                                    {validation.touched.medicine && validation.errors.medicine ? (
                                                        <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.medicine}</p>
                                                    ) : null}

                                                </Col>


                                                <Col lg={12}>

                                                    <Label htmlFor="dosage-field" className="form-label">Dosage</Label>
                                                    <Input
                                                        name="dosage"
                                                        id="dosage-field"
                                                        className="form-control"
                                                        placeholder="Enter dosage"
                                                        type="textarea"
                                                        validate={{ required: { value: true }, }}
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.dosage || ""}
                                                        invalid={validation.touched.dosage && validation.errors.dosage ? true : false}
                                                    />
                                                    {validation.touched.dosage && validation.errors.dosage ? (
                                                        <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.dosage}</p>
                                                    ) : null}

                                                </Col>
                                                <Col lg={12}>

                                                    <Label htmlFor="notes-field" className="form-label">Notes</Label>
                                                    <Input
                                                        name="notes"
                                                        id="notes-field"
                                                        className="form-control"
                                                        placeholder="Enter notes"
                                                        type="textarea"
                                                        validate={{ required: { value: true }, }}
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.notes || ""}
                                                        invalid={validation.touched.notes && validation.errors.notes ? true : false}
                                                    />
                                                    {validation.touched.notes && validation.errors.notes ? (
                                                        <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.notes}</p>
                                                    ) : null}

                                                </Col>

                                            </Row>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" onClick={() => { validation.resetForm(); setModal(false); }} > Close </button>
                                                <button type="submit" className="btn btn-success" id="add-btn" > Save </button>
                                            </div>
                                        </ModalFooter>
                                    </Form>
                                </Modal>






                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );

};

export default DoctorPatient;