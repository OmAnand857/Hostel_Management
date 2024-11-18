import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { supabase } from "../index.js";

const Success = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://hostel-management-backend-hoym.onrender.com/get-payment-details/${paymentIntentId}`);
        setPaymentDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setLoading(false);
      }
    };

    if (paymentIntentId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
      console.log('No payment intent found in URL');
    }
  }, [paymentIntentId]);

  useEffect(() => {
    if (!paymentDetails) {
      return;
    }
    const myData = {
      transaction_id: paymentDetails.id,
      amount: paymentDetails.amount,
      status: paymentDetails.status,
      metadata: paymentDetails.metadata,
    };

    const updateRoomStatus = async ( roomId , person1 ) => {
      try {
        
        const { data, error } = await supabase
          .from('hostel_room')
          .update({ status: true,person1:person1 }) 
          .eq('id', roomId); 
        if (error) {
          throw error;
        }
    
        console.log('Room status updated successfully', data);
      } catch (error) {
        console.error('Error updating room status:', error.message);
      }
    };
    updateRoomStatus(paymentDetails.metadata.room_id,paymentDetails.shipping.name);
    setPaymentData(myData);
  }, [paymentDetails, loading]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 ">
            <h2 className="text-center mb-4 fw-bold text-success">Payment Successful</h2>
            <lottie-player
              src="https://lottie.host/1072135d-ccff-435c-a94a-b0f1c7ddd70c/dTsrbuSLSk.json"
              background="##2ecc71"
              speed="1"
              style={{ width: '100%', height: '300px' }}
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </div>
          {/* New Card displaying myData */}
          {paymentData && (
            <div className="card mt-4 p-3 mb-4">
              <h4 className="text-center mb-3">Transaction Details</h4>
              <div className="list-group">
                <div className="list-group-item">
                  <strong>Transaction ID:</strong> {paymentData.transaction_id}
                </div>
                <div className="list-group-item">
                  <strong>Amount:</strong> Rs{(paymentData.amount / 100).toFixed(2)}
                </div>
                <div className="list-group-item">
                  <strong>Status:</strong> {paymentData.status}
                </div>
                <div className="list-group-item">
                  <strong>Metadata:</strong> {JSON.stringify(paymentData.metadata)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
