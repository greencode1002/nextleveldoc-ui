import React, { useEffect } from "react";
import Features from "./Features";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import Process from "./Process";

const LandingPage = () => {
  document.title = "Next Level Doctor | Get your prescription online";

  window.onscroll = function () {
    scrollFunction();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <React.Fragment>
      <div className="layout-wrapper landing">
        <Navbar />
        <Home />
        <Process />
        <Features />
        {/* <Categories /> */}
        <Footer />
        <button
          onClick={() => toTop()}
          className="btn btn-danger btn-icon landing-back-top"
          id="back-to-top"
        >
          <i className="ri-arrow-up-line"></i>
        </button>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
