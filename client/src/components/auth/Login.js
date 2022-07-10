import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
const Login = ({ setAlert, login }) => {
  const googleAuth = () => {
    login();
  };

  return (
    <div className="landing" >
      <button onClick={googleAuth} className="button">
        {" "}
        <div className="logo"></div>
        <div className="sign-in-text">Sign in with Google</div>
      </button>
    </div>
  );
};
login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
