import React from 'react';
import { Building2, GraduationCap, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useContext } from 'react';
import { AuthProviderContext } from './Context';
import { supabase } from '../index.js';
import { useNavigate } from 'react-router-dom';

function Modal({modal_prop}) {

  const { user , setuser } = useContext(AuthProviderContext);
  const navigate = useNavigate()
  const modal_style = {
    
      backdropFilter: 'blur(1px)', /* Optional: adds a blur effect to the background */
      zIndex: '1050' /* Ensure it's above other content */
    
  }
  const handle_logout = async () => {
    if(!user){
      alert("Please login first")
      return
    }
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    }
    setuser(null)
    localStorage.clear()
    navigate("/")
  }
  // ... (rest of the code remains the same)

  return (
    // ... (rest of the JSX remains the same)
    <div class="modal  modal-sheet position-fixed d-block  p-4 py-md-5" tabindex="-1" role="dialog" id="modalChoice" style={modal_style}>
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-body p-4 text-center">
            <h5 class="mb-0">Do you want to Logout ?</h5>
            <p class="mb-0">You will lose all your progress and redirect to home page</p>
          </div>
          <div class="modal-footer flex-nowrap p-0">
            <button type="button" class="btn text-red btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end" onClick={handle_logout}><strong>Logout</strong></button>
            <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 py-3 m-0 rounded-0" data-bs-dismiss="modal" onClick={() => modal_prop(false)}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal