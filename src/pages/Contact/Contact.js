import React from 'react'
import './Contact.css'

const Contact = () => {


  return (
   <main className="container">
  <div className="row">
    <div className="col-12"><h1 className="text-center contact-title">Contact Us</h1></div>
  </div>
  <div className="row form-n-picture-container">
    <div className="col-12 col-md-6 col-lg-6 contact-form-picture">
      <img src="https://images.pexels.com/photos/5414041/pexels-photo-5414041.jpeg?auto=compress&cs=tinysrgb&w=600" alt />
    </div>
    <div className="col-12 col-md-6 col-lg-6 contact-form">
      <form id="form" className="d-flex flex-column">
        <label htmlFor="name" id="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="email" id="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="message" id="message">Message</label>
        <textarea type="text" rows={1} id="message" defaultValue={""} />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</main>

  )
}

export default Contact