import React , {useEffect, useState} from 'react';
import { Building2, GraduationCap, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContext } from 'react';
import { AuthProviderContext } from './Context';
import Button from '@mui/material/Button';
import Modal from './Modal';




function App() {

  const { user , setuser } = useContext(AuthProviderContext);
  const [ modal , setModal ] = useState( false );

  console.log(user, "user")
  // Hardcoded student data
  const student = {
    id: '1',
    full_name: 'Sarah Johnson',
    enrollment_number: 'EN2024001',
    course: 'Computer Science Engineering',
    semester: 6,
    room_number: 'A-204',
    hostel_block: 'Block A',
    admission_date: '2021-08-15',
    profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    application_status: 'approved',
    complaints: [
      {
        id: '1',
        title: 'Water leakage in bathroom',
        status: 'resolved',
        created_at: '2024-02-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Wi-Fi connectivity issues',
        status: 'in-progress',
        created_at: '2024-03-01T14:30:00Z'
      }
    ]
  };

  const getStatusBadge = (status, type) => {
    let badgeClass = '';
    if (type === 'application') {
      switch (status) {
        case 'approved':
          badgeClass = 'bg-success text-white';
          break;
        case 'rejected':
          badgeClass = 'bg-danger text-white';
          break;
        default:
          badgeClass = 'bg-warning text-dark';
      }
    } else {
      switch (status) {
        case 'resolved':
          badgeClass = 'bg-success text-white';
          break;
        case 'in-progress':
          badgeClass = 'bg-primary text-white';
          break;
        default:
          badgeClass = 'bg-warning text-dark';
      }
    }
    return (
      <span className={`badge rounded-pill ${badgeClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="text-success" style={{ width: '20px', height: '20px' }} />;
      case 'in-progress':
        return <Clock className="text-primary" style={{ width: '20px', height: '20px' }} />;
      default:
        return <AlertCircle className="text-warning" style={{ width: '20px', height: '20px' }} />;
    }
  };

  return (
    <>
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        {/* Profile Header */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="bg-primary text-white" style={{ height: '120px' }}></div>
          <div className="card-body position-relative px-4">
            <div className="row align-items-center">
              <div className="col-auto">
                <img
                  src={user?user.user_metadata.avatar_url : student.profile_image}
                  alt={user?user.user_metadata.full_name : student.full_name}
                  className="rounded-circle border border-4 border-white shadow-sm"
                  style={{ width: '96px', height: '96px', marginTop: '-48px' }}
                />
              </div>
              <div className="col">
                <h1 className="h3 mb-1">{user ? user.user_metadata.full_name : "<name>"}</h1>
                <p className="text-muted mb-0">{ user ? user.user_metadata.email : "<email>"}</p> 
              </div>
              <div className="col-auto">
                {getStatusBadge(student.application_status, 'application')}
              </div>
            </div>
          </div>
        </div>

        {/* Academic & Room Details */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h5 d-flex align-items-center gap-2 mb-4">
                  <GraduationCap className="text-primary" style={{ width: '20px', height: '20px' }} />
                  Academic Details
                </h2>
                <div className="mb-3">
                  <small className="text-muted d-block">Course</small>
                  <span className="fw-medium">{student.course}</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block">Current Semester</small>
                  <span className="fw-medium">{student.semester}</span>
                </div>
                <div>
                  <small className="text-muted d-block">Admission Date</small>
                  <span className="fw-medium">
                    {new Date(student.admission_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="card-title h5 d-flex align-items-center gap-2 mb-4">
                  <Building2 className="text-primary" style={{ width: '20px', height: '20px' }} />
                  Hostel Details
                </h2>
                <div className="mb-3">
                  <small className="text-muted d-block">Room Number</small>
                  <span className="fw-medium">{student.room_number}</span>
                </div>
                <div>
                  <small className="text-muted d-block">Block</small>
                  <span className="fw-medium">{student.hostel_block}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Section */}
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h5 mb-4">Complaints History</h2>
            <div className="d-flex flex-column gap-3">
              {student.complaints.map((complaint) => (
                <div key={complaint.id} className="card border">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        {getStatusIcon(complaint.status)}
                        <h4 className="h6 mb-0">{complaint.title}</h4>
                      </div>
                      {getStatusBadge(complaint.status, 'complaint')}
                    </div>
                    <small className="text-muted d-block mt-2">
                      Submitted on: {new Date(complaint.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-1 mb-5">
      {/* Add the logout button here */}
      <Button variant="contained" color="error" onClick={ () => setModal(!modal) }>Logout</Button>
    </div>
    { modal && <Modal modal_prop = {setModal}/>}
    </>
  );
}

export default App;