import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout"; 
import Herosection from "./components/Herosection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/Aboutus";
import HowItWorks from "./components/Howitswork";
import CitizenDashboard from "./components/CitizenDashboard";
import OfficialDashbord from "./components/OfficialDashboard";
import ForgotPassword from "./components/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/", 
        element:  <Herosection /> ,
      },
      {
        path: "/login",
        element: <PublicRoute> <Login /> </PublicRoute>,
      },
      {
        path: "/signup",
        element: <PublicRoute> <Signup /> </PublicRoute>,
      },
      {
        path: "/aboutus",
        element: <AboutUs />
      },
      {
        path: "/howitworks",
        element: <HowItWorks />
      },
      {
        path: "/citizen-dashboard",
        element: <ProtectedRoute> <CitizenDashboard /> </ProtectedRoute>
      },
      {
        path: "/official-dashboard",
        element: <ProtectedRoute> <OfficialDashbord /> </ProtectedRoute>
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;