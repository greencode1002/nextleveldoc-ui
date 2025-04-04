import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";

const Logout = (props) => {
  const dispatch = useDispatch();
  const obj = JSON.parse(sessionStorage.getItem("authAdmin"));

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    if (obj) {
      dispatch(logoutUser(obj?.data?._id));
    }
  }, [dispatch, obj]);

  return <Navigate to="/admin/login" />;

  // return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);