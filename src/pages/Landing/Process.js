import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";


const jobProcess = [
  {
    id: 1,
    clss: "shadow-lg",
    lable: "Register as a Patient with Symptoms",
    desc: "Signing up on Next Level Doctor is easy. Simply create an account and provide a brief description of your symptoms ",
  },
  {
    id: 2,
    lable: "Consult with a Top-Level Specialist Doctor",
    desc: "Once your symptoms are submitted, our platform connects you to highly skilled doctors specializing in various fields. You can consult with them online, ensuring a thorough diagnosis",
  },
  {
    id: 3,
    lable: "Receive Your Prescription Hassle-Free",
    desc: "After the consultation, your doctor will prescribe the necessary medicine or treatments based on your condition. All of this is done in a seamless online process, so you can start your treatment right away without any delays.",
  }
];


const Process = () => {
  return (
    <React.Fragment>
      <section className="section" id="process">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-bold lh-base">
                  How <span className="text-danger">it works</span> 3 Easy Steps to Consult with a Top Doctor Online
                </h1>
                <p className="text-muted fw-bold">
                  At Next Level Doctor, we believe that healthcare should be accessible, efficient, and convenient for everyone. Our mission is to provide top-quality medical consultations with a focus on patient care and convenience.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {jobProcess.map((item, key) => (
              <Col lg={4} md={6} key={key}>
                <Card className={key === 0 ? "shadow-lg" : "shadow-none"}>
                  <CardBody className="p-4">
                    <h1 className="fw-bold display-5 ff-secondary mb-4 text-success position-relative">
                      <div className="job-icon-effect"></div>
                      <span>{item.id}</span>
                    </h1>
                    <h6 className="fs-17 mb-2">{item.lable}</h6>
                    <p className="text-muted mb-0 fs-15">{item.desc}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Process;
