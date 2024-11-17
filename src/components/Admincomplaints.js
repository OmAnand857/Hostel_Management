import React, { useState, useEffect } from 'react';
import { supabase } from '../index.js';  // Import Supabase client
import axios from 'axios';  // Import axios for sending requests to your backend
import { AuthProviderContext } from './Context';
import { useContext } from 'react';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthProviderContext);
  const [hideResolved, setHideResolved] = useState(false); // State to toggle hide resolved complaints

  useEffect(() => {
    // Function to fetch complaints from Supabase
    const fetchComplaints = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('complaints_table')  // Assuming your table name is 'complaints_table'
          .select('*');  // Select all columns from the complaints_table

        if (error) {
          throw error;
        }

        setComplaints(data);
      } catch (error) {
        setError('Failed to fetch complaints');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);  // Empty dependency array to run only once when component mounts

  const handleResolve = async (complaintId) => {
    // Send a request to your backend to resolve the complaint
    try {
      const response = await axios.post('http://localhost:5173/admin/resolve-complaint', {
        complaint_id: complaintId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`,
        },
      });

      if (response.status === 200) {
        // If resolved successfully, update local state (optimistic UI)
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === complaintId ? { ...complaint, resolved: true } : complaint
          )
        );
        alert("Complaint resolved successfully");
      } else {
        alert("Failed to resolve complaint");
      }
    } catch (error) {
      console.error('Error resolving complaint:', error);
      setError(error.response?.data?.message || 'Failed to resolve complaint');
    }
  };

  // Filter complaints based on the hideResolved flag
  const filteredComplaints = hideResolved
    ? complaints.filter((complaint) => !complaint.resolved)  // Only unresolved complaints
    : complaints;

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
      <h2 className="text-primary">Complaints List</h2>
      
      {/* Toggle for hiding resolved complaints */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={() => setHideResolved(!hideResolved)}>
          {hideResolved ? 'Show All Complaints' : 'Hide Resolved Complaints'}
        </button>
      </div>

      <div className="table-responsive">  {/* Add table-responsive wrapper */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Complaint Type</th>
              <th>Complaint Category</th>
              <th>Description</th>
              <th>Urgency Level</th>
              <th>Resource Link</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.email}</td>
                <td>{complaint.complaint_type}</td>
                <td>{complaint.complaint_category}</td>
                <td>{complaint.complaint_description}</td>
                <td>{complaint.urgency_level}</td>
                {/* Render Resource Link as clickable link */}
                <td>
                  {complaint.resource_link ? (
                    <a href={complaint.resource_link} target="_blank" rel="noopener noreferrer">
                      View Resource
                    </a>
                  ) : (
                    <span>No Link</span>
                  )}
                </td>
                <td>{complaint.resolved ? 'Resolved' : 'Pending'}</td>
                <td>{new Date(complaint.created_at).toLocaleString()}</td>
                <td>
                  {/* Display the "Resolve" button only if the complaint is not already resolved */}
                  {!complaint.resolved ? 
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleResolve(complaint.id)}
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

export default AdminComplaints;
