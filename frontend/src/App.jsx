import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout"; 
import Herosection from "./components/Herosection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/Aboutus";
import HowItWorks from "./components/Howitswork";
import CitizenDashboard from "./components/CitizenDashboard";
import OfficialDashbord from "./components/OfficialDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/", 
        element: <Herosection />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
        element: <CitizenDashboard />
      },
      {
        path: "/official-dashboard",
        element: <OfficialDashbord />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;