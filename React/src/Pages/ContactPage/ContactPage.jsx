import React, { useEffect, useState } from 'react'
import ContactDetail from '../../Components/ContactDetail/ContactDetail'

function ContactPage() {
  const [userId, setUserId] = useState(null);
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
  return (
    <ContactDetail userid= {userId} />
  )
}

export default ContactPage