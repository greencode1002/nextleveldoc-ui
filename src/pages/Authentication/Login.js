import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "./ParticlesAuth";
import DoctorLogo from '../../assets/images/NextLevelDoctorLogo.png';

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser } from "../../store/actions";


import withRouter from '../../Components/Common/withRouter';

const Login = (props) => {
    const dispatch = useDispatch();



    const [passwordShow, setPasswordShow] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            Email: '',
            Password: 'Admin@123456',
        },
        validationSchema: Yup.object({
            Email: Yup.string().required("Please Enter Your Email").trim(),
            Password: Yup.string().required("Please Enter Your Password").trim(),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, props.router.navigate));
        }
    });



    document.title = "Admin Panel | SignIn";
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
                                <Card className="mt-4 text-start">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue.</p>
                                        </div>
                                        {/* {errorMsg && errorMsg ? (<Alert color="danger"> {errorMsg} </Alert>) : null} */}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="Email" className="form-label">Email</Label>
                                                    <Input
                                                        name="Email"
                                                        className="form-control"
                                                        placeholder="Enter Email"
                                                        type="Email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.Email || ""}
                                                        invalid={
                                                            validation.touched.Email && validation.errors.Email ? true : false
                                                        }
                                                    />
                                                    {validation.touched.Email && validation.errors.Email ? (
                                                        <FormFeedback type="invalid">{validation.errors.Email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="Password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="Password"
                                                            value={validation.values.Password || ""}
                                                            type={passwordShow ? "text" : "Password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                validation.touched.Password && validation.errors.Password ? true : false
                                                            }
                                                        />
                                                        {validation.touched.Password && validation.errors.Password ? (
                                                            <FormFeedback type="invalid">{validation.errors.Password}</FormFeedback>
                                                        ) : null}
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="Password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    {/* <Button color="success" disabled={error ? null : loading ? true : false} className="btn btn-success w-100" type="submit"> */}
                                                    <Button color="success" className="btn btn-success w-100" type="submit">
                                                        {/* {error ? null : loading ? <Spinner size="sm" className='me-2'> Loading... </Spinner> : null} */}
                                                        Sign In
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);