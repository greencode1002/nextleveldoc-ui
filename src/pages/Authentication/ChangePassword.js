import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";

import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Button,
    Label,
    Input,
    FormFeedback,
    Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const obj = JSON.parse(sessionStorage.getItem("authAdmin"))?.user
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("Please Enter Your old Password"),
            newPassword: Yup.string().required("Please Enter Your New password"),
            confirmPassword: Yup.string()
                .required("Please Enter Your Confirm Password")
                .test('passwords-match', 'Confirm Passwords do not match', function (value) {
                    return this.parent.newPassword === value;
                })
        }),
        onSubmit: (values) => {
            const changePWD = {
                email: obj.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
            }
            // dispatch(adminchangepassword(changePWD, navigate));
            formik.resetForm();
        }
    });


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

    document.title = "Admin Panel | Change Password";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row className='justify-content-center'>
                        <Col xxl={5}>
                            <Card>
                                <CardBody>
                                    <Form
                                        className="form-horizontal"
                                        action='#'
                                        method='post'
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="form-group">
                                            <Row>
                                                <Col className="mb-3" lg={12}>
                                                    <div>
                                                        <Label htmlFor="oldPassword-admin" className="form-label">Old
                                                            Password*</Label>
                                                        <Input
                                                            type="password"
                                                            name="oldPassword"
                                                            className="form-control"
                                                            id="oldPassword-admin"
                                                            placeholder="Enter current password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.oldPassword || ""}
                                                            invalid={
                                                                touched.oldPassword && errors.oldPassword ? true : false
                                                            }
                                                        />
                                                        {touched.oldPassword && errors.oldPassword ? (
                                                            <FormFeedback type="invalid"><div>{errors.oldPassword}</div></FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col className="mb-3" lg={12}>
                                                    <div>
                                                        <Label htmlFor="newPassword-admin" className="form-label">New
                                                            Password*</Label>
                                                        <Input
                                                            type="password"
                                                            name='newPassword'
                                                            className="form-control"
                                                            id="newPassword-admin"
                                                            placeholder="Enter new password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.newPassword || ""}
                                                            invalid={
                                                                touched.newPassword && errors.newPassword ? true : false
                                                            }
                                                        />
                                                        {touched.newPassword && errors.newPassword ? (
                                                            <FormFeedback type="invalid"><div>{errors.newPassword}</div></FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col className="mb-3" lg={12}>
                                                    <div>
                                                        <Label htmlFor="confirmPassword-admin" className="form-label">Confirm Password*</Label>
                                                        <Input
                                                            type="password"
                                                            name='confirmPassword'
                                                            className="form-control"
                                                            id="confirmPassword-admin"
                                                            placeholder="Enter your Confirm Password"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.confirmPassword || ""}
                                                            invalid={
                                                                touched.confirmPassword && errors.confirmPassword ? true : false
                                                            }
                                                        />
                                                        {touched.confirmPassword && errors.confirmPassword ? (
                                                            <FormFeedback type="invalid"><div>{errors.confirmPassword}</div></FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="mt-4">
                                            <Button type="submit" color="primary">
                                                Change Password
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ChangePassword;
