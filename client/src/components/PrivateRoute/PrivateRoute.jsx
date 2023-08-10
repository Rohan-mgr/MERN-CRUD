import { Navigate } from "react-router-dom";
import { _getSecureLs } from "../../utils/storage";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const { loggedUser } = _getSecureLs("auth");
  if (!loggedUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
