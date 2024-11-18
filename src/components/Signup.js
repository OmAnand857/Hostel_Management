import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useContext } from "react";
import { AuthProviderContext } from "./Context";
import { supabase } from "../index.js"
const Signup = () => {
    const navigate = useNavigate();
    const { user , setuser } = useContext(AuthProviderContext)
    const user_type = useParams().userType;
    const [user_input, set_user_input] = useState({
        email: "",
        password: "",
        confirm_password: "",
        role: "",
    });

    const handle_change = (e) => {
        set_user_input({ ...user_input, [e.target.name]: e.target.value });
    };

    const handle_submit = async (e) => {

        e.preventDefault();
        if (user_input.password !== user_input.confirm_password) {
            alert("Passwords do not match");
            return;
        }
        if (user_input.email === "" || user_input.password === "" || user_input.confirm_password === "" || user_input.role === "") {
            alert("Please fill all the fields");
            return;
        }
        const credentials = {
            email: user_input.email,
            password: user_input.password,
            role: user_input.role,
        };
        console.log(credentials.role)
        const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
          });
        if(error){
            alert( error.message )
        }else{

            const { data , error: updateError } = await supabase.auth.updateUser({
                data: {
                  role: credentials.role, 
                }
              });
          
              if (updateError) {
                console.log('Error updating user metadata: ', updateError.message);
              } else {
                alert("Success");
                setuser(data.user)
                navigate("/")
              }
        }

    };

    const handle_oauth = async (e) => {
        e.preventDefault();
        const PROVIDER = e.target.name
        window.localStorage.setItem("provider",PROVIDER)
        let { data, error } = await supabase.auth.signInWithOAuth({
            provider: PROVIDER
          })
          if(error){
            console.log(error)
          }else{
            alert("success")
          }

    }

    return (
        <main className="form-signin m-auto" style={{ maxWidth: "330px", padding: "1rem" }}>
            <form>
                <img  src={process.env.PUBLIC_URL + '/logo.jpg'} style={{ objectFit: "cover" }} alt="" width="72" height="72" />
                <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

                <div className="form-floating">
                    <input type="email" className="form-control mb-1" id="floatingInput" placeholder="name@example.com" required name="email" onChange={handle_change} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control mb-1" id="floatingPassword" placeholder="Password" required name="password" onChange={handle_change} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control mb-1" id="floatingConfirmPassword" placeholder="Confirm Password" required name="confirm_password" onChange={handle_change} />
                    <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>

                <div className="form-floating mb-1">
                    <select className="form-select" id="floatingRole" aria-label="Select Role" required name="role" onChange={handle_change}>
                        <option value="">Select Role</option>
                        <option value="hr">HR</option>
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                        <option value="guest">Guest</option>
                    </select>
                    <label htmlFor="floatingRole">Select Role</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit" onClick={handle_submit}>Sign Up</button>

                {/* Google and GitHub Login buttons */}
                <div className="mt-3 text-center">
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        name="google"
                        style={{ marginBottom: '10px', color: '#4285F4', borderColor: '#4285F4' }}
                        onClick={handle_oauth} 
                    >
                        Sign up with Google
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GitHubIcon />}
                        style={{ color: '#333', borderColor: '#333' }}
                        name="github"
                        onClick={handle_oauth} 
                    >
                        Sign up with GitHub
                    </Button>
                </div>

                <p className="text-body-secondary">Already have an account? <u><Link to="/signin">Sign In</Link></u></p>
                <p className="text-body-secondary">By signing in you agree to our <u>Terms and Conditions</u> and <u>Privacy Policy</u></p>
                <p className="text-body-secondary">2024–2025</p>
            </form>
        </main>
    );
};

export default Signup;
