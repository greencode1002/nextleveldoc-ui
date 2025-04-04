import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Button } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images 
import DoctorLogo from '../../assets/images/NextLevelDoctorLogo.png';
import ParticlesAuth from "./ParticlesAuth";
import { registerUser } from "../../store/Authentication/actions";

const userRole = [
    { title: 'doctor', name: 'Doctor' },
    { title: 'nurse', name: 'Nurse' },
    { title: 'patient', name: 'Patient' },
]

const Register = (props) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: 'Admin@123456',
            confirm_password: 'Admin@123456',
            role: ''
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

            dispatch(registerUser(newData, navigate));
        }
    });




    document.title = "Sign Up";

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={DoctorLogo} alt="" height="70" />
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">

                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Create New Account</h5>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                className="needs-validation" action="#">



                                                <div className="mb-3">
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
                                                        <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                    ) : null}

                                                </div>
                                                <div className="mb-3">
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

                                                </div>
                                                <div className="mb-3">
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

                                                </div>

                                                <div className="mb-3">
                                                    <Label htmlFor="userpassword" className="form-label">
                                                        Password <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        name="password"
                                                        type="password"
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
                                                </div>

                                                <div className="mb-2">
                                                    <Label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></Label>
                                                    <Input
                                                        name="confirm_password"
                                                        type="password"
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

                                                </div>

                                                <div className="mb-2">
                                                    <Label htmlFor="role-status" className="form-label" >Role</Label>
                                                    <Input
                                                        name="role"
                                                        type="select"
                                                        className="form-select"
                                                        id='role'
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.role || ""}
                                                        invalid={validation.touched.role && validation.errors.role ? true : false}
                                                    >
                                                        <React.Fragment>
                                                            <option value="">Select a role</option>
                                                            {userRole?.map((item, index) => {
                                                                return (
                                                                    <option value={item.title} key={index}>{item.name}</option>
                                                                )
                                                            })}
                                                        </React.Fragment>
                                                    </Input>

                                                    {validation.touched.role && validation.errors.role ? (
                                                        <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.role}</p>
                                                    ) : null}

                                                </div>


                                                <div className="mt-4">
                                                    <button className="btn btn-success w-100" type="submit">Sign Up</button>
                                                </div>


                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Already have an account ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Signin </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default Register;
