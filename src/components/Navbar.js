import React from "react";

function Navbar(){
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Thirteenth navbar example">
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
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link " >Status</a>
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
            <button class="btn btn-primary">Book Room</button>
          </div>
        </div>
      </div>
    </nav>
    )
}
export default Navbar;