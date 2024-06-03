import React, { useEffect, useState } from 'react'
import './Address.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function Address({ Add }) {
    const [selectAdd, setSelectAdd] = useState(null);
    const navigate = useNavigate();
    if (!Array.isArray(Add)) {
        return <div>Loading</div>;
    }
    
    const handlechange = (index) => {
        setSelectAdd(index);
    }
    const handleclick = () => {
        if (selectAdd !== null) {
            navigate('/payment');
        }
        else {
            toast.error("please select the addresss");
        }
    }
    const editbtn = () => {
        navigate('/contact');
    }
  return (
      <>
              <div class="container" id='main'>
                  <div class="col-md-8">
                      <div class="card shadow-lg rounded">
                          <div class="card-header bg-white">
                              <h5 class="card-title  mb-0" id='h5'>Select Delivery Address</h5>
                          </div>
                          <div class="card-body">
                            {Add.map((info,index) => (
                              <div class="row" key={index}>
                                  <div className="col-md-1 text-center">
                                        <input type="radio" name="address" checked={selectAdd === index}
                                        onChange={()=> handlechange(index)}
                                        />
                                        
                                  </div>
                                      <div class="col-md-11">
                                        <h4 class="font-weight-bold mb-1">{info.FullName}</h4>
                                        <p class="mb-1">{`${info.address}, ${info.city}, ${info.state}, ${info.PinCode}`}</p>
                                        <p class="mb-0">{info.MobileNumber }</p>
                                      </div>
                              </div>
                                  ))}
                              <div class="row mt-3 mx-5">
                                  <div class="col-md-6">
                                      <button class="btn btn-outline-primary btn-block" id='dbtn' onClick={editbtn}>EDIT</button>
                                  </div>
                                  <div class="col-md-6">
                                      <button class="btn  btn-block" id='dbtn' onClick={handleclick}>Deliver to this
                                          Address</button>
                                  </div>
                              </div>
                          </div>
                  </div>
                  <ToastContainer position='bottom-center'/>
                  </div>
              </div>
    </>
  )
}



export default Address