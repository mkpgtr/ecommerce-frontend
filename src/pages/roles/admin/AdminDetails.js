import React from 'react'
import { useAuth } from '../../../context/auth/authContext'
import './AdminDashboard.css'

const AdminDetails = () => {

    const [auth,setauth] = useAuth();


  return (
    <div className='text-center outlet-component'>
        <h2>Name : {auth?.user.name}</h2>
        <h2>Role : {auth?.user.role}</h2>
        <h2>Email : {auth?.user.email}</h2>
    </div>
  )
}

export default AdminDetails