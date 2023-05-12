import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import { CartState } from '../../context/cart/Context'
import { toast } from 'react-hot-toast';

const Skirts = () => {

  const {state:{products,cart},dispatch,shuffle} = CartState();

  const [auth] = useAuth()
  const [allWomenProducts,setAllWomenProducts] = useState([])
  const [skirts,setSkirts] = useState([])
  const [selectOption,setSelectionOption] = useState()
  // console.log(products);

  const location = useLocation()
  const navigate = useNavigate()

  

  
 const TOTAL_ITEMS_PER_PAGE = 7
  

 const [filteredProducts,setFilteredProducts] = useState([])
 const [totalPages,setTotalPages] = useState()

 // setFilteredProducts(filterProducts)
 
 // console.log(filterProducts)
 
 
 const setThePageUp = ()=>{
   const filterProducts = skirts.slice(0,TOTAL_ITEMS_PER_PAGE)
   setFilteredProducts(filterProducts)
   setTotalPages(Math.ceil(skirts.length/TOTAL_ITEMS_PER_PAGE))
 }

 useEffect(()=>{
   setThePageUp()
 },[skirts])

 const handlePageButtonClick = (pageNumber) => {
   // 1-20, 21-40, 41-60, 61-80
   const startOffset = TOTAL_ITEMS_PER_PAGE * pageNumber - TOTAL_ITEMS_PER_PAGE;
   const endOffset = TOTAL_ITEMS_PER_PAGE * pageNumber;
   const filterProducts = skirts.slice(startOffset, endOffset);
   setFilteredProducts(filterProducts);
 };

 
 

  useEffect(()=>{
    if(filteredProducts && selectOption){
    
      console.log('from useEffect')
      if(selectOption==='lowest-to-highest'){
        setFilteredProducts(filteredProducts.sort((a,b)=>{
          return a.price - b.price
        }))
      }
      if(selectOption==='random'){
        console.log(shuffle(skirts),'shuffle womenPants')
        setFilteredProducts(shuffle(filteredProducts))
       
      }
      if(selectOption==='Random'){
        console.log(shuffle(skirts),'shuffle womenPants')
        setFilteredProducts(shuffle(filteredProducts))
       
      }
      if(selectOption==='highest-to-lowest'){
        setFilteredProducts(filteredProducts.sort((a,b)=>{
          return b.price - a.price
        }))
      }

    }
    setSelectionOption('')
  },[selectOption,filteredProducts])


  useEffect(()=>{
    setSkirts(products.filter(p=>p.category.slug==='women-skirts'))
  },[products])


  const handleSelectChange = (e)=>{
    if(selectOption==='random'){
      console.log('here')
      setSelectionOption('Random')

      // ! batao isme selectOption ka value kya hoga?
    }

    if(selectOption==='Random'){
      setSelectionOption('random')
    }
    console.log(e.target.value)

    setSelectionOption(e.target.value)
   
  }

  const handleAddToCartWithoutLoggedInUser = ()=>{
    toast.error('Please login before adding to cart')

    setTimeout(() => {
      navigate('/login');
    }, 2000);

  }




  

  return (
    <>
    <div style={{margin:"0 calc(50% - 2%)"}}>
    <select onChange={handleSelectChange}>
    <option onClick={()=>setSelectionOption('Random')}  value="random">Random</option>
      <option value="lowest-to-highest">ascending</option>
      <option value="highest-to-lowest">descending</option>
   
    </select>
    </div>
   <section className="men-products products container">
     <div className="row justify-content-around flex-wrap align-items-center ">
     <h1 className="section-title text-center">{location.pathname.slice(1)}</h1>
     { auth?.user?.email &&  filteredProducts ? filteredProducts.map((singleProduct)=>{
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
       
       }):filteredProducts.map((singleProduct)=>{
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
      </div>
      {totalPages > 1 &&  <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>}
   
      </section> 
      </>
  )
}

export default Skirts