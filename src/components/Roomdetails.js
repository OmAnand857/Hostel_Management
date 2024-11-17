import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams , useNavigate } from 'react-router-dom';
import { supabase } from "../index.js"
// Sample data to simulate API response

// Simulate an API call to fetch room details
const fetchRoomDetails =  async (hostel_type) => {

    const { data, error } =  await supabase
    .from('hostel_room')  
    .select('*')      
    .eq('hostel_name', hostel_type); 

  if (error) {
    console.error('Error fetching hostels:', error);
    return;
  }

  console.log('Hostels data:', data);
  return data;
};

const HostelRoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hostel_type = useParams().hosteltype;
  const Navigate = useNavigate();
  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const data = await fetchRoomDetails(hostel_type);
        setRooms(data);
      } catch (err) {
        setError('Failed to fetch room data');
      } finally {
        setLoading(false);
      }
    };

    getRoomDetails();
  }, []); // Empty array means this runs only once when component mounts

  function handleRoomBook(e){
    const room_id = e.target.id;
    console.log(room_id);
    Navigate(`booknow/${room_id}`)
  }



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Vacant Hostel Rooms in {hostel_type}</h2>
      {rooms.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No vacant rooms available.
        </div>
      ) : (
        <div className="row">
          {rooms
            .map((room) => (
              <div className="col-md-4 mb-4" key={room.id}>
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Room {room.wing_name}{room.room_number} </h5>
                  </div>
                  <div className="card-body">
                    <p><strong>Type:</strong> {room.occupancy===1?"Single":"Double"}</p>
                    <p><strong>Price:</strong> 500</p>
                    <p><strong>Status:</strong> {room.status?"Occupied":"Vacant"}</p>
                  </div>
                  <div className="card-footer text-center">
                    {!room.status?<button className="btn btn-primary" id={room.id} onClick={handleRoomBook}>Book Now</button>: <button className="btn btn-danger" disabled >Occupied</button>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HostelRoomList;
