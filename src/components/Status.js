
import React, { useState, useRef, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from "./Footer.js"

const StatusPage = () => {
    const location = useLocation();
    const applicationStatusRef = useRef(null);
    const complaintStatusRef = useRef(null);
    const roomAvailabilityRef = useRef(null);
    const applicationHistoryRef = useRef(null);
    const noticesRef = useRef(null);


    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const section = queryParams.get('section');
      
      if (section === 'application-status' && applicationStatusRef.current) {
          applicationStatusRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'complaint-status' && complaintStatusRef.current) {
        complaintStatusRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'room-availability' && roomAvailabilityRef.current) {
          roomAvailabilityRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'application-history' && applicationHistoryRef.current) {
          applicationHistoryRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'notices' && noticesRef.current) {
          noticesRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  }, [location]);


    // Sample static data for demonstration
    const applicationHistory = [
        { id: '001', info: 'Indravati - Room 101', status: 'Approved', date: '2024-10-01' },
        { id: '002', info: 'Kanhar - Room 202', status: 'Pending', date: '2024-10-15' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
        { id: '003', info: 'Gopad - Room 303', status: 'Rejected', date: '2024-09-25' },
      ];
  
    const roomAvailability = [
      { hostel: 'Kanhar', available: 5, total: 50 },
      { hostel: 'Gopad', available: 10, total: 40 },
      { hostel: 'Indravati', available: 2, total: 30 },
      { hostel: 'Shivnath', available: 40, total: 50 },
    ];
  
    const [displayedEntries, setDisplayedEntries] = useState(3);
  
  const handleViewMore = () => {
    setDisplayedEntries((prev) => Math.min(prev + 5, applicationHistory.length));
  };

  const handleViewAll = () => {
    setDisplayedEntries(applicationHistory.length);
  };

  const handleShowLess = () => {
    setDisplayedEntries(3);
  };

    return (
      <>
        <Navbar />
        <div className="container py-5">

        {/* Check Application Status and Check Complaint Status Sections */}
        <section className="row mb-5">
            <div ref={applicationStatusRef} className="col-md-6 mb-3">
              <h2>Check Application Status</h2>
              <div className="form-inline py-3">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Enter Application ID"
                />
              </div>
              <button className="btn btn-primary">Check Status</button>
            </div>

            <div ref={complaintStatusRef} className="col-md-6 mb-3">
              <h2>Check Complaint Status</h2>
              <div className="form-inline py-3">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Enter Complaint ID"
                />
              </div>
              <button className="btn btn-primary">Check Status</button>
            </div>
          </section>
  
          {/* Room Availability */}
          <section ref={roomAvailabilityRef} className="mb-5">
          <h2>Hostel Room Availability</h2>
          <div className="row">
            {roomAvailability.map((hostel, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card p-3">
                  <h5>Hostel {hostel.hostel}</h5>
                  <p>Available Rooms: {hostel.available} / {hostel.total}</p>
                  <div className="progress mb-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${(hostel.available / hostel.total) * 100}%` }}
                      aria-valuenow={hostel.available}
                      aria-valuemin="0"
                      aria-valuemax={hostel.total}
                    ></div>
                  </div>
                  {/* View More Button */}
                  <button className="btn btn-outline-primary btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
  
          {/* Application History */}
          <section ref={applicationHistoryRef} className="mb-5">
          <h2>Application History</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Application Info</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {applicationHistory.slice(0, displayedEntries).map((application, index) => (
                <tr key={index}>
                  <td>{application.id}</td>
                  <td>{application.info}</td>
                  <td>{application.status}</td>
                  <td>{application.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* View More and View All Buttons */}
          <div className="text-center">
            {displayedEntries < applicationHistory.length && (
              <button className="btn btn-primary m-2" onClick={handleViewMore}>
                View More
              </button>
            )}
            {displayedEntries < applicationHistory.length && (
              <button className="btn btn-secondary m-2" onClick={handleViewAll}>
                View All
              </button>
            )}
            {displayedEntries > 3 && (
              <button className="btn btn-danger m-2" onClick={handleShowLess}>
                Show Less
              </button>
            )}
          </div>
        </section>
        </div>

        {/* <hr className="my-2" /> */}

        <div className="container py-5">
          {/* Notices and Updates */}
          <section ref={noticesRef} className="mb-5">
            <h2>Notices and Updates</h2>
            <p>HostelPro is lauching their website soon!</p>
            <p>Stay tuned for any important notices or updates related to HostelPro and hostel management.</p>
          </section>
        </div>

        <hr className="my-2" />

        <Footer/>
      </>
    );
  };
  
  export default StatusPage;