import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/auth/authContext.js'
import './UserDashboard.css'
import UserAccountDetails from './AccountDetails/UserAccountDetails.js'

const UserDashboard = () => {

  const [auth,setAuth] = useAuth()
  return (
    <div class="dashboard-container container-fluid mt-5">
      <div class="row border border-dark align-items-center justify-content-lg-around flex-column flex-md-column flex-lg-column">
        <div class="col-9 col-md-6 col-lg-4 border border-dark text-center dashboard-links d-flex flex-md-column flex-lg-column flex-md-row flex-sm-row">
          <NavLink  to='orders'><h3>Orders</h3></NavLink>
          <NavLink  to='account-details'><h3>Account Details</h3></NavLink>

        
        </div>
        <div class="col col-lg-12">

       <Outlet/>
        </div>
       
      </div>
    </div>
  )
}

export default UserDashboard