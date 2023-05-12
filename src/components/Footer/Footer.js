import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <footer>
   <div>
  <div className="row flex-column align-items-center flex-md-row flex-lg-row">
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="footer-women card w-100">
        {/* ! using a bootstrap card for a footer */}
        <ul className="list-group list-group-flush text-center">
          <NavLink to="/men/all-products"><h4 className="footer-heading card-header text-center">Men</h4></NavLink>
          <li className="list-group-item"><NavLink to="/men/hoodies">Hoodies</NavLink></li>
          <li className="list-group-item"><NavLink to="/men/pants">Pants</NavLink></li>
          <li className="list-group-item"><NavLink to="/men/shirts">Shirts</NavLink></li>
        </ul>
      </div>
    </div>
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="footer-men card w-100">
        <ul className="list-group list-group-flush text-center">
        <NavLink to="/women/all-products"><h4 className="footer-heading card-header text-center">Women</h4></NavLink>
          <li className="list-group-item"><NavLink to="/women/dresses">Dresses</NavLink></li>
          <li className="list-group-item"><NavLink to="/women/pants">Pants</NavLink></li>
          <li className="list-group-item"><NavLink to="/women/skirts">Skirts</NavLink></li>
        </ul>
      </div>
    </div>
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="footer-kids card w-100">
        <ul className="list-group list-group-flush text-center">
          <NavLink to="/kids/all-products"><h4 className="footer-heading card-header text-center">Kids</h4></NavLink>
        </ul>
      </div>
    </div>
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className=" card w-100">
        <h4 className="footer-heading text-center card-header">Links</h4>
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item"><NavLink to="/">Home</NavLink></li>
          <li className="list-group-item"><NavLink to="/login">Login</NavLink></li>
          <li className="list-group-item"><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </div>
  </div>
  <div className="row copyright-row d-flex justify-content-around">
    <div className="col-12 col-md-6 col-lg-6 copyright-col d-flex justify-content-around align-items-items">
      <span>Copyright © Diamond8 2022-23</span>
    </div>
  </div>
</div>

    </footer>
  )
}

export default Footer