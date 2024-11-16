import signup from "./Signup.js"
import signin from "./Login.js"
function Calltoaction(){
return(
<section class="cta-section  py-5 border-bottom">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h2 >Get Started with HostelPro Today!</h2>
        <p >Sign up for a free trial and experience the benefits of our hostel management software.</p>
        <a class="btn btn-lg bg-dark text-white" href="/auth/create_account/student">Sign Up </a>
        <a
          class="btn btn-lg bg-primary text-white ms-3 " href="/auth/login/student">
          Log in
        </a>      
        </div>
    </div>
  </div>
</section>
)
}
export default Calltoaction
