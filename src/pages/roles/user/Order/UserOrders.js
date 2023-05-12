import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/auth/authContext'
import './Order.css'

const UserOrders = () => {

  const [orders,setOrders] = useState([])
  const [auth] = useAuth()
  const [productReviewsByThisUser,setProductReviewsByThisUser] = useState()
  const getUserOrders = async()=>{
    
    const {data} = await axios.get('/user/getUserOrders')
    console.log(data)
    if(data?.userOrders){
      setOrders(data?.userOrders)
    }
  }

  const getUserReviews =async()=>{
    const {data} = await axios.get(`/product/getUserReviews`);
    console.log(data?.reviewedProductIDs)
    setProductReviewsByThisUser(data?.reviewedProductIDs)

  }

  useEffect(()=>{
    getUserOrders()
    getUserReviews()
  },[])
  return (
    
   <div class="container border border-dark">
    <div class="row d-flex justify-content-between " style={{maxHeight:"30rem", overflowY:'scroll'}}>
      <div class="col-5 border border-dark d-flex flex-column" >
      <h3 className='text-center fw-bold'>
            Pending Orders
          </h3> 
        {
        orders.length > 0 && orders.map((singleOrder,index)=>{
          if(singleOrder.delivery_status==='pending'){
            // return <div>  
            //   <div>
            //    
            //   </div>
            //   </div>
            return   <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item custom-accordion">
              <h2 class="accordion-header" id={`#heading${index+1}`}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index+1}`} aria-expanded="false" aria-controls={`#collapse-${index+1}`} >
                  Order No. {index+1} <span className='ms-auto'>{singleOrder?.products?.length} Product(s)</span>
                 
                   <span className='ms-auto'> Rs.{singleOrder.amount}</span>
                   <span className='ms-auto'>  {moment(singleOrder?.delivery_date).endOf('day').fromNow()}</span>
                </button>
              </h2>
              <div id={`collapse-${index+1}`}  class="accordion-collapse collapse show" aria-labelledby={`#collapse-${index+1}`} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <div class='d-flex justify-content-around'> 
            <div class='d-flex flex-column  w-100'>
              {singleOrder.products.map((singleProduct)=>{
              return <div className='d-flex justify-content-between align-items-center p-3' style={{width:"100% !important" }}>
                <span className='product-name-in-accordion'>{singleProduct?.name}</span> 
                <span className='product-category-in-accordion'  style={{fontSize:"0.8rem",borderRadius:"5px",border:"1px solid lightgoldenrodyellow",padding:"0.5rem"}}>
                  {singleProduct?.category?.name === 'Women-Dresses' && 'Dress'}
                  {singleProduct?.category?.name === 'Women-Skirts' && 'Skirt'}
                  {singleProduct?.category?.name === 'Men-Hoodies' && 'Hoodie'}
                  {singleProduct?.category?.name === 'Men-Pants' && 'Pants/Trousers'}
                  {singleProduct?.category?.name === 'Men-Shirts' && 'Shirts'}
                  {singleProduct?.category?.name === 'Kids' && 'Kids'}
                  </span>

                
               
                
                </div>
            })} </div>
            </div>
                </div>
              </div>
            </div>
            </div>
          }
        })
      }</div>
      
      <div class="col-5  border border-dark"><div>
        <h3 className='text-center fw-bold'>
          Delivered Orders
        </h3>
        
        {
        orders.length > 0 && orders.map((singleOrder,index)=>{
          if(singleOrder.delivery_status==='delivered'){
            return <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item custom-accordion">
              <h2 class="accordion-header" id={`#heading${index+1}`}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index+1}`} aria-expanded="false" aria-controls={`#collapse-${index+1}`} >
                  Order No. {index+1} <span className='ms-auto'>{singleOrder?.products?.length} Product(s)</span>
                 
                   <span className='ms-auto'> Rs.{singleOrder.amount}</span>
                </button>
              </h2>
              <div id={`collapse-${index+1}`}  class="accordion-collapse collapse show" aria-labelledby={`#collapse-${index+1}`} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <div class='d-flex justify-content-around'> 
            <div class='d-flex flex-column border border-dark w-100'>
              {singleOrder.products.map((singleProduct)=>{
              return <div className='d-flex justify-content-between align-items-center border border-dark p-3' style={{width:"100% !important" }}>
                <span className='product-name-in-accordion'>{singleProduct?.name}</span> 
                <span className='product-category-in-accordion'  style={{fontSize:"0.8rem",borderRadius:"5px",border:"1px solid lightgoldenrodyellow",padding:"0.5rem"}}>
                  {singleProduct?.category?.name === 'Women-Dresses' && 'Dress'}
                  {singleProduct?.category?.name === 'Women-Skirts' && 'Skirt'}
                  {singleProduct?.category?.name === 'Men-Hoodies' && 'Hoodie'}
                  {singleProduct?.category?.name === 'Men-Pants' && 'Pants/Trousers'}
                  {singleProduct?.category?.name === 'Men-Shirts' && 'Shirts'}
                  {singleProduct?.category?.name === 'Kids' && 'Kids'}
                  </span>

                  {!productReviewsByThisUser.includes(singleProduct?._id) ? <Link className='' to={`/dashboard/user/products/addReview/${singleProduct._id}`}>
                  <span>Add A Review</span></Link> :  <Link className='' to={`/dashboard/user/products/viewReview/${singleProduct._id}`}>
                  <span>See your Review</span></Link> }

                  {/* <Link className='' to={`/dashboard/user/products/addReview/${singleProduct._id}`}>
                  <span>Add A Review</span></Link> */}
               
                
                </div>
            })} </div>
            </div>
                </div>
              </div>
            </div>
            </div>
           
      
          }
        })
      }
      </div>
      </div>
    </div>
   </div>
   
  
    )
  }


export default UserOrders