import axios from 'axios'
import React, { useEffect, useState } from 'react'


const ViewUsers = () => {

  const [allUsers,setAllUsers] = useState([])

  const getAllUsers = async(req,res)=>{
    const {data} = await axios.get('/user/getAllUsers')

    console.log(data)
  }

  useEffect(()=>{
    getAllUsers()
  },[])
  return (
    <div>ViewUsers</div>
  )
}

export default ViewUsers