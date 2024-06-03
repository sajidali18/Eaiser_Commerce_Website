import React, { useEffect, useState } from 'react'
import Address from '../../Components/Address/Address'
import axios from 'axios';

function SelectAdd() {
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
                setCart(response.data.contact);
                
            } catch (error) {
                console.log(error);
            }
        };
        if (userId) {
            fetchUser();
        }
    }, [userId]);
  return (
      <Address Add={cart } />
  )
}


export default SelectAdd