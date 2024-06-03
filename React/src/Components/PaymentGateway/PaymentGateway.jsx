import React, { useEffect, useState } from 'react';
import './PaymentGateway.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe('pk_test_51PISlOSBYbE82nYYk8PLIBmC1nmWJrMnLW8B4rot2rRB73h8JIWkfCegtnIysb1VEbzGbu4BYox9aFXymGoK50Wi00jFULWliU');

const PaymentForm = ({ info = { contact: [] } }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [formData, setFormData] = useState({
        FullName: '',
        lastName: '',
        MobileNumber: '',
        address: '',
        city: '',
        state: '',
        PinCode: '',
        locality:'',
        cardName: 'card'
    });

    // console.log(formData, "<<<>>>>>>")
    useEffect(() => {
        if (info && info.contact) {
            const contactData = info.contact[0];
            console.log(contactData)
            setFormData({
                FullName: contactData.FullName || '',
                MobileNumber: contactData.MobileNumber || '',
                address: contactData.address || '',
                city: contactData.city || '',
                state: contactData.state || '',
                PinCode: contactData.PinCode || '',
                landmark:contactData.landmark||'',
                locality: contactData.locality || '',
                cardName: ''
            });
        }
    }, [info]);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/users/payment/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 10000,
                    FullName: formData.FullName,
                    lastName: formData.lastName,
                    MobileNumber: formData.MobileNumber,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.PinCode,
                    cardName: formData.cardName
                })
            });

            const data = await response.json();
            const { client_secret: clientSecret } = data;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.cardName,
                        MobileNumber: formData.MobileNumber,
                        address: {
                            line1: formData.address,
                            city: formData.city,
                            state: formData.state,
                            postal_code: formData.PinCode,
                            country: 'IN'
                        }
                    }
                }

            });
            console.log(result, "result>>>><<<")
            if (result.error) {
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast.success('Payment successfully completed!');
                }
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            toast.error('Payment failed. Please try again.');
        }
    };

    return (
        <div className="container my-5 cont">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card box">
                        <div className="text-center payment p-3">
                            <h3>Payment Gateway</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submit}>
                                {/* Billing Information */}
                                <h5>Billing Information</h5>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="FullName">Full Name</label>
                                        <input type="text" className="form-control" id="FullName" placeholder="Enter your full name" value={formData.FullName} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="MobileNumber">Mobile Number</label>
                                        <input type="text" className="form-control" id="MobileNumber" placeholder="Enter your mobile number" value={formData.MobileNumber} onChange={handleChange} />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="PinCode">Pincode</label>
                                            <input type="text" className="form-control" id="PinCode" placeholder="Enter your pincode" value={formData.PinCode}  onChange={handleChange} />
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
                                        <input type="text" className="form-control" id="address" placeholder="Enter your address" value={formData.address}  onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="locality">Locality</label>
                                        <input type="text" className="form-control" id="locality" placeholder="Enter your locality" value={formData.locality}  onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input type="text" className="form-control" id="city" placeholder="Enter your city" value={formData.city}  onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input type="text" className="form-control" id="state" placeholder="Enter your state" value={formData.state} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="landmark">Landmark (Optional)</label>
                                        <input type="text" className="form-control" id="landmark" placeholder="Enter a landmark (optional)" value={formData.landmark}  onChange={handleChange} />
                                    </div>
                                </div>
                                {/* Payment Information */}
                                <h5 className="my-4">Payment Information</h5>
                                <div className="form-group">
                                    <label >Name on Card</label>
                                    <input type="text" className="form-control" name="cardName" placeholder="Name on Card" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <CardElement className="form-control" />
                                </div>
                                <button type="submit" className="mx-4 my-2 p-1 btn-block animate__animated animate__pulse animate__infinite button">
                                    Submit Payment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" className="custom-toast" />
        </div>
    );
};

const PaymentGateway = ({add}) => (
    <Elements stripe={stripePromise}>
        <PaymentForm info ={add} />
    </Elements>
);

export default PaymentGateway;

