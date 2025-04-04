import React from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Card, CardBody, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';



const AddPatient = ({ show, onCloseClick, onSubmitClick, onEditSubmitClick, pattientData }) => {



    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: pattientData && pattientData.email || '',
            first_name: pattientData && pattientData.firstname || '',
            last_name: pattientData && pattientData.lastname || '',
            password: 'Admin@123456',
            confirm_password: 'Admin@123456',
            role: 'patient'
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Please enter a valid email address')
                .required('Please enter your email'),
            first_name: Yup.string().required('Please enter your first name'),
            last_name: Yup.string().required('Please enter your last name'),
            password: Yup.string()
                .min(6, 'Password must be at least 8 characters')
                .required('Password is required'),
            confirm_password: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
            role: Yup.string().required("Please select role"),

        }),
        onSubmit: (values) => {

            const newData = {
                firstname: values.first_name,
                lastname: values.last_name,
                email: values.email,
                password: values.password,
                role: values.role,
            }

            if (show) {
                newData.id = pattientData.id
                onEditSubmitClick(newData)
            } else {
                onSubmitClick(newData)
            }
        }
    });


    return (
        <Modal id='showModal' isOpen={show} centered size='lg'>
            <ModalHeader className="bg-soft-info p-3">
                {"Add New Patient"}
            </ModalHeader>
            <Form className="tablelist-form" onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}>


                <Form className="tablelist-form" onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}>
                    <ModalBody>
                        <Input type="hidden" id="id-field" />

                        <Row className="g-3">
                            <Col lg={12}>
                                <Label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></Label>
                                <Input
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    type="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={
                                        validation.touched.email && validation.errors.email ? true : false
                                    }
                                />
                                {validation.touched.email && validation.errors.email ? (
                                    <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.email}</p>
                                ) : null}
                                {/* {validation.touched.email && validation.errors.email ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                ) : null} */}

                            </Col>
                            <Col lg={12}>
                                <Label htmlFor="first_name" className="form-label">First Name <span className="text-danger">*</span></Label>
                                <Input
                                    name="first_name"
                                    type="text"
                                    placeholder="Enter first name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.first_name || ""}
                                    invalid={
                                        validation.touched.first_name && validation.errors.first_name ? true : false
                                    }
                                />
                                {validation.touched.first_name && validation.errors.first_name ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.first_name}</div></FormFeedback>
                                ) : null}

                            </Col>
                            <Col lg={12}>
                                <Label htmlFor="last_name" className="form-label">Last Name <span className="text-danger">*</span></Label>
                                <Input
                                    name="last_name"
                                    type="text"
                                    placeholder="Enter last name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.last_name || ""}
                                    invalid={
                                        validation.touched.last_name && validation.errors.last_name ? true : false
                                    }
                                />
                                {validation.touched.last_name && validation.errors.last_name ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.last_name}</div></FormFeedback>
                                ) : null}

                            </Col>

                            <Col lg={12}>
                                <Label htmlFor="userpassword" className="form-label">
                                    Password <span className="text-danger">*</span>
                                </Label>
                                <Input
                                    name="password"
                                    type="text"
                                    placeholder="Enter Password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password}
                                    invalid={validation.touched.password && !!validation.errors.password}
                                />
                                {validation.touched.password && validation.errors.password && (
                                    <FormFeedback type="invalid">
                                        <div>{validation.errors.password}</div>
                                    </FormFeedback>
                                )}
                            </Col>

                            <Col lg={12}>
                                <Label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></Label>
                                <Input
                                    name="confirm_password"
                                    type="text"
                                    placeholder="Confirm Password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.confirm_password || ""}
                                    invalid={
                                        validation.touched.confirm_password && validation.errors.confirm_password ? true : false
                                    }
                                />
                                {validation.touched.confirm_password && validation.errors.confirm_password ? (
                                    <FormFeedback type="invalid"><div>{validation.errors.confirm_password}</div></FormFeedback>
                                ) : null}

                            </Col>
                        </Row>
                    </ModalBody>

                </Form>

                <ModalFooter>
                    <div className="hstack gap-2 justify-content-end">
                        <button type="button" className="btn btn-light" onClick={() => { validation.resetForm(); onCloseClick(); }}>Close</button>
                        <button type="submit" className="btn btn-success" id="add-btn">Save</button>
                    </div>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default AddPatient;