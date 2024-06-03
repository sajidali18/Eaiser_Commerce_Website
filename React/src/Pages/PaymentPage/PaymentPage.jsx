import React, { useEffect, useState } from 'react'
import PaymentGateway from '../../Components/PaymentGateway/PaymentGateway'
import axios from 'axios';

function PaymentPage() {
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState({});


  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const tokenParts = jwtToken.split('.');
      const encodedPayload = tokenParts[1];
      const decodedPayload = atob(encodedPayload);
      const user = JSON.parse(decodedPayload);
      setUserId(user.id);
    } else {
      console.log('JWT token not found in local storage');
    }
  }, []);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/getuser/${userId}`);
        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);  
  // console.log(cart)
  return (
    <PaymentGateway add={cart} />
  )
}


export default PaymentPage