import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import kanharImage from '../static/assets/kanhar.webp'; 
import gopadImage from '../static/assets/Gopad.webp';  
import indravatiImage from '../static/assets/Indravati.webp'; 
import Navbar from './Navbar.js';
import Footer from "./Footer.js"

const HostelsPage = () => {
    const location = useLocation();

    // Refs to each hostel section
    const kanharRef = useRef(null);
    const gopadRef = useRef(null);
    const indravatiRef = useRef(null);

    // Scroll to the correct section when the component mounts or when the location changes
    useEffect(() => {
        const hash = location.hash;
        if (hash === '#kanhar' && kanharRef.current) {
            kanharRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (hash === '#gopad' && gopadRef.current) {
            gopadRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (hash === '#indravati' && indravatiRef.current) {
            indravatiRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const sectionStyle = {
        borderRadius: '10px',
        boxShadow: '0 7px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#F3F2F8',
        padding: '20px',
        marginBottom: '40px',
    };

    const imageStyle = {
        border: '8px solid #CECAE2',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        marginLeft: '20px',
    };

    const textStyle = {
        color: '#333',
        lineHeight: '1.8',
    };

    return (

        <>
        <Navbar />
        <div className="container py-5">
            {/* Kanhar Hostel Section */}
            <div ref={kanharRef} style={sectionStyle} className="d-flex flex-md-row flex-column align-items-center">
                <div className="col-md-6" style={textStyle}>
                    <h2>Kanhar Hostel (BH1)</h2>
                    <p>
                        Kanhar Hostel is a boys' hostel at IIT Bhilai. It has a capacity of 
                        476 students, with an additional 12 reserved for Persons with Disabilities (PWD).
                        The hostel is well-ventilated and furnished with a separate bed, study table, 
                        chair, and an almirah for each student. The premises are air-conditioned, 
                        Wi-Fi enabled, and have 24x7 internet access.
                    </p>
                    <a class="btn btn-primary" href="/status?section=room-availability">Check Room Availability</a>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <img src={kanharImage} alt="Kanhar Hostel" className="img-fluid" style={imageStyle} />
                </div>
            </div>

            {/* Gopad Hostel Section */}
            <div ref={gopadRef} style={sectionStyle} className="d-flex flex-md-row flex-column align-items-center">
                <div className="col-md-6" style={textStyle}>
                    <h2>Gopad Hostel (BH2)</h2>
                    <p>
                        Gopad Hostel is another boys' hostel at IIT Bhilai, with a capacity of 
                        486 students and 12 additional rooms for Persons with Disabilities (PWD).
                        The hostel provides a congenial environment to pursue studies, with each 
                        room equipped with a bed, study table, chair, and storage. The entire hostel 
                        is Wi-Fi enabled and air-conditioned, providing a comfortable living space.
                    </p>
                    <a class="btn btn-primary" href="/status?section=room-availability">Check Room Availability</a>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <img src={gopadImage} alt="Gopad Hostel" className="img-fluid" style={imageStyle} />
                </div>
            </div>

            {/* Indravati Hostel Section */}
            <div ref={indravatiRef} style={sectionStyle} className="d-flex flex-md-row flex-column align-items-center">
                <div className="col-md-6" style={textStyle}>
                    <h2>Indravati Hostel (GH1)</h2>
                    <p>
                        Indravati Hostel is a girls' hostel at IIT Bhilai, accommodating up to 
                        316 students, with an additional 8 rooms for Persons with Disabilities (PWD).
                        Each room is fully furnished with essential amenities like a bed, study 
                        table, chair, and wardrobe. The hostel environment is friendly and supportive, 
                        and students have access to air conditioning, Wi-Fi, and 24/7 internet facilities.
                    </p>
                    <a class="btn btn-primary" href="/status?section=room-availability">Check Room Availability</a>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <img src={indravatiImage} alt="Indravati Hostel" className="img-fluid" style={imageStyle} />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default HostelsPage;
