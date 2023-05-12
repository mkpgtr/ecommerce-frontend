import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleReview = () => {

    const params =useParams()
    const [reviewId,setReviewId] = useState(params.id)
    const [review,setReview] = useState({})

    const getSingleReview = async()=>{
        const {data} = await axios.get(`/user/getSingleReview/${reviewId}`)
        console.log(data)
        setReview(data?.review[0])   
    }
    

    console.log(review)

    useEffect(()=>{
        getSingleReview()
    },[])
  return (
    <div>SingleReview 


    <span>{review.reviewText}</span>
   
    </div>
  )
}

export default SingleReview