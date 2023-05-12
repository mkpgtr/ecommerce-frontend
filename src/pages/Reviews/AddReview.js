import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Rating from '../../components/Rating/Rating';
import { useAuth } from '../../context/auth/authContext';
import { toast } from 'react-hot-toast';

const AddReview = () => {

const {id} = useParams()
const [product,setProduct] = useState()
const [rate,setRate]=useState(3)
const [review,setReview] = useState('')

const [auth] = useAuth()
const getDetailsOfProductToAddAReviewOn = async()=>{
    const {data} = await axios.get(`/product/getSingleProduct/${id}`)
    setProduct(data)
}

const handleAddReview = async(e)=>{
    e.preventDefault()

    const finalReview = {
        review:review,
        rating:rate,
        productId:id,
        addedBy:auth?.user?.email
    }

    
    const {data} = await axios.post(`/product/addReview/${id}`,finalReview)
    if(!data?.error){
      toast.success('Review Added Successfully')
    }else{
      toast.error(data?.error)
    }
}

console.log(rate)
useEffect(()=>{
    getDetailsOfProductToAddAReviewOn();
},[])
  return (
      <>
   <form className='w-50 mx-auto d-flex flex-column mt-5'>
    <div className='mx-auto'>

      <Rating rating={rate} style={{cursor:'pointer'}} onClick={(i)=>setRate(i+1)}  /> 
    </div>
    
      <textarea className='mt-5' name='review' type='text' rows={5} columns={10} value={review} onChange={(e)=>setReview(e.target.value)} />  
      <button className='p-3 fs-3' style={{borderRadius:"20px"}} onClick={handleAddReview}>Add review</button>

   </form>
    
    </>
  )
}

export default AddReview