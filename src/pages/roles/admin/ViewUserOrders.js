import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewUserOrders = () => {

  const [allOrders,setAllOrders] = useState()

  const getAllOrders = async()=>{
    const {data} = await axios.get('/user/getAllOrders')

    console.log(data)
    setAllOrders(data?.orders)
  }

  console.log(allOrders)
  useEffect(()=>{
    getAllOrders()
  },[])
  return (
    <div>ViewUserOrders {allOrders?.map((singleOrder)=>{
      return <div>

        <span>{singleOrder.delivery_status}</span>
        </div> 
    })}</div>
  )
}

export default ViewUserOrders