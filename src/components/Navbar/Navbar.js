import React from 'react'
import './Navbar.css'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/authContext'
import SearchBox from '../SearchBox/SearchBox'



const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(navigate)

  const logOut = () => {
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth');

    navigate('/login')
    console.log('after navigate')
  }


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md bg-body-tertiary first-nav">
          <div className="container-fluid">
            {/* ! mx-lg-5 will give some margin from left side on large devices */}
            <NavLink className="navbar-brand" to="/">Diamond8</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            {/* ! these me,mx and my classes are quite confusing */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* !navbar collapse will open up when we go to the mobile view */}
              <SearchBox />
              <ul className="navbar-nav align-items-md-center ms-auto mb-lg-0 cart-n-loginbtn">
                <li className="nav-item dropdown">

                  {auth?.token ? 
                  <a className="nav-link active dropdown-toggle" style={{ 'cursor': 'pointer' }} aria-current="page">
                    <button className="btn btn-primary">{auth?.user.name}</button>
                    <ul className='dropdown-menu custom' style={{"background":"lightgoldenrodyellow"}}>
                      <li>

                    <NavLink className='nav-link text-light  dropdown-item' to={`/dashboard/${auth?.user.role==='admin'?'admin':'user'}`}>Dashboard</NavLink>
                      </li>
                      <li>

                    <a className='nav-link dropdown-item text-light' onClick={logOut}>Logout</a>
                      </li>
                  </ul>
                    </a> 
                  : <NavLink className="nav-link active" aria-current="page" to="/login"><button className="btn btn-primary">Login</button></NavLink>}
                  
                </li>
                <li className="nav-item d-flex align-items-center border border-dark">
                  <NavLink className="nav-link" to="dashboard/cart"><i className="fa-solid fa-cart-shopping" /></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* ! making these navbars was a really tiresome process. It's one thing to add classes to make navbar and entirely another thing to write your own classes in separate css file */}
        {/* ! bootstrap seems more confusing */}
        {/* ! second-nav class is used to select the first navigation bar that contains the clothes and dropdowns */}
        <nav className="navbar navbar-expand bg-body-tertiary second-nav">
          <div className="container-fluid">
            <div className="collapse d-flex justify-content-between navbar-collapse" id="navbarNav">
              <ul className="navbar-nav justify-content-around flex-wrap w-100">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/all-products">All Products</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Women
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/women/all-products">All</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/women/dresses">Dresses</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/women/pants">Pants</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/women/skirts">Skirts</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Men
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/men/all-products">All</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/men/hoodies">Hoodies</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/men/pants">Pants</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/men/shirts">Shirts</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/kids/all-products">Kids</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* ! finally I was able to pull it off and get the layout done for all screen sizes */}
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Navbar