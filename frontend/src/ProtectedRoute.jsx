import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user= JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const user= JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user.role === "citizen" || user.role === "official" 
    ? <Navigate to="/citizen-dashboard" replace />
    : <Navigate to="/official-dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;