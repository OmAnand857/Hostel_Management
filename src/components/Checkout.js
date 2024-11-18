import React, { useState, useEffect, useContext } from 'react';
import { AuthProviderContext, FormdataProviderContext } from './Context';
import { useNavigate, useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_S_SK);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const[ paymentInProgress, setPaymentInProgress ] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet, prevent submission
    }
    setPaymentInProgress(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://hostel-management-roan.vercel.app/success", // Make sure this URL is correct
      },
    });

    if (result.error) {
      console.log(result.error.message);
      alert("Payment failed: " + result.error.message); // Show user-friendly message
      setPaymentInProgress(false);
    } else {
      alert('Payment successful!');
      setPaymentInProgress(false);
      localStorage.setItem('paymentSuccess', JSON.stringify(result));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-primary mt-3" disabled={!stripe || paymentInProgress}> {   paymentInProgress ? "Processing Payment..." : "Submit"}</button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  const { formData } = useContext(FormdataProviderContext);
  const { user } = useContext(AuthProviderContext);
  const { hosteltype , room_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/"); // Redirect if not logged in
      return;
    }

    const shipping = {
      name: formData.name,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      email: user.email
    };

    const payload = {
      amount: Math.round(500 * 100), // Convert to smallest unit (e.g., cents)
      shipping: shipping,
      description : formData.description,
      hosteltype : hosteltype,
      room_id : room_id
    };

    const getClientSecret = async () => {
      try {
        const response = await fetch("https://hostel-management-backend-hoym.onrender.com/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret); // Set the client secret once it's available
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    getClientSecret(); // Fetch the client secret
  }, [formData, user, navigate]);

  // Ensure Elements is not rendered until clientSecret is available
  if (!clientSecret) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card p-4 shadow-sm">
              <h3 className="text-center mb-4">Complete Your Payment</h3>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}
