import PropTypes from "prop-types";

function Button({ type, children, handleClick, variant }) {
  return (
    <button
      type={type}
      className={`primary ${variant === "success" ? "success" : null}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  variant: PropTypes.string,
};

export default Button;
