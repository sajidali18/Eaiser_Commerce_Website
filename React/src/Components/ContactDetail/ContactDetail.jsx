import React, { useState } from 'react';
import './ContactDetai.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

function ContactDetail({ userid }) {

  if (!userid) {
   return <div>Loading.....</div>
  }
  const [item, setItem] = useState({
    FullName: '',
    MobileNumber: '',
    address: '',
    city: '',
    state: '',
    PinCode: '',
    locality: '',
    landmark: ''
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/users/address`, {item, userid });
      console.log(response.data);
      setItem({
        FullName: '',
        MobileNumber: '',
        address: '',
        city: '',
        state: '',
        PinCode: '',
        locality: '',
        landmark: ''
      });
      toast.success("Address saved Successfuly")
      navigate('/checkout');
    }
    catch (error) {
      console.error(error.response.data);
      setItem({
        FullName: '',
        MobileNumber: '',
        address: '',
        city: '',
        state: '',
        PinCode: '',
        locality: '',
        landmark: ''
      });
      toast.error(error.response.data.message || "An error occured");
    }
  }

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value
    });
  }
  return (
    <div className="container my-4">
      <div className='con'>
        <div className="card">
          <div className="card-header text-center" id='card-header'>
            <h1>Add Delivery Address</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="FullName">Full Name</label>
                <input type="text" className="form-control" id="FullName" placeholder="Enter your full name" value={item.FullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="MobileNumber">Mobile Number</label>
                <input type="text" className="form-control" id="MobileNumber" placeholder="Enter your mobile number" value={item.MobileNumber} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="PinCode">Pincode</label>
                  <input type="text" className="form-control" id="PinCode" placeholder="Enter your pincode" value={item.PinCode} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="addressType">Address Type</label>
                  <select className="form-control" id="addressType">
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter your address" value={item.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="locality">Locality</label>
                <input type="text" className="form-control" id="locality" placeholder="Enter your locality" value={item.locality} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" placeholder="Enter your city" value={item.city} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" id="state" placeholder="Enter your state" value={item.state} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="landmark">Landmark (Optional)</label>
                <input type="text" className="form-control" id="landmark" placeholder="Enter a landmark (optional)" value={item.landmark} onChange={handleChange} />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="saveAddress" />
                <label className="form-check-label" htmlFor="saveAddress">Save Address</label>
              </div>
              <button type="submit" className="btn btn-primary btn-block" id='butn'>Save and Continue</button>
            </form>
          </div>
        </div>
        <ToastContainer position='bottom-center'/>
      </div>
    </div>
  );
}

export default ContactDetail;
