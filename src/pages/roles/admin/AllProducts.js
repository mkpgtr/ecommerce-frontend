import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth/authContext';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';

const AllProducts = () => {


  const [auth,setAuth] = useAuth();

  const [products,setProducts] = useState([])

  const navigate = useNavigate()

  const loadProducts = async()=>{
    const {data} = await axios.get('/product/getAllProducts')
    console.log(data)
    setProducts(data)
  }

  const sendDeleteRequestToBackendToDeleteProduct = async(productId)=>{

    let answer = window.confirm('Do you really want to delete this product?');

    if(!answer){
      return;
    }

    try {
      const {data} = await axios.delete(`/product/deleteProduct/${productId}`);
      toast.success(`product deleted successfully`);
      navigate('/dashboard/admin/all-products');
      loadProducts()
      window.location.reload(true)
      
    } catch (error) {
      console.log(error);
      toast.error('delete failed. try again')
    }




  }


  useEffect(()=>{
    loadProducts()
  },[])
  return (
    <>
    <h2 className='text-center'>All Products : {products.length}</h2>


<div  style={{height:"20rem",overflowY:"scroll"}}>
    {products?.map((singleProduct)=>{
      return <div> <Link to={`/dashboard/admin/product/${singleProduct._id}`} className='d-flex justify-content-center'>
        
       <div className='col-md-3'>
            <div class="img-container" style={{width:"4rem"}}>
              <img src={singleProduct.photo} style={{width:"100%"}}/>
            </div>
       </div>
       <div className='col-md-9'>
            Product details
       </div>
      </Link>
       <button onClick={()=>sendDeleteRequestToBackendToDeleteProduct(singleProduct._id)}>Delete Product</button>

      </div>
    })
    
    
    }
    </div>

    </>
  )
}

export default AllProducts

