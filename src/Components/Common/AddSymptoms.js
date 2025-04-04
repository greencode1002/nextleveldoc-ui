import React from 'react';
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";

const AddSymptomsPage = ({ show, isSymptomsEdit, onSubmitClick, onEditSubmitClick, onCloseClick, pattientData, user }) => {

    // Enhanced validation schema with radio button validations
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            age: (isSymptomsEdit && pattientData && pattientData?.age) || '',
            symptoms: (isSymptomsEdit && pattientData && pattientData?.symptoms) || '',
            is_diagnosed_with_diabetes: isSymptomsEdit && pattientData ? pattientData?.is_diagnosed_with_diabetes === 1 : null,
            family_history_of_diabetes: isSymptomsEdit && pattientData ? pattientData?.family_history_diabetes === 1 : null,
            has_drug_allergy: isSymptomsEdit && pattientData ? pattientData?.has_drug_allergy === 1 : null,
            has_food_allergy: isSymptomsEdit && pattientData ? pattientData?.has_food_allergy === 1 : null,
            is_smoker: isSymptomsEdit && pattientData ? pattientData?.is_smoker === 1 : null,
        },
        validationSchema: Yup.object({
            age: Yup.number().required("Please Enter Patient Age"),
            symptoms: Yup.string().required("Please Enter Symptoms Details"),
            is_diagnosed_with_diabetes: Yup.boolean().nullable().required("Please select Yes or No"),
            family_history_of_diabetes: Yup.boolean().nullable().required("Please select Yes or No"),
            has_drug_allergy: Yup.boolean().nullable().required("Please select Yes or No"),
            has_food_allergy: Yup.boolean().nullable().required("Please select Yes or No"),
            is_smoker: Yup.boolean().nullable().required("Please select Yes or No"),
        }),
        onSubmit: (values) => {

            if (isSymptomsEdit) {
                let editValue = {
                    patient_id: pattientData?.patient_id ? pattientData.patient_id : pattientData?.id,
                    age: values.age,
                    symptoms: values.symptoms,
                    is_diagnosed_with_diabetes: values.is_diagnosed_with_diabetes ? 1 : 0,
                    family_history_diabetes: values.family_history_of_diabetes ? 1 : 0,
                    has_drug_allergy: values.has_drug_allergy ? 1 : 0,
                    has_food_allergy: values.has_food_allergy ? 1 : 0,
                    is_smoker: values.is_smoker ? 1 : 0,
                    nurse_id: user.id,
                    is_prescribed: 0,
                    symptom_id: pattientData.symptom_id
                }
                onEditSubmitClick(editValue);
            } else {
                let newValue = {
                    patient_id: pattientData?.patient_id ? pattientData.patient_id : pattientData?.id,
                    age: values.age,
                    symptoms: values.symptoms,
                    is_diagnosed_with_diabetes: values.is_diagnosed_with_diabetes ? 1 : 0,
                    family_history_diabetes: values.family_history_of_diabetes ? 1 : 0,
                    has_drug_allergy: values.has_drug_allergy ? 1 : 0,
                    has_food_allergy: values.has_food_allergy ? 1 : 0,
                    is_smoker: values.is_smoker ? 1 : 0,
                    nurse_id: user.id,
                    is_prescribed: 0,
                }
                onSubmitClick(newValue);
            }

            validation.resetForm();
        }
    });

    // Handle radio button changes
    const handleRadioChange = (field, value) => {
        validation.setFieldValue(field, value === 'yes' ? true : value === 'no' ? false : null);
        validation.setFieldTouched(field, true, false);
    };

    // Check if any radio button field has an error
    const hasRadioErrors = () => {
        return validation.touched.is_diagnosed_with_diabetes && validation.errors.is_diagnosed_with_diabetes ||
            validation.touched.family_history_of_diabetes && validation.errors.family_history_of_diabetes ||
            validation.touched.has_drug_allergy && validation.errors.has_drug_allergy ||
            validation.touched.has_food_allergy && validation.errors.has_food_allergy ||
            validation.touched.is_smoker && validation.errors.is_smoker;
    };

    return (
        <Modal id='showModal' isOpen={show} centered size='lg'>
            <ModalHeader className="bg-soft-info p-3">
                {isSymptomsEdit ? "Edit Symptoms" : "Add Symptoms"}
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
                            <div className="text-muted">
                                Patient ID :{" "}
                                <span className="text-body fw-medium">{pattientData?.patient_id ? pattientData.patient_id : pattientData?.id}</span>
                            </div>
                            <div className="text-muted">
                                Patient Name :{" "}
                                <span className="text-body fw-medium">{pattientData?.patient_name ? pattientData.patient_name : pattientData?.firstname + ' ' + pattientData?.lastname}</span>
                            </div>

                        </Col>
                        <Col lg={12}>
                            <Label htmlFor="age-field" className="form-label">Patient Age</Label>
                            <Input
                                name="age"
                                id="age-field"
                                className="form-control"
                                placeholder="Enter patient age"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.age || ""}
                                invalid={validation.touched.age && validation.errors.age ? true : false}
                            />
                            {validation.touched.age && validation.errors.age ? (
                                <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.age}</p>
                            ) : null}
                        </Col>

                        <Col lg={12}>
                            <Label htmlFor="symptoms-field" className="form-label">Symptoms</Label>
                            <Input
                                name="symptoms"
                                id="symptoms-field"
                                className="form-control"
                                placeholder="Enter symptoms"
                                type="textarea"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.symptoms || ""}
                                invalid={validation.touched.symptoms && validation.errors.symptoms ? true : false}
                            />
                            {validation.touched.symptoms && validation.errors.symptoms ? (
                                <p className="text-danger fw-medium fs-13 mt-1">{validation.errors.symptoms}</p>
                            ) : null}
                        </Col>

                        {/* Single error message for all radio fields */}
                        {hasRadioErrors() && (

                            <span className="text-danger fw-medium fs-13">Please select Yes or No for all questions</span>

                        )}

                        <Col lg={4}>
                            <Label htmlFor="is_diagnosed_with_diabetes" className="form-label">Diagnosed with Diabetes</Label>
                            <Col lg={12}>
                                <div className="mt-2 d-flex">
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="is_diagnosed_with_diabetes"
                                            id="diabetesYes"
                                            value="yes"
                                            checked={validation.values.is_diagnosed_with_diabetes === true}
                                            onChange={() => handleRadioChange('is_diagnosed_with_diabetes', 'yes')}
                                            invalid={validation.touched.is_diagnosed_with_diabetes && validation.errors.is_diagnosed_with_diabetes ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="diabetesYes">Yes</Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="is_diagnosed_with_diabetes"
                                            id="diabetesNo"
                                            value="no"
                                            checked={validation.values.is_diagnosed_with_diabetes === false}
                                            onChange={() => handleRadioChange('is_diagnosed_with_diabetes', 'no')}
                                            invalid={validation.touched.is_diagnosed_with_diabetes && validation.errors.is_diagnosed_with_diabetes ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="diabetesNo">No</Label>
                                    </div>
                                </div>
                            </Col>
                        </Col>

                        <Col lg={4}>
                            <Label htmlFor="family_history_of_diabetes" className="form-label">Family History of Diabetes</Label>
                            <Col lg={12}>
                                <div className="mt-2 d-flex">
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="family_history_of_diabetes"
                                            id="familyHistoryYes"
                                            value="yes"
                                            checked={validation.values.family_history_of_diabetes === true}
                                            onChange={() => handleRadioChange('family_history_of_diabetes', 'yes')}
                                            invalid={validation.touched.family_history_of_diabetes && validation.errors.family_history_of_diabetes ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="familyHistoryYes">Yes</Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="family_history_of_diabetes"
                                            id="familyHistoryNo"
                                            value="no"
                                            checked={validation.values.family_history_of_diabetes === false}
                                            onChange={() => handleRadioChange('family_history_of_diabetes', 'no')}
                                            invalid={validation.touched.family_history_of_diabetes && validation.errors.family_history_of_diabetes ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="familyHistoryNo">No</Label>
                                    </div>
                                </div>
                            </Col>
                        </Col>

                        <Col lg={4}>
                            <Label htmlFor="has_drug_allergy" className="form-label">Has Drug Allergy</Label>
                            <Col lg={12}>
                                <div className="mt-2 d-flex">
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="has_drug_allergy"
                                            id="drugAllergyYes"
                                            value="yes"
                                            checked={validation.values.has_drug_allergy === true}
                                            onChange={() => handleRadioChange('has_drug_allergy', 'yes')}
                                            invalid={validation.touched.has_drug_allergy && validation.errors.has_drug_allergy ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="drugAllergyYes">Yes</Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="has_drug_allergy"
                                            id="drugAllergyNo"
                                            value="no"
                                            checked={validation.values.has_drug_allergy === false}
                                            onChange={() => handleRadioChange('has_drug_allergy', 'no')}
                                            invalid={validation.touched.has_drug_allergy && validation.errors.has_drug_allergy ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="drugAllergyNo">No</Label>
                                    </div>
                                </div>
                            </Col>
                        </Col>

                        <Col lg={4}>
                            <Label htmlFor="has_food_allergy" className="form-label">Has Food Allergy</Label>
                            <Col lg={12}>
                                <div className="mt-2 d-flex">
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="has_food_allergy"
                                            id="foodAllergyYes"
                                            value="yes"
                                            checked={validation.values.has_food_allergy === true}
                                            onChange={() => handleRadioChange('has_food_allergy', 'yes')}
                                            invalid={validation.touched.has_food_allergy && validation.errors.has_food_allergy ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="foodAllergyYes">Yes</Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="has_food_allergy"
                                            id="foodAllergyNo"
                                            value="no"
                                            checked={validation.values.has_food_allergy === false}
                                            onChange={() => handleRadioChange('has_food_allergy', 'no')}
                                            invalid={validation.touched.has_food_allergy && validation.errors.has_food_allergy ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="foodAllergyNo">No</Label>
                                    </div>
                                </div>
                            </Col>
                        </Col>
                        <Col lg={4}>
                            <Label htmlFor="is_smoker" className="form-label">Is Smoker</Label>
                            <Col lg={12}>
                                <div className="mt-2 d-flex">
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="is_smoker"
                                            id="foodAllergyYes"
                                            value="yes"
                                            checked={validation.values.is_smoker === true}
                                            onChange={() => handleRadioChange('is_smoker', 'yes')}
                                            invalid={validation.touched.is_smoker && validation.errors.is_smoker ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="foodAllergyYes">Yes</Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Input
                                            className="form-check-input"
                                            type="radio"
                                            name="is_smoker"
                                            id="foodAllergyNo"
                                            value="no"
                                            checked={validation.values.is_smoker === false}
                                            onChange={() => handleRadioChange('is_smoker', 'no')}
                                            invalid={validation.touched.is_smoker && validation.errors.is_smoker ? true : false}
                                        />
                                        <Label className="form-check-label" htmlFor="foodAllergyNo">No</Label>
                                    </div>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </ModalBody>
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

export default AddSymptomsPage;