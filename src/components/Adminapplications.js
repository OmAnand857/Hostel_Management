import React, { useState, useEffect } from 'react';
import {supabase} from '../index.js';  // Import Supabase client
import axios from 'axios';  // Import axios for sending requests to your backend
import { AuthProviderContext } from './Context';
import { useContext } from 'react';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthProviderContext);
  const [hideResolved, setHideResolved] = useState(false); // State to toggle hide resolved applications

  useEffect(() => {
    // Function to fetch applications from Supabase
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('application_table')
          .select('*');  // Select all columns from the application_table

        if (error) {
          throw error;
        }

        setApplications(data);
      } catch (error) {
        setError('Failed to fetch applications');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);  // Empty dependency array to run only once when component mounts

  const handleResolve = async (applicationId) => {
    // Send a request to your backend to resolve the application
    console.log( user )
    try {
      const response = await axios.post('http://localhost:5173/admin/resolve-application', {
        application_id: applicationId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
      }
    );

      if (response.status === 200) {
        // If resolved successfully, update local state (optimistic UI)
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app.application_id === applicationId ? { ...app, status: true } : app
          )
        );
        alert("Application resolved successfully")
      }
      else{
        alert("Failed to resolve application")
      }
    } catch (error) {
      console.error('Error resolving application:', error);
      setError( error.response.data.message );
    }
  };

  // Filter applications based on the hideResolved flag
  const filteredApplications = hideResolved
    ? applications.filter((app) => !app.status)  // Only unresolved applications
    : applications;

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}  // This will make sure the spinner is centered vertically and horizontally
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Application List</h2>
      
      {/* Toggle for hiding resolved applications */}
      <div className="mb-3 ">
        <button className="btn btn-primary" onClick={() => setHideResolved(!hideResolved)}>
          {hideResolved ? 'Show All Applications' : 'Hide Resolved Applications'}
        </button>
      </div>

      <div className="table-responsive">  {/* Add table-responsive wrapper */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Application ID</th>
              <th>Email</th>
              <th>Application Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.application_id}</td>
                <td>{application.email}</td>
                <td>{application.application_type}</td>
                <td>{application.description}</td>
                <td>{application.status ? 'Resolved' : 'Pending'}</td>
                <td>{new Date(application.created_at).toLocaleString()}</td>
                <td>
                  {/* Display the "Resolve" button only if the application is not already resolved */}
                  {!application.status ? 
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleResolve(application.application_id)}
                    >
                      Resolve
                    </button>
                  </>
                  :
                  <button className="btn btn-success" disabled >Resolved</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationList;
