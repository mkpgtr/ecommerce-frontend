import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/auth/authContext.js' 
import './AdminDashboard.css'

const AdminDashboard = () => {

  const [auth,setAuth] = useAuth()


  return (

    <>

    <div class="dashboard-container container-fluid mt-5">
      <div class="row border border-dark align-items-center justify-content-lg-around flex-column flex-md-row flex-lg-row">
        <div class="col-9 col-md-6 col-lg-4 border border-dark text-center dashboard-links d-flex flex-md-column flex-lg-column flex-md-row flex-sm-row">
          <NavLink  to=''><h3>Admin Details</h3></NavLink>
          <NavLink  to='add-product'><h3>Add Product</h3></NavLink>
          <NavLink  to='all-products'><h3>All Products</h3></NavLink>
          <NavLink  to='add-category'><h3>Add Category</h3></NavLink>
          <NavLink  to='view-reviews'><h3>View User Reviews</h3></NavLink>
          <NavLink  to='view-orders'><h3>View User Orders</h3></NavLink>
          <NavLink  to='view-users'><h3>View All Users</h3></NavLink>
        </div>
        <div class="col-9 col-md-6 col-lg-7 border border-dark">
          {/* ! tHIS IS  THE COMPONENT THAT GETS CALLED WHEN THE NESTED ROUTE IS HIT */}
          {<Outlet/>}
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard