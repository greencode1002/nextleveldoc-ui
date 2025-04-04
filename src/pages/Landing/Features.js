import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

import Avatar10 from "../../assets/images/users/avatar-1.jpg";
import About from "../../assets/images/doctor2.jpg";
import { NavLink } from "react-router-dom";

const Features = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="align-items-center justify-content-lg-between justify-content-center gy-4">
            <Col lg={5} sm={7}>
              <div className="about-img-section mb-5 mb-lg-0 text-center">
                <Card className="rounded shadow-lg inquiry-box d-none d-lg-block">
                  <CardBody className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0 me-3">
                      <div className="avatar-title bg-soft-info text-info rounded-circle fs-18">
                        <i className="ri-briefcase-2-line"></i>
                      </div>
                    </div>
                    <h5 className="fs-15 lh-base mb-0">
                      Prescribed Over{" "}
                      <span className="text-secondary fw-bold">1,00,0+</span>{" "}
                      Patients
                    </h5>
                  </CardBody>
                </Card>

                <Card className="feedback-box">
                  <CardBody className="d-flex shadow-lg">
                    <div className="flex-shrink-0 me-3">
                      <img
                        src={Avatar10}
                        alt=""
                        className="avatar-sm rounded-circle"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fs-14 lh-base mb-0">Bob Brown</h5>
                      <p className="text-muted fs-11 mb-1">Patient</p>

                      <div className="text-warning">
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-line"></i>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <img
                  src={About}
                  alt=""
                  className="img-fluid mx-auto rounded-3"
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-muted">
                <h1 className="mb-3 fw-bold lh-base">
                  Get the <span className="text-danger">Best Doctor's Prescription</span> in
                  One Place
                </h1>
                <p className="ff-secondary fs-16 mb-2">
                  Register as a Patient with Symptoms: Signing up on Next Level Doctor is easy. Simply create an account and provide a brief description of your symptoms. This allows us to match you with the best specialist who can address your concerns effectively.
                </p>
                <p className="ff-secondary fs-16">
                  Consult with a Top-Level Specialist Doctor: Once your symptoms are submitted, our platform connects you to highly skilled doctors specializing in various fields. You can consult with them online, ensuring a thorough diagnosis. Our doctors are dedicated to providing you with the best possible care.
                </p>
                <p className="ff-secondary fs-16">
                  Receive Your Prescription Hassle-Free: After the consultation, your doctor will prescribe the necessary medicine or treatments based on your condition. All of this is done in a seamless online process, so you can start your treatment right away without any delays.
                </p>

                <div className="vstack gap-2 mb-4 pb-1">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Online Consultation</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Get your prescription</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-2">
                      <div className="avatar-xs icon-effect">
                        <div className="avatar-title bg-transparent text-success rounded-circle h2">
                          <i className="ri-check-fill"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Easy payments</p>
                    </div>
                  </div>
                </div>

                <div>
                  <NavLink to="/admin" className="btn btn-secondary">
                    Get your prescription buddy{" "}
                    <i className="ri-arrow-right-line align-bottom ms-1"></i>
                  </NavLink>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Features;
