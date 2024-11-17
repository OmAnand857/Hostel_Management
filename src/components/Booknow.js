import React, { useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is included
import { useContext } from 'react';
import { FormdataProviderContext } from './Context';
const Booknow = () => {
  const [step, setStep] = useState(1); // Track current step in the form wizard
  const Navigate = useNavigate()
  const { formData , setFormData } = useContext(FormdataProviderContext);
  const [errors, setErrors] = useState({});
  const { hosteltype , room_id } = useParams();
  

  const images = [
    '/step1.webp', // Image for Step 1 (Personal Info)
    '/step2.webp', // Image for Step 2 (Room Preferences)
    '/step3.webp', // Image for Step 3 (Confirmation)
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    } else if (step === 2) {
      if (!formData.description) newErrors.description = 'Description is required';
    }
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setStep((prevStep) => Math.min(prevStep + 1, 3)); // Go to the next step
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Go back to the previous step
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      // Redirect or reset form after successful submission.

      Navigate(`/payment/${hosteltype}/${room_id}`)


    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row mb-4 text-center">
        <div className="col">
          <h1 className="display-4">Easily Book a Room and Pay Online Hassle-Free</h1>
          <p className="lead">
            Follow the simple steps to book your hostel room. It only takes a few minutes!
          </p>
        </div>
      </div>
      {/* Form Wizard */}
      <div className="row justify-content-center">
        <div className="col-md-8 d-flex flex-column flex-md-row align-items-stretch">
          {/* Image Area */}
          <div className="col-md-4 d-flex align-items-stretch">
            <img
              src={images[step - 1]}
              alt="Booking Step"
              className="img-fluid rounded w-100 h-100 object-cover"
            />
          </div>

          {/* Form Area */}
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="card p-4 shadow-sm w-100 d-flex flex-column justify-content-around">
            <div className='text-center  fw-bold mb-3 card container-sm'><small>Room Id:{room_id}<br/> Hostel:{hosteltype}</small></div>

              <h3 className="text-center mb-2 text-primary">
                Step {step}: {step === 1 ? 'Personal Information' : step === 2 ? 'Room Preferences' : 'Confirmation'}
              </h3>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    <div className="mb-1">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-1">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-1">
                      <label htmlFor="state" className="form-label">State</label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>

                    <div className="row">
                      <div className="col-6 mb-1">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>

                      <div className="col-6 mb-1">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input
                          type="text"
                          className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                        />
                        {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="userType" className="form-label">User Type</label>
                      <select
                        className="form-select"
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                      >
                        <option value="student">Student</option>
                        <option value="guest">Guest</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Why do you need the room?</label>
                      <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="text-center">
                    <h4>Review your details</h4>
                    <ul className="list-unstyled">
                      <li><strong>Name:</strong> {formData.name}</li>
                      <li><strong>Email:</strong> {formData.email}</li>
                      <li><strong>User Type:</strong> {formData.userType}</li>
                      <li><strong>Description:</strong> {formData.description}</li>
                      <li><strong>State:</strong> {formData.state}</li>
                      <li><strong>City:</strong> {formData.city}</li>
                      <li><strong>Pincode:</strong> {formData.pincode}</li>
                    </ul>
                    <button type="submit" className="btn btn-success w-100">Submit Booking</button>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  {step > 1 && <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>}
                  {step < 3 && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booknow;