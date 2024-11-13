import React from "react";
import { Link } from "react-router-dom";
function Navbar(){
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
            <Link to="/#" class="nav-link">Home</Link>
            </li>
            <li class="nav-item">
              <Link to="/about" class="nav-link">About</Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/Status" data-bs-toggle="dropdown" aria-expanded="false">Status</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/status?section=application-status">Check Application Status</a></li>
                <li><a class="dropdown-item" href="/status?section=room-availability">Check Room Availability</a></li>
                <li><a class="dropdown-item" href="/status?section=complaint-status">Check Complaint Status</a></li>
                <li><a class="dropdown-item" href="/status?section=application-history">Application History</a></li>
                <li><a class="dropdown-item" href="/status?section=notices">Notices And Updates</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Hostels</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/Hostels#kanhar">Kanhar</a></li>
                <li><a class="dropdown-item" href="/Hostels#gopad">Gopad</a></li>
                <li><a class="dropdown-item" href="/Hostels#indravati">Indravati</a></li>
              </ul>
            </li>
          </ul>
          <div class="d-lg-flex col-lg-3 me-4 justify-content-lg-center">
            <button class="btn btn-primary">Book Room</button>
          </div>
        </div>
      </div>
    </nav>
    )
}
export default Navbar;