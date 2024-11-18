

function Hero(){
    return(
        <div class="px-4 pt-5  text-center border-bottom">
    <h1 class="display-4 fw-bold text-body-emphasis">HostelPro: Your Home Away from Home</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Experience a vibrant and supportive living environment at IIT Bhilai. Our hostels offer modern amenities, comfortable accommodations, and a community that fosters academic and personal growth. Join us for a home away from home, where friendships and memories are made, and where you can thrive in your studies and extracurricular activities</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" onClick={()=> alert("Start with Login")}>Get Started</button>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Contact</button>
      </div>
    </div>
    {/* <div class="overflow-hidden" style={{"maxHeight":"30vh"}}>
      <div class="container px-5">
        <img src="#" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy"/>
      </div>
    </div> */}
  </div>
    )
}

export default Hero