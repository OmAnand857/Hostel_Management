import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { supabase } from "../index"
import { useContext } from "react"
import { AuthProviderContext } from "./Context"
function Login(){

    const user_type = useParams().userType
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const { user , setuser } = useContext(AuthProviderContext)

    useEffect(() => {
      if (user && user?.type==="admin") {
        // If the user state is updated, navigate to /admin
        navigate("/admin");
      }
    }, [user, navigate]);

    const handle_mail = (e)=>{
        setEmail(e.target.value)
    }
   
    const handle_pass = (e)=>{
        setPassword(e.target.value)
    }

    const handle_login = async (e)=>{

        e.preventDefault()


        const credentials = {
            email : email,
            password : password
        }

        if( email === "" || password === "" ){
            alert("Please fill all the fields")
            return
        }

        let { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })
        if(error){
            alert( error.message )
        }else{
            alert("success")
            setuser(data.user)
            navigate("/")
        }

    }

    // ADMIN LOGIN

    const handle_admin_login = async (e)=>{
        e.preventDefault()
        const credentials = {
            email : email,
            password : password
        }
        if( email === "" || password === "" ){
            alert("Please fill all the fields")
            return
        }
        try{const result = await axios.post("http://localhost:5173/admin/login",credentials)
        if( result.status === 200 ){
            alert("success")
            setuser(result.data)
            localStorage.setItem("admin",JSON.stringify(result.data))
        }
      }
        catch(error){
            alert( error.response.data.message )
        }
    }

 



    return(

        <main class="form-signin  m-auto" style={{maxWidth:"330px",padding:"1rem"}}>
        <form>
          <img class="mb-4" src="/logo.jpg" style={{objectFit:"cover"}} alt="" width="72" height="72"/>
          <h1 class="h3 mb-2 fw-normal">Please sign in</h1>
      
          <div class="form-floating">
            <input type="email" class="form-control mb-3" id="floatingInput"  placeholder="name@example.com" onChange={handle_mail} required/>
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating" >
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  onChange={handle_pass} required/>
            <label for="floatingPassword">Password</label>
          </div>
      
          <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button class="btn btn-primary w-100 py-2" type="submit" onClick={ user_type === "admin" ? handle_admin_login : handle_login}>Sign in</button>
          { user_type !== "admin" &&
          <>   
          <p class=" mt-3 text-body-secondary mb-0">Don't have an account? <u><Link to={`/auth/create_account/${user_type}`}>Create New Account</Link></u></p>
          <p class=" text-body-secondary"> 2024–2025</p>
          </>       
          }

        </form>
      </main>

    )
}

export default Login