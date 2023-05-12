import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Login.css'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';





const loginObject = {
  email:'',
  password:''
}


const Login = () => {

  const [loginDetails,setLoginDetails] = useState(loginObject);
  
  const [auth,setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation()
  console.log(location)

  
useEffect(()=>{
  window.scrollTo(0,0)
})

  const handleChange = (e)=>{
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
    console.log(loginDetails)
  }

  const sendLoginRequestToBackend = async()=>{
    console.log('send login request');

    try {
      const {data} = await axios.post("/auth/login",{ 
      email:loginDetails.email,password:loginDetails.password
    })

    console.log(data)

    if(data?.error){
      toast.error(data?.error);
    }
    else{
      localStorage.setItem('auth',JSON.stringify(data));
      setAuth({
        ...auth,token:data?.token,user:data?.user
      })
      toast.success('User Logged in Succesfully');
      navigate(location.state || `/dashboard/${data?.user?.role === 'admin' ? 'admin':'user'}`);
    }
      
    } catch (error) {
      // !when we send the status code as 400, it automatically is perceived as an error and is caught in the catch block.
      toast.error(error.response.data.error)
    }
    
  }

 
  return (
 <form id="myForm" className>
  <div className="container">
    
    <div className="row form flex-column align-items-center justify-content-center">
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <h2 className="text-center login-title">Login</h2>
        <h4 className="alert-msg text-center" />
        <label htmlFor="email" className="email-label">
          E-mail
          <i className="fa fa-envelope mail-icon" />
        </label>
        <input type="email" onChange={handleChange} name="email" id="email" placeholder="Enter your e-mail" />
      </div>
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <label htmlFor="password" className="password-label">
          Password
          <i className="fa fa-key password-icon" />
        </label>
        <input type="password" onChange={handleChange} name="password" id="password" placeholder="Enter your password" />
      </div>
      <div className="col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-around">
        <button type="button" onClick={()=>sendLoginRequestToBackend()} className="submit-btn">Login</button>
        <NavLink to='/register' className=" text-center h2 text-decoration-none">Not A Member? Register!</NavLink>
      </div>
    </div>
  </div>
  {/* <pre>
            {JSON.stringify(auth,null,4)}
        </pre> */}
</form>

  )
}

export default Login