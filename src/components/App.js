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

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Navbar />
        <Hero />
        <Features />
        <Calltoaction />
        <Counter />
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
  ]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;