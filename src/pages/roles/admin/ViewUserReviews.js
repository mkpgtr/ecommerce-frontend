import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {Link} from 'react-router-dom'

const ViewUserReviews = () => {

    const [allReviews,setAllReviews] = useState([])
    const getAllReviews = async(req,res)=>{
        const {data} = await axios.get('/user/getAllReviews')
        console.log(data?.reviews)

        if(data?.error){
            return toast.error(data?.error)
        }

        if(data?.reviews){
            setAllReviews(data?.reviews)
        }
    }

useEffect(()=>{
    getAllReviews()
},[])
  return (
    <>
    <div>ViewUserReviews  <div>
    <table class="table">
        
        
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Product Name</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    
   
        {allReviews?.map((singleReview,index)=>{
            return <>
                <tr>
      <th scope="row">{index+1}</th>
      <td>{singleReview?.addedBy?.name}</td>
      <td>{singleReview?.product?.name}</td>
      <td>{singleReview?.product?.category?.name}</td>
      <td><Link to={`/dashboard/admin/singleReview/${singleReview?._id}`}>See Review</Link></td>
    </tr>
            </>
        })}
        </tbody>
        </table>
        </div>
        </div>

        
  
    </>
  )
}

export default ViewUserReviews