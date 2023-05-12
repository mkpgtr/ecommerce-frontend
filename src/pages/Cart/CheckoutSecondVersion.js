import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import { CartState } from '../../context/cart/Context'

const CheckoutSecondVersion = () => {

    const {state:{cart,total},fixedShipping,dispatch} = CartState();
    const [auth] = useAuth()
    const [cartDetailsFromBackend,setCartDetailsFromBackend] = useState()
    const [finalOrder,setFinalOrder] = useState()
    const [boolSwitch,setBoolSwitch] = useState(false)
    const navigate = useNavigate();
    const [count,setCount] = useState(0)



   
    const handleNo = () =>{
        toast.success('Please continue your shopping')
        navigate('/all-products')
    }

    const createOrder = (total,shipping)=>{

     console.log('createOrder')

     const order = {
        user:auth?.user?.email,
        cart : cartDetailsFromBackend,
        amount : total + shipping
     }

     console.log(order)

     setFinalOrder(order)

    

     
  
    }
    
    const sendRequestToBackendToPlaceOrder = async(final_order)=>{
        if(!final_order){
            return
        }
    
       try {
        const {data} = await axios.post(`/user/placeOrder/${auth?.user?.email}`,final_order)
        console.log(data)

        if(!data?.orderPlaced){
           return toast.error('an error occured please try later');
        }else{
            toast.success('Your order has been placed successfully');
           
           
            dispatch({
                type:"REMOVE_ALL_CART_ITEMS",
                payload:JSON.parse(localStorage.getItem('cartItems')).filter((singleProduct)=>{
                    return singleProduct?.addedBy!==auth?.user?.email && singleProduct
                }).filter((x)=>{
                    return x!==undefined
                  })
            })
            setTimeout(() => {
                navigate('/dashboard/user/orders')
            }, 2000);
        }
       } catch (error) {
        console.log(error)
       }
       setFinalOrder(null)
    }

    
    const getCurrentUserCartDetails = async()=>{
        const {data} = await axios.get(`/user/getCartDetails/${auth?.user?.email}`)

        if(!data?.error){
            setCartDetailsFromBackend(data?.cart)
            return data
        }
        else{
            console.log(data?.error)
        }
        
    }
    
    console.log(cartDetailsFromBackend,'cartDetails from backend')
    
    useEffect(()=>{
        getCurrentUserCartDetails()
    },[cart])

    

    
    const placeOrder = (total,shipping)=>{
         getCurrentUserCartDetails()
         createOrder(total,shipping)
        
    }
    

    useEffect(()=>{
        sendRequestToBackendToPlaceOrder(finalOrder)
    },[finalOrder])
    

  
  return (
    <>
   <table class="table text-center">
  <thead>
    <tr style={{fontSize:"1.8rem"}}>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Category</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Item Total</th>
    </tr>
  </thead>
  <tbody>
   {cart && cart.map((singleProduct,index)=>{
    return  <tr  style={{fontSize:'1.5rem'}}  className='text-center'>
    <th scope="row">{index+1}</th>
    <td>{singleProduct?.name}</td>
    <td>{singleProduct?.category?.name}</td>
    <td>{cart?.map((singleCartProduct)=>{
        return singleCartProduct?.name === singleProduct?.name && singleCartProduct
        ?.qty
    })}</td>
    <td>&#8377;{singleProduct?.price}</td>
    <td>&#8377;{cart?.map((singleCartProduct)=>{
        return singleCartProduct?.name === singleProduct?.name && singleCartProduct
            ?.qty * singleProduct?.price
    }) }</td>
  </tr>
   })}
  <tr>
    <th scope="row" ></th>
    <td></td>
    <td style={{fontWeight:"bold",fontSize:"1.7rem"}}></td>
    <td style={{fontWeight:"bold",fontSize:"1.7rem"}}></td>
    <td style={{fontWeight:"bold",fontSize:"1.7rem"}}>Total(incl. Shipping+&#8377;{fixedShipping})</td>
    <td style={{fontWeight:"bold",fontSize:"1.7rem"}}>&#8377;{total+fixedShipping}</td>
  
  </tr>
    
  </tbody>
</table>
    <div className='border border-dark d-flex flex-column justify-content-center gap-3 fs-3 p-3'>
        <button onClick={()=>placeOrder(total,fixedShipping)} style={{backgroundColor:"rgba(170, 92, 52, 0.916)",color:"lightgoldenrodyellow", width:"50%",margin:"0 auto",borderRadius:"20px"}}>Place Order</button>
        <button onClick={()=>navigate('/dashboard/cart')} style={{backgroundColor:"rgba(170, 92, 52, 0.916)",color:"lightgoldenrodyellow", width:"50%",margin:"0 auto",borderRadius:"20px"}}>Edit Cart</button>
        <button onClick={handleNo} style={{backgroundColor:"rgba(170, 92, 52, 0.916)",color:"lightgoldenrodyellow", width:"50%",margin:"0 auto",borderRadius:"20px"}}>No. I want to keep shopping!</button>
    </div>
    </>
  )
}

export default CheckoutSecondVersion