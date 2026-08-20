import { Navigate } from "react-router-dom";

function EmployerRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== "employer") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default EmployerRoute;