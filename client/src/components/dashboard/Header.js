import PropTypes from "prop-types";
import Button from "./Button";
const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header" style={{ marginTop: "15px" }}>
      <h2>Welcome {title}</h2>
      <Button
        color={!showAdd ? "green" : "red"}
        text={!showAdd ? "Add" : "Close"}
        onClick={onAdd}
      ></Button>
    </header>
  );
};
Header.defaultProps = {
  title: "Task Tracker",
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Header;
