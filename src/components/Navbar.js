import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthProviderContext } from "./Context";
function Navbar(){
  const { user , setuser } = useContext(AuthProviderContext);
  console.log(user, "navbar_user")
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary " >
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-3 me-0 ms-4" href="#">HostelPro</a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-end">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <Link to="/about" class="nav-link">About</Link>
            </li>
            <li class="nav-item">
            <Link to="/status" class="nav-link">Status</Link>
            </li>
            <li class="nav-item">
            <Link to="/complaint" class="nav-link">Complaint</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Hostels</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Kanhar</a></li>
                <li><a class="dropdown-item" href="#">Gopad</a></li>
                <li><a class="dropdown-item" href="#">Indravati</a></li>
              </ul>
            </li>
          </ul>
          <div class="d-lg-flex col-lg-3 me-4 justify-content-lg-center">

            {
              user ? 
              <Link to="/profile" class="btn btn-primary" >Profile</Link> 
              :
              <li class="nav-item dropdown btn btn-primary " style={{listStyle:"none"}} >
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Login</a>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" to='auth/login/guest'>Guest Login</Link></li>
                <li><Link class="dropdown-item" to='auth/login/student'>Student Login</Link></li>
                <li><Link class="dropdown-item" to='auth/login/admin'>Admin Login</Link></li>
                <li><Link class="dropdown-item" to='auth/login/hr'>HR Login</Link></li>
              </ul>
            </li>
            }
          </div>
        </div>
      </div>
    </nav>
    )
}
export default Navbar;