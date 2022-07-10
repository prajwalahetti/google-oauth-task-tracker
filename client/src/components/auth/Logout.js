import React from "react";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Logout = ({ logout }) => {
  const googleAuth = () => {
    logout();
  };
  return (
    <div>
      <button onClick={googleAuth}>Log Out</button>
    </div>
  );
};
logout.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(Logout);
