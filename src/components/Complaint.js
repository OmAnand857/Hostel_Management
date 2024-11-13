function Complaint() {
    return (
      <div className="container px-4 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h3 mb-3 fw-normal text-center">Raise a Complaint</h2>
                
                <div className="form-floating mb-3">
                  <select className="form-select" id="floatingComplaintType" aria-label="Select Complaint Type" required>
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
                  <label htmlFor="floatingComplaintType">Select Complaint Type</label>
                </div>
  
                <div className="form-floating mb-3">
                  <select className="form-select" id="floatingComplaintCategory" aria-label="Select Complaint Category" required>
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
                  <label htmlFor="floatingComplaintCategory">Select Complaint Category</label>
                </div>
  
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="floatingComplaintDescription"
                    placeholder="Enter your complaint description"
                    required
                  />
                  <label htmlFor="floatingComplaintDescription">Enter your complaint description</label>
                </div>
  
                <div className="form-floating mb-3">
                  <select className="form-select" id="floatingUrgencyLevel" aria-label="Select Urgency Level" required>
                    <option value="">Select Urgency Level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <label htmlFor="floatingUrgencyLevel">Select Urgency Level</label>
                </div>
  
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">
                    Attach Relevant Files (Optional)
                  </label>
                  <input type="file" className="form-control" id="fileInput" accept="image/*,.pdf,.doc,.docx" />
                </div>
  
                <button className="btn btn-primary w-100 py-2" type="submit">
                  Raise Complaint
                </button>
  
                <p className="mt-5 mb-3 text-body-secondary text-center">
                  Please note that all complaints will be reviewed and responded to within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Complaint;
  