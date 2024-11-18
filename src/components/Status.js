
import React, { useState, useRef, useEffect } from 'react'; 
import { useLocation , Link } from 'react-router-dom';
import Footer from "./Footer.js"
import { useContext } from 'react';
import { AuthProviderContext } from './Context';
import { supabase } from "../index.js"
import { v4 as uuidv4 } from 'uuid';

const StatusPage = () => {
  const location = useLocation();
  const applicationStatusRef = useRef(null);
  const complaintStatusRef = useRef(null);
  const roomAvailabilityRef = useRef(null);
  const applicationHistoryRef = useRef(null);
  const noticesRef = useRef(null);
  const applicationSectionRef = useRef(null);  // Reference for the new "Submit Application" section
  const { user , setuser } = useContext(AuthProviderContext);
  const [ roomData , setRoomdata ] = useState(null);
  const [map,setmap] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [applicationHistory, setApplicationHistory] = useState(null);
  const [applicationData, setApplicationData] = useState({
    type: '',
    description: '',
  });
  const [ applicationStatusId, setApplicationStatusId ] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [ complaintStatusId, setComplaintStatusId ] = useState(null);
  const [complaintStatus, setComplaintStatus] = useState(null);
const [loadingSubmit, setLoadingSubmit] = useState(false);

const handleApplicationChange = (e) => {
  const { name, value } = e.target;
  setApplicationData({
      ...applicationData,
      [name]: value,
  });
};

const handleApplicationStatusCheckChange = (e) => {
  e.preventDefault();
  const appid = e.target.value;
  setApplicationStatusId(appid);
}

const handleApplicationStatusCheck = async (e) => {
  e.preventDefault();
  try {
      const { data, error } = await supabase
          .from('application_table')
          .select('*')
          .eq('application_id', applicationStatusId);
      if (error) {
          console.error('Error checking application status:', error);
          alert('Failed to check application status. Please try again later.');
      } else {
        if( data.length == 0 ){
          alert("No such complaint exists")
          return
        }
          alert('Application status checked successfully!');
          setApplicationStatus(data[0].status?"Approved":"Pending");
      }
  } catch (error) {
      console.error('Error checking application status:', error);
      alert('Failed to check application status. Please try again later.');
  }
}

const handleComplaintStatusCheckChange = (e) => {
  e.preventDefault();
  const compid = e.target.value;
  setComplaintStatusId(compid);
}

const handleComplaintStatusCheck = async (e) => {
  e.preventDefault();
  try {
      const { data, error } = await supabase
          .from('complaints_table')
          .select('*')
          .eq('id', complaintStatusId);
      if (error) {
          console.error('Error checking complaint status:', error);
          alert('Failed to check complaint status. Please try again later.');
      } else {
          if( data.length == 0 ){
            alert("No such complaint exists")
            return
          }
          alert('Complaint status checked successfully!');
          setComplaintStatus(data[0].status?"Resolved":"Pending");
      }
  } catch (error) {
      console.error('Error checking complaint status:', error);
      alert('Failed to check complaint status. Please try again later.');
  }
}


const handleSubmitApplication = async (e) => {
  e.preventDefault();
  if(!user){
    alert("Please login to submit an application");
    return
  }
  setLoadingSubmit(true);
  const applicationId = uuidv4();
  // Assuming you want to store application data in a Supabase table "applications"
  try {
      const { data, error } = await supabase
          .from('application_table')
          .insert([
              {
                  application_id: applicationId,  // Assuming user is logged in and you have user data
                  application_type: applicationData.type,
                  description: applicationData.description,
                  status: false, // Initial status
                  email: user.email
              }
          ]);

      if (error) {
          console.error('Error submitting application:', error);
          alert('Failed to submit application. Please try again later.');
      } else {
          alert('Application submitted successfully!');
          setApplicationData({ type: '', description: '' });  // Reset form fields
      }
  } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again later.');
  } finally {
      setLoadingSubmit(false);
  }
};

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

    // Dynamic application history

    async function fetchApplicationHistory(email) {
      try {
        const { data, error } = await supabase
          .from('application_table')  // Replace with your actual table name
          .select('*')  // This selects all columns in the table
          .eq('email', user.email);  // This filters the rows where the email column matches the provided email
    
        if (error) {
          throw error;
        }
    
        // `data` will contain all the rows that match the email
        return data;
      } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
      }
    }

    useEffect(() => {
      async function fetchData() {
        const data = await fetchApplicationHistory(user?.email);
        setApplicationHistory(data);
      }
      fetchData();
    }, [user,loadingSubmit]);

   
    
    // code to generate room availabilty dynamically
    
    useEffect(() => {
      const getRoomAvailability = async () => {
        try {
          const { data, error } = await supabase.from('hostel_room').select('*');
          if (error) {
            console.error('Error fetching room availability:', error);
          } else {
            setRoomdata(data); // Set the room data
            const mp = new Map();
            mp.set("Kanhar", { free: 0, occupied: 0 });
            mp.set("Gopad", { free: 0, occupied: 0 });
            mp.set("Indravati", { free: 0, occupied: 0 });
            mp.set("Shivnath", { free: 0, occupied: 0 });
  
            // Process the fetched data
            data.forEach((item) => {
              const curr = mp.get(item.hostel_name);
              if (item.status) {
                curr.free = curr.free + 1;
              } else {
                curr.occupied = curr.occupied + 1;
              }
              mp.set(item.hostel_name, curr);
            });
  
            setmap(mp); // Set the final availability map
          }
        } catch (error) {
          console.error('Error fetching room availability:', error);
        } finally {
          setLoading(false); // Stop loading once data is fetched
        }
      };
  
      getRoomAvailability();
    }, []);

  

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
                  onChange={handleApplicationStatusCheckChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleApplicationStatusCheck}>Check Status</button>
            </div>

            { applicationStatus && <div className="col-md-6 mb-3 ">
              <h2>Application Status</h2>
              <p>{applicationStatus}</p>
            </div> }

            <div ref={complaintStatusRef} className="col-md-6 mb-3">
              <h2>Check Complaint Status</h2>
              <div className="form-inline py-3">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Enter Complaint ID"
                  onChange={handleComplaintStatusCheckChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleComplaintStatusCheck}>Check Status</button>
            </div>
          </section>
          {complaintStatus && <div className="col-md-6 mb-3">
              <h2>Complaint Status</h2>
              <p>{complaintStatus}</p>
            </div> }
  
          {/* Room Availability */}
          <section ref={roomAvailabilityRef} className="mb-5">
            <h2>Hostel Room Availability</h2>
            <div className="row">
              {loading ? (
                // Show loading spinner while data is being fetched
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', width: '100%' }}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : map?.size > 0 ? (
                Array.from(map.entries()).map(([hostelName, { free, occupied }], index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="card p-3">
                      <h5>Hostel {hostelName}</h5>
                      <p>Available Rooms: {free} / {free + occupied}</p>
                      <div className="progress mb-3">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(free / (free + occupied)) * 100}%` }}
                          aria-valuenow={free}
                          aria-valuemin="0"
                          aria-valuemax={free + occupied}
                        ></div>
                      </div>
                      <Link to={hostelName}>
                        <button className="btn btn-outline-primary btn-sm">View Details</button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <h3>No Data Available</h3>
              )}
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
              { applicationHistory?
             applicationHistory.map((application, index) => (
                index<displayedEntries &&
                <tr key={index}>
                  <td>{application.application_id}</td>
                  <td>{application.application_type}</td>
                  <td>{application.status? "Accepted" : "Pending"}</td>
                  <td>{new Date(application.created_at).toLocaleDateString()}</td>
                </tr>
              )) : 
                              user?
                              // Show loading spinner while data is being fetched
                              <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', width: '100%' }}>
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              </div> :
                              <div className="d-flex justify-content-center align-items-center" >
                                <h4 className='text-primary' ><Link to="/login">Please Login to see this section</Link></h4>
                                </div>
              }
            </tbody>
          </table>

          {/* View More and View All Buttons */}
          <div className="text-center">
            {displayedEntries < applicationHistory?.length && (
              <button className="btn btn-primary m-2" onClick={handleViewMore}>
                View More
              </button>
            )}
            {displayedEntries < applicationHistory?.length && (
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

        {/* submit application section */}
        <div className="container py-5">
          <section ref={applicationSectionRef} className="mb-5">
            <h2>Submit an Application</h2>
            <p>
              Have a request? Whether it's for a room change, hostel change, or any other type of application, fill out the form below to submit your application. 
              Our team will review your application and respond as soon as possible.
            </p>
            <form onSubmit={handleSubmitApplication}>
              <div className="form-group">
                <label htmlFor="type">Application Type</label>
                <select
                  className="form-control"
                  id="type"
                  name="type"
                  value={applicationData.type}
                  onChange={handleApplicationChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Room Change">Room Change</option>
                  <option value="Hostel Change">Hostel Change</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={applicationData.description}
                  onChange={handleApplicationChange}
                  placeholder="Describe your application request here"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-3" disabled={loadingSubmit}>
                {loadingSubmit ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </section>
        </div>

        <hr className="my-2" />

        <Footer/>
      </>
    );
  };
  
  export default StatusPage;