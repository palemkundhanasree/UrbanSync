import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user= JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  const user= JSON.parse(localStorage.getItem("user"));
  if (user) {
    if(user.role === "official"){
      return <Navigate to="/official-dashboard" replace />;
    } else{
      return <Navigate to="/citizen-dashboard" replace />;
    }
  }
  return children;
};
