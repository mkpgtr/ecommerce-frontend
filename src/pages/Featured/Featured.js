import React, { useEffect, useState } from 'react'
import './Featured.css'
import axios from 'axios'

const Featured = () => {

  const [featuredProducts,setFeaturedProducts] = useState([])

  const getFeaturedProducts = async()=>{
    const {data} = await axios.get('/product/getFeaturedProducts')

    if(data?.featuredProducts){
      setFeaturedProducts(data?.featuredProducts)
    }

    console.log(data)
  }
  const handleAddToCartWithoutLoggedInUser = ()=>{
    toast.error('Please login before adding to cart')

    setTimeout(() => {
      navigate('/login');
    }, 2000);

  }

  useEffect(()=>{
    getFeaturedProducts()
  },[])
  return (
   <>
  {/* &lt;&gt; */}
  <section id="largeScreenSlider" className="carousel featured container-fluid p-0 slide large-screen-slider d-none d-md-none d-lg-block" data-ride="carousel">
    <h4 className="text-center">Featured products</h4>
    <div className="carousel-inner">
      <div className="carousel-item active border border-dark">
        <div className="container  four-item-slide">
          <div className="row flex-nowrap  border border-dark d-flex justify-content-around">
            {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 > 0 && index+1 <=4){
                return <div className="col-12 col-md-6 col-lg-3">
                {/* ! bootstrap card as one item  */}
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to={`/single-product/${singleProduct._id}`} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
           
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container four-item-slide">
          <div className="row flex-nowrap  border border-dark d-flex justify-content-around">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 5 && index+1 <=8){
                return <div className="col-12 col-md-6 col-lg-3">
                {/* ! bootstrap card as one item  */}
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                  </div>
                </div>
              </div>
              }
            })}
            
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container four-item-slide">
          <div className="row flex-nowrap  border border-dark d-flex justify-content-around">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 9 && index+1 <= 13){
                return <div className="col-12 col-md-6 col-lg-3">
                {/* ! bootstrap card as one item  */}
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">{singleProduct?.description.substring(0,90)+'...'}</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                  </div>
                </div>
              </div>
              }
            })}
            
          
          </div>
        </div>
      </div>
    </div>
    <a className="carousel-control-prev" data-bs-target="#largeScreenSlider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" data-bs-target="#largeScreenSlider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </section>
  {/* ! this carousel will be displayyed on medium devices */}
  <section id="mediumScreenSlider" className="carousel featured slide container-fluid p-0 medium-screen-slider d-none d-md-block d-lg-none" data-ride="carousel">
    <h4 className="text-center">Featured products</h4>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <div className="container two-item-slide">
          <div className="row flex-nowrap border border-dark">
           
           
            {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 1 && index+1 <= 2){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct?.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">{singleProduct?.description}</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                  </div>
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container two-item-slide">
          <div className="row flex-nowrap border border-dark">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 3 && index+1 <= 4){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct?.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">{singleProduct?.description}</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                  </div>
                </div>
              </div>
              }
            })}
          
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container two-item-slide">
          <div className="row flex-nowrap border border-dark">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 5 && index+1 <= 6){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct?.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">{singleProduct?.description}</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                  </div>
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container two-item-slide">
          <div className="row flex-nowrap border border-dark">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 7 && index+1 <= 8){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden">
                  <img src={singleProduct?.photo} className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h3 className="item-price">{singleProduct?.price}</h3>
                    <h5 className="card-title">{singleProduct?.name}</h5>
                    <p className="card-text">{singleProduct?.description}</p>
                    <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                  </div>
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
    </div>
    <a className="carousel-control-prev" data-bs-target="#mediumScreenSlider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" data-bs-target="#mediumScreenSlider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </section>
  {/* ! this carousel will be displayed on small devices */}
  <section id="smallScreenSlider" className="carousel featured slide small-screen-slider p-0 d-block d-md-none d-lg-none" data-ride="carousel">
    <h4 className="text-center ">Featured products</h4>
    <div className="carousel-inner">
    {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
          
                return    <div className={`carousel-item ${index+1===1 && 'active'}`}>
                <div className="container one-item-slide  ">
                  <div className="row flex-nowrap  border border-dark">
                    <div className="col-12 col-md-6 col-lg-3">
                      <div className="card w-100 overflow-hidden">
                        <img src={singleProduct?.photo} className="card-img-top" alt="..." />
                        <div className="card-body border border overflow-y-auto">
                          <h3 className="item-price">Rs. {singleProduct?.price}</h3>
                          <h5 className="card-title">{singleProduct?.name}</h5>
                          <p className="card-text">{singleProduct?.description.substring(0,50)}</p>
                          <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              
            })}
   
     
      
    </div>
    <a className="carousel-control-prev" data-bs-target="#smallScreenSlider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" data-bs-target="#smallScreenSlider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </section>
</>

  )
}

export default Featured