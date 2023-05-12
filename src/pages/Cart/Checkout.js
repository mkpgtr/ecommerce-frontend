import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import axios from 'axios';
import { useAuth } from '../../context/auth/authContext';
import DropIn from "braintree-web-drop-in-react";
import { CartState } from '../../context/cart/Context';





const Checkout = () => {

    const [clientToken,setClientToken] = useState();
    const [auth,setAuth] = useAuth()
    const {state:{cart}} = CartState()

    const [instance,setInstance] = useState('')



    useEffect(()=>{
        if(auth?.token){
            getClientToken()
        }
    },[])



    const getClientToken = async()=>{
        try {
            const {data} = await axios.get('product/braintree/token');
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error)
        }
    }

    const handlePayment = async()=>{
        const {nonce} = await instance.requestPaymentMethod()
        console.log(nonce)
    }
    return ( 
        <>
       <h1>{!clientToken || !cart.length ?  "" : (
           <>
           <DropIn options={{
            authorization:clientToken,
            paypal:{
                flow:"vault"
            }
           }}
           onInstance={(instance)=>setInstance(instance)}
           />
       <button onClick={()=>handlePayment()}>Buy NOW</button>
        </>
       )}</h1>
           </>
    ); 
}

export default Checkout