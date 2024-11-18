import React, { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LogoutIcon from '@mui/icons-material/Logout';
import "../styles/App.css";
import { Link } from 'react-router-dom';
import { AuthProviderContext } from './Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function App() {
  const { user , setuser }= useContext(AuthProviderContext);
  const navigate = useNavigate();
  useEffect(() => {
    if( user==null ){
      navigate("/auth/login/admin")
    }
    if (user?.type !== "admin") {
      navigate("/auth/login/admin")
    }
  },[user])
  const handleLogout = () => {
    setuser(null)
    localStorage.clear()
    navigate("/")
  }
  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm mb-4">
        <div className="container">
          <a className="navbar-brand fw-bold" >HostelPro</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-2">
                <Link to="/admin" className="nav-link d-flex align-items-center" >
                  <HomeIcon className="me-2" />
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/admin/applications" className="nav-link d-flex align-items-center">
                  <DescriptionIcon className="me-2" />
                  Applications
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/admin/complaints" className="nav-link d-flex align-items-center" >
                  <ReportIcon className="me-2" />
                  Complaints
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/hostels" className="nav-link d-flex align-items-center" >
                  <ApartmentIcon className="me-2" />
                  Hostels
                </Link>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link d-flex align-items-center" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <LogoutIcon className="me-2" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Hero Section */}
        <div className="text-center py-5 mb-5 hero-section rounded-3">
          <h1 className="display-4 fw-bold text-white">Welcome to HostelPro Admin</h1>
          <p className="lead text-white">Manage your hostel operations efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-muted">Total Students</h5>
                <h2 className="mt-3 mb-0">1,234</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-muted">Available Rooms</h5>
                <h2 className="mt-3 mb-0">45</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
             <Link to="applications" style={{ textDecoration: 'none' , color: 'inherit' }} > 
                <div className="card-body">
                <h5 className="card-title text-muted">New Applications</h5>
                <h2 className="mt-3 mb-0">28</h2> 
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
            <Link to="complaints" style={{ textDecoration: 'none' , color: 'inherit' }} > 
              <div className="card-body">
                <h5 className="card-title text-muted">Active Complaints</h5>
                <h2 className="mt-3 mb-0">12</h2>
              </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-header bg-white">
            <h4 className="mb-0">Recent Activity</h4>
          </div>
          <div className="card-body">
            <div className="border-bottom py-3">
              <p className="mb-1 fw-bold">New Application - Room 203</p>
              <small className="text-muted">2 minutes ago</small>
            </div>
            <div className="border-bottom py-3">
              <p className="mb-1 fw-bold">Complaint Resolved - Maintenance Issue</p>
              <small className="text-muted">1 hour ago</small>
            </div>
            <div className="py-3">
              <p className="mb-1 fw-bold">Room Allocated - Student ID #12345</p>
              <small className="text-muted">3 hours ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;