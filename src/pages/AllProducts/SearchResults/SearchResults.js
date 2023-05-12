import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useSearch } from '../../../context/search/searchContext';
import { useAuth } from '../../../context/auth/authContext';
import { CartState } from '../../../context/cart/Context';
import { toast } from 'react-hot-toast';


const SearchResults = () => {
    const [values,setValues] = useSearch();
    const [auth] = useAuth()
    const {state:{products,cart},dispatch} = CartState()

    const navigate = useNavigate()

    const handleAddToCartWithoutLoggedInUser = ()=>{
      toast.error('Please login before adding to cart')
  
      setTimeout(() => {
        navigate('/login');
      }, 2000);
  
    }
  return (
    <>
   <section className="men-products products container">
     <div className="row justify-content-around flex-wrap align-items-center ">
   
       <h1 className="section-title text-center">All Products</h1>
      
   
       { auth?.user?.email &&  values?.results?.length > 0 ? values?.results?.map((singleProduct)=>{
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
       
       }):values?.results?.map((singleProduct)=>{
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

       {/* ! when the search box is emptied using backspace, once there is nothing left in searchBox, it will redirect to all-product. This gives a feeling of reseting to defaults */}

       {!values?.keyword && navigate('/all-products')}
    
    </div>
  </section>
    </>
  )
}


export default SearchResults