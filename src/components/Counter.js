import CountUp, { useCountUp } from 'react-countup';


function Counter() {
    useCountUp({
        ref: 'counter',
        end: 1234567,
        enableScrollSpy: true,
        scrollSpyDelay: 1000,
      });
    return (
        <section class="counter-section py-5 bg-primary text-white border-top">
  <div class="container">
    <div class="row">
      <div class="col-md-3 text-center fs-4">
        <div class="counter-box">
        <CountUp end={567} duration="3" enableScrollSpy />
          <p>Rooms</p>
        </div>
      </div>
      <div class="col-md-3 text-center fs-4">
        <div class="counter-box">
        <CountUp end={1578} duration="3" enableScrollSpy />
          <p>Students</p>
        </div>
      </div>
      <div class="col-md-3 text-center fs-4">
        <div class="counter-box">
        <CountUp end={340} duration="3" enableScrollSpy />
          <p>Staff</p>
        </div>
      </div>
      <div class="col-md-3 text-center fs-4">
        <div class="counter-box">
        <CountUp end={350} duration="3" enableScrollSpy />
          <p>Events</p>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}
export default Counter