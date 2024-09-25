import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { useUser } from "../context/useUser"; // Adjust the path based on your project structure

const ProtectedRoute = ({ children }) => {
  const { userName } = useUser();

  // Check if user is not logged in
  if (!userName) {
    return <Navigate to="/login" replace />;
  }

  // Render children if user is logged in
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as required node
};


export default ProtectedRoute;
