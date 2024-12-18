import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar"
import Hero from "./Hero"
import Features from "./Features"
import Calltoaction from "./Calltoaction";
import Counter from "./Counter";
import Footer from "./Footer";
import About from "./About";
import Status from "./Status";
import Login from "./Login";
import Signup from "./Signup";
import AuthLayout from "./AuthLayout";
import Complaint from "./Complaint";
import { useContext } from "react";
import { AuthProviderContext  } from "./Context";
import {supabase} from "../index.js"
import Profile from "./Profile";
import Hostels from "./Hostels";
import HostelRoomList from "./Roomdetails";
import Booknow from "./Booknow";
import Checkout from "./Checkout";
import Success from "./Success";
import Admin from "./Admin";
import Adminapplications from "./Adminapplications";
import Admincomplaints from "./Admincomplaints";
import PrivateRoute from "./Privateroute.js";

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Navbar />
        <Hero />
        <Features />
        <Counter />
        <Calltoaction />
        <Footer />
        </>
      ),
    },
    {
      path: "about",
      element: (
        <>
        <Navbar/>
        <About />
        </>
      ),
    },
    {
      path: "status",
      element: (
        <>
        <Navbar/>
        <Status />
        </>
      ),
    },
    {
      path: "status/:hosteltype",
      element: (
        <>
        <Navbar/>
        <HostelRoomList/>
        </>
      ),
    },
    {
      path: "auth",
      element: <AuthLayout />, // This layout will render the nested routes
      children: [
        {
          path: "login/:userType", // Login page route
          element: <Login />,
        },
        {
          path: "create_account/:userType", // Create Account page route
          element: <Signup />,
        },
      ],
    },
    {
      path: "complaint",
      element: (
        <>
        <Navbar/>
        <Complaint/>
        </>
      ),
    },
    {
      path: "profile",
      element: (
        <>
        <Navbar/>
        <Profile/>
        </>
      )
    },
    {
      path: "Hostels",
      element: (
        <>
        <Navbar/>
        <Hostels />
        </>
      ),
    },
    {
      path: "status/:hosteltype/booknow/:room_id",
      element: (
        <>
        <Navbar/>
        <Booknow />
        </>
      ),
    },
    {
      path: "payment/:hosteltype/:room_id",
      element: (
        <Checkout />
      ),
    }
    ,
    {
      path: "success",
      element: (
        <>
        <Navbar/>
        <Success />
        </>
      ),
    },
    {
      path: '/admin',
      element: <PrivateRoute role="admin" />, // Protected route
      children: [
        {
          path: '',
          element: <Admin />, // This renders when user visits /admin
        },
        {
          path: 'complaints',
          element: <Admincomplaints/>, // This renders for /admin/complaints
        },
        {
          path : 'applications',
          element : <Adminapplications/>
        }
      ],
    }
  ]);

function App() {
  const { user , setuser } = useContext(AuthProviderContext);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if ( user ) {
        setuser(user); 
      }
    };
    fetchSession();
  }, []);

  return (
  <RouterProvider router={router} />
  );
}

export default App;