import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout"; 
import Herosection from "./components/herosection";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/aboutus";
import HowItWorks from "./components/howitswork";
import CitizenDashboard from "./components/citizenDashbord";
import OfficialDashbord from "./components/officialDashboard";

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