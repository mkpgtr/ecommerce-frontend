import React, { useState } from 'react'
import { NavLink, useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useAuth } from '../../context/auth/authContext'


const registerObject = {
  name: '',
  email:'',
  password:'',
  username:''
}
const Register = () => {
  const [registerDetails,setRegisterDetails] = useState(registerObject);

  const navigate = useNavigate()

  const [auth,setAuth] = useAuth();

  const location = useLocation();

  const handleChange = (e)=>{
    setRegisterDetails({...registerDetails,[e.target.name]:e.target.value})
  }

  const sendRegistrationDetailsToTheBackend= async()=>{
    console.log('send register request');

    try {
      const {data} = await axios.post("/auth/register",{ 
      name:registerDetails.name,email:registerDetails.email,password:registerDetails.password

    })
    console.log(data);

    if(data?.error){
      toast.error(data.error);
    }
    else{
      localStorage.setItem('auth',JSON.stringify(data));
      setAuth({
        ...auth,token:data?.token,user:data?.user
      })
      toast.success('User Registered Succesfully');
      navigate(location.state || `/dashboard/${data?.user?.role === 'admin' ? 'admin':'user'}`);
    }

    
      
    } catch (error) {
      console.log(error);
    }

    

   
  }


  return (
 <form id="myForm" className>
  <div className="container">
    <div className="row form flex-column align-items-center justify-content-center">
    <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <h2 className="text-center login-title">Register</h2>
        <label htmlFor="Name" className="password-label">
          Name
          <i className="fa fa-user password-icon" />
        </label>
        <input type="text" onChange={handleChange} name="name" id="name" placeholder="Enter your Name" />
      </div>
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <h4 className="alert-msg text-center" />
        <label htmlFor="email" className="email-label">
          E-mail
          <i className="fa fa-envelope mail-icon" />
        </label>
        <input type="email" onChange={handleChange} name="email" id="email" placeholder="Enter your e-mail" />
      </div>
      
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <label htmlFor="password" className='password-label'>
          Password
          <i className="fa fa-key password-icon" />
        </label>
        <input type="password" onChange={handleChange} name="password" id="password" placeholder="Enter your password" />
      </div>
  
      
      
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <button type="button" onClick={()=>sendRegistrationDetailsToTheBackend()} className="submit-btn">Register</button>
        <NavLink to='/login' className=" text-center h2 text-decoration-none">Already A Member? Login!</NavLink>
      </div>
    </div>
  </div>
</form>

  )
}

export default Register