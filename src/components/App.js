import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import Navbar from "./Navbar"
import Hero from "./Hero"
import Features from "./Features"
import Calltoaction from "./Calltoaction";
import Counter from "./Counter";
import Footer from "./Footer";
import About from "./About";
import Status from "./Status";
import Hostels from "./Hostels";

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
        <About />
      ),
    },
    {
      path: "status",
      element: (
        <Status />
      ),
    },
    {
      path: "Hostels",
      element: (
        <Hostels />
      ),
    }
  ]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;