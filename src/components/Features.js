import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ApartmentIcon from '@mui/icons-material/Apartment';

function Features(){

    return(
        <div class="container px-4 py-3">

    <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-4 py-3">
      <div class="col d-flex flex-column align-items-start gap-2">
        <ApartmentIcon style={{ fontSize: 60 }} color="primary"/>
        <h2 class="fw-bold text-body-emphasis">Effortless Room Allocation</h2>
        <p class="text-body-secondary">Our system ensures a smooth and efficient room allocation process, taking into account student preferences and requirements.</p>
        <a href="#" class="btn btn-primary btn-lg">Learn More</a>
      </div>

      <div class="col">
        <div class="row row-cols-1 row-cols-sm-2 g-4">
          <div class="col d-flex flex-column gap-2">
              <SettingsApplicationsIcon style={{ fontSize: 60 }} color="primary"/>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Centralized Communication</h4>
            <p class="text-body-secondary">Stay connected with the hostel administration and fellow students through our dedicated communication platform.</p>
          </div>

          <div class="col d-flex flex-column gap-2">
          <PersonIcon style={{ fontSize: 60 }} color="primary"/>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Maintenance Management</h4>
            <p class="text-body-secondary">Report and track maintenance requests with ease, ensuring prompt resolutions and a comfortable living environment.</p>
          </div>

          <div class="col d-flex flex-column gap-2">
          <RestaurantIcon style={{ fontSize: 60 }} color="primary"/>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Dining Management</h4>
            <p class="text-body-secondary">Manage meal preferences, feedback, and dining schedules with our intuitive system.</p>
          </div>

          <div class="col d-flex flex-column gap-2">
          <DesignServicesIcon style={{ fontSize: 60 }} color="primary"/>
            <h4 class="fw-semibold mb-0 text-body-emphasis">Visitor Management</h4>
            <p class="text-body-secondary">Track visitor entries and exits securely, ensuring a safe and secure living environment.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    )

}
export default Features
