import React, { useEffect,useState } from 'react'
import './MenWomenKidsCSS/Styles.css'
import './MenWomenKidsCSS/Men.css'
import './MenWomenKidsCSS/Women.css'
import './MenWomenKidsCSS/Kids.css'
import Hoodies from '../Men/Hoodies'

import axios from 'axios'
import { useSearch } from '../../context/search/searchContext'
import { Link, useNavigate } from 'react-router-dom'
import { CartState } from '../../context/cart/Context'
import { useAuth } from '../../context/auth/authContext'
import {toast} from 'react-hot-toast'
import Rating from '../../components/Rating/Rating'
const AllProductsPublic = () => {

  // ! coming from the backend
  // const [products,setProducts] = useState([]);
 const {state:{products,cart},dispatch} = CartState()



 const [auth,setAuth] = useAuth()

 const navigate = useNavigate()

 

 
 const TOTAL_ITEMS_PER_PAGE = 8
  
  const [values,setValues] = useSearch();

  const [filteredProducts,setFilteredProducts] = useState([])
  const [totalPages,setTotalPages] = useState()

  // setFilteredProducts(filterProducts)
  
  // console.log(filterProducts)
  
  
  const setThePageUp = ()=>{
    const filterProducts = products.slice(0,TOTAL_ITEMS_PER_PAGE)
    setFilteredProducts(filterProducts)
    setTotalPages(Math.ceil(products.length/TOTAL_ITEMS_PER_PAGE))
  }

  useEffect(()=>{
    setThePageUp()
  },[products])

  const handlePageButtonClick = (pageNumber) => {
    // 1-20, 21-40, 41-60, 61-80
    const startOffset = TOTAL_ITEMS_PER_PAGE * pageNumber - TOTAL_ITEMS_PER_PAGE;
    const endOffset = TOTAL_ITEMS_PER_PAGE * pageNumber;
    const filterProducts = products.slice(startOffset, endOffset);
    setFilteredProducts(filterProducts);
  };
 

  // ! first step: 
  // 1. store all the products in one variable. allProducts
  // 2. filter first five : divide number of products / 5. : products per page
  // 3. 

  const handleAddToCartWithoutLoggedInUser = ()=>{
    toast.error('Please login before adding to cart')

    setTimeout(() => {
      navigate('/login');
    }, 2000);

  }
  
  console.log(auth)
  return (
    <>
   
   <section className="men-products products container">
     <div className="row justify-content-around flex-wrap align-items-center ">
     <div className='pagination' style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>
       <h1 className="section-title text-center">All Products</h1>
      
   
   {/*  populate  */}
       { auth?.user?.email &&  filteredProducts ? filteredProducts.map((singleProduct)=>{
         return  <Link to={`/single-product/${singleProduct._id}`} className="col-12 col-md-6 col-lg-3 single-product mb-5">
         <div className="card w-100 overflow-hidden">
           <img src={singleProduct.photo} className="card-img-top" alt="..." />
           <div className="card-body   overflow-y-auto">
             <h3 className="item-price">&#8377;{singleProduct.price}</h3>
             <h5 className="card-title">{singleProduct.name}</h5>
             <p className="card-text">{singleProduct.description}</p>

             {
              auth?.user?.email && 
             cart.some(product=>product._id===singleProduct._id && product?.addedBy === auth?.user?.email) 
             ? 
             <Link onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:{product:singleProduct,totalledBy:auth?.user?.email}})} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> 
             <i className="fa fa-cart-shopping" /> Remove FROM Cart</Link>
              : 
              <Link onClick={()=>dispatch({type:"ADD_TO_CART",payload:{product:singleProduct,addedBy:auth?.user?.email,totalledBy:auth?.user?.email}})} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</Link>  
            }
           
           </div>
         </div>
       </Link>
       
       }):filteredProducts.map((singleProduct)=>{
        return   <Link to={`/single-product/${singleProduct._id}`} className="col-12 col-md-6 col-lg-3 single-product mb-5">
        <div className="card w-100 overflow-hidden">
          <img src={singleProduct.photo} className="card-img-top" alt="..." />
          <div className="card-body   overflow-y-auto">
            <h3 className="item-price">&#8377;{singleProduct.price}</h3>
            <h5 className="card-title">{singleProduct.name}</h5>
            <p className="card-text">{singleProduct.description}</p>
            <Link onClick={()=>handleAddToCartWithoutLoggedInUser()} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> 
             <i className="fa fa-cart-shopping" /> Add To Cart</Link>
          
          </div>
        </div>
      </Link>
       })}
    
    <div className='pagination' style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>

    
    </div>
    
  </section>
    </>
  )
}


export default AllProductsPublic