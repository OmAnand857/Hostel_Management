import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProviderContext } from "./Context";
import { supabase } from '../index.js';
import config  from "../configenv.json"
import { v4 as uuidv4 } from 'uuid';

function Complaint() {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [formData, setFormData] = useState({
    complaintType: '',
    complaintCategory: '',
    complaintDescription: '',
    urgencyLevel: '',
    attachment: null,
    fileError: '', // To store any file size error message
  });
  const navigate = useNavigate()
  const { user , setuser } = useContext(AuthProviderContext)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
      fileError: '', // Reset file error message when other fields change
    }));
  };

  const generateRandomId = () => {
    return uuidv4();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      const maxSize = 3 * 1024 * 1024; // 3 MB in bytes

      // Check file size
      if (file.size > maxSize) {
        setFormData((prevState) => ({
          ...prevState,
          fileError: 'File size exceeds 3 MB. Please upload a smaller file.',
        }));
      } else {
        // If file size is within the limit, update the state
        setFormData((prevState) => ({
          ...prevState,
          attachment: file,
          fileError: '', // Reset error message
        }));
      }
    }
  };

  const uploadFile = async () => {
    const file = formData.attachment;

    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    try {
      console.log('Uploading file...' , file);
      setUploading(true);
      setUploadError('');

      const filePath = `complaint_files/${generateRandomId()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('complaint_bucket') 
        .upload(filePath, file, {
          cacheControl: '3600', 
          upsert: false, 
        });
      let fileurl = null ;  
      if (error) {
        throw new Error(error.message);
      }
      else{
          fileurl = `https://${config.PR_ID}.supabase.co/storage/v1/object/public/complaint_bucket/${filePath}`
      }
      return fileurl;
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setUploadError(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if( !user ){
      alert("Please login to raise a complaint")
      navigate("/")
      return
    }
    
    // FIRST LET'S UPLOAD FILE   
    let filelink = null ;
    if(formData.attachment){
      if( formData.fileError ){
        alert(formData.fileError)
        return
      }
      else{
        filelink = await uploadFile()
      }
    }
    


    const complaintObject = {
      complaintType: formData.complaintType,
      complaintCategory: formData.complaintCategory,
      complaintDescription: formData.complaintDescription,
      urgencyLevel: formData.urgencyLevel,
      fileLink: filelink,
    };

    if ( formData.attachment && !filelink ){
      alert("Error uploading file try again")
    }
    else{
      complaintObject.fileLink = filelink
      console.log(complaintObject)
      // lets send complaints to db
      const { data, error } = await supabase
      .from('complaints_table')
      .insert([
        { complaint_type: complaintObject.complaintType, complaint_category: complaintObject.complaintCategory, complaint_description: complaintObject.complaintDescription, urgency_level: complaintObject.urgencyLevel, resource_link: complaintObject.fileLink, resolved: false , email : user.email},
      ])
      .select()
      if(error){
        alert( error.message )
      }else{
        alert("Complaint raised successfully")
        navigate("/profile")
      }
    }

  };

  return (
    <div className="container px-4 py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h3 mb-3 fw-normal text-center">Raise a Complaint</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="complaintType"
                    aria-label="Select Complaint Type"
                    value={formData.complaintType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Complaint Type</option>
                    <option value="service-quality">Service Quality</option>
                    <option value="accommodation-issue">Accommodation Issue</option>
                    <option value="application-process">Application Process</option>
                    <option value="facility-maintenance">Facility Maintenance</option>
                    <option value="noise-disturbance">Noise Disturbance</option>
                    <option value="staff-behavior">Staff Behavior</option>
                    <option value="cleanliness">Cleanliness</option>
                    <option value="internet-issue">Internet/Network Issue</option>
                    <option value="food-dining">Food and Dining</option>
                    <option value="payment-issue">Payment/Invoice Issue</option>
                    <option value="safety-security">Safety and Security</option>
                    <option value="room-allocation">Room Allocation</option>
                    <option value="guest-policy">Guest Policy</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="complaintType">Select Complaint Type</label>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="complaintCategory"
                    aria-label="Select Complaint Category"
                    value={formData.complaintCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Complaint Category</option>
                    <option value="application-not-accepted">Application not accepted</option>
                    <option value="application-taking-long">Application taking too long</option>
                    <option value="documentation-issue">Documentation issue</option>
                    <option value="incorrect-application-status">Incorrect application status</option>
                    <option value="electricity-failure">Electricity Failure</option>
                    <option value="water-cooler-failure">Water Cooler Failure</option>
                    <option value="plumbing-issue">Plumbing Issue</option>
                    <option value="room-allotment-issue">Room Allotment Issue</option>
                    <option value="room-condition-issue">Room Condition Issue</option>
                    <option value="noise-neighbors">Noise from neighbors</option>
                    <option value="noise-common-areas">Noise from common areas</option>
                    <option value="mess-food-quality-issue">Mess Food Quality Issue</option>
                    <option value="food-timing-issue">Food Timing Issue</option>
                    <option value="staff-unprofessional-behavior">Staff Unprofessional Behavior</option>
                    <option value="staff-unhelpful">Staff Unhelpful</option>
                    <option value="slow-internet">Slow Internet</option>
                    <option value="wifi-not-working">Wi-Fi not working</option>
                    <option value="billing-error">Billing or Payment Issue</option>
                    <option value="other">Other</option>
                  </select>
                  <label htmlFor="complaintCategory">Select Complaint Category</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="complaintDescription"
                    placeholder="Enter your complaint description"
                    value={formData.complaintDescription}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="complaintDescription">Enter your complaint description</label>
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="urgencyLevel"
                    aria-label="Select Urgency Level"
                    value={formData.urgencyLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Urgency Level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <label htmlFor="urgencyLevel">Select Urgency Level</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">
                    Attach Relevant Files (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {/* Display error message if the file size is too large */}
                  {formData.fileError && (
                    <div className="text-danger mt-2">{formData.fileError}</div>
                  )}
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">
                  Raise Complaint
                </button>

                <p className="mt-5 mb-3 text-body-secondary text-center">
                  Please note that all complaints will be reviewed and responded to within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaint;
