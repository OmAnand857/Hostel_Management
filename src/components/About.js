import React from 'react';
import Footer from "./Footer.js"
function About() {

    return (
        <>
        <div className="container py-2">
            <section className="text-center mb-5">
                <h1 className="display-4 fw-bold text-body-emphasis">About HostelPro</h1>
                <p className="lead mb-4">
                    Welcome to <strong>HostelPro</strong>, your one-stop platform for all things related to hostel accommodations at IIT Bhilai. Whether you’re a student looking for room bookings, need detailed information on hostel amenities, or simply want to stay updated on hostel-related news, HostelPro is here to serve your needs.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="h3 text-primary">Our Mission</h2>
                <p className="text-secondary">
                    HostelPro was created with a simple mission: to streamline the hostel experience for students of IIT Bhilai. We’re dedicated to making hostel life easier, providing detailed insights into available rooms, facilities, and essential amenities. We aim to bring transparency, ease, and efficiency to the hostel management and booking process.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="h3 text-primary">What We Offer</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Room Booking:</strong> Find and book available rooms quickly and easily, with real-time updates on availability.</li>
                    <li className="list-group-item"><strong>Hostel Information:</strong> Explore in-depth details about each hostel, including facilities, rules, and important contacts.</li>
                    <li className="list-group-item"><strong>Personalized Recommendations:</strong> Based on your preferences, we provide recommendations for the most suitable hostels and rooms.</li>
                </ul>
            </section>
        </div>
        
        <hr className="my-5" />

        <div className="container py-2">
            <section className="mb-5">
                <h2 className="h3 text-primary text-center">Meet the Team</h2>
                <p className="text-secondary text-center mb-4">
                    Our team is a passionate group of IIT Bhilai students who understand the importance of a comfortable, well-informed hostel life. We work closely with the administration to ensure that HostelPro meets your expectations and provides reliable, up-to-date information.
                </p>

                <div className="row text-center">
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img src="https://via.placeholder.com/150" alt="Team Member 1" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Om Anand</h5>
                                <p className="card-text">Specialization: [e.g., Frontend Development]</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img src="https://via.placeholder.com/150" alt="Team Member 2" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Gaurav Kumar</h5>
                                <p className="card-text">Specialization: [e.g., Backend Development]</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img src="https://via.placeholder.com/150" alt="Team Member 3" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Lakshay Gupta</h5>
                                <p className="card-text">Specialization: [e.g., UI/UX Design]</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="text-center">
                <p className="text-secondary">
                    Thank you for choosing HostelPro. We’re excited to support your hostel journey at IIT Bhilai. Feel free to reach out with feedback or suggestions, as we’re always here to improve your experience.
                </p>
                <p className="font-italic text-primary">With gratitude,</p>
                <p className="font-weight-bold text-primary">The HostelPro Team</p>
            </section>
        </div>
        <hr className="my-5" />
        <Footer />
        </>
    );



}

export default About