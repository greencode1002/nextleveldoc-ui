import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

import Avatar3 from "../../assets/images/users/avatar-3.jpg";
import Avatar9 from "../../assets/images/users/avatar-9.jpg";
import Avatar10 from "../../assets/images/users/avatar-10.jpg";
import JobProfile2 from "../../assets/images/job-profile2.png";
import DoctorBanner from "../../assets/images/doctor-banner.png";

const Home = () => {
  return (
    <React.Fragment>
      <section className="section job-hero-section bg-light pb-0" id="hero">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg={6}>
              <div>
                <h1 className="display-6 text-primary fw-bold text-capitalize mb-3 lh-base">
                  Meet Our Next-Level Doctor
                </h1>
                <p className="lead text-danger lh-base mb-4">
                  Get the Right Prescription for a Healthier You!
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <div className="position-relative home-img text-center mt-5 mt-lg-0">
                <div className="bg-white p-3 rounded shadow-lg inquiry-box">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0 me-3">
                      <div className="avatar-title bg-soft-danger text-danger rounded fs-18">
                        <i className="ri-mail-send-line"></i>
                      </div>
                    </div>
                    <h5 className="fs-15 lh-base mb-0">
                      Your Health, Our Priority!
                    </h5>
                  </div>
                </div>

                <img src={DoctorBanner} alt="" className="user-img" />

                <div className="circle-effect">
                  <div className="circle"></div>
                  <div className="circle2"></div>
                  <div className="circle3"></div>
                  <div className="circle4"></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Home;
