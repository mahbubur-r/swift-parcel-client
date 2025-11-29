import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payments = () => {

    const {parcelID} = useParams()
    const axiosSecure = useAxiosSecure();

    const {isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelID],
        queryFn: async()=>{
            const res = await axiosSecure.get(`http://localhost:3000/parcels/${parcelID}`)
            return res.data
        }
    });
    // const handlePayment = async()=> {
    //     const paymentInfo = {
    //         cost: parcel.cost,
    //         parcelId: parcel._id,
    //         senderEmail: parcel.senderEmail,
    //         parcelName: parcel.parcelName
    //     }
    //     const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    //     console.log(res.data);

    //     // redirect to payment page
    //     window.location.href= res.data.url;
    // }
    if(isLoading){
        return <div className='h-screen'><span className="loading loading-infinity loading-xl"></span></div>
        
    }

    return (
        <div>
            <h2>Please pay {parcel.cost}€ for : {parcel.parcelName} delivery!</h2>
            <button className='btn btn-primary text-black font-semibold'>Pay Now!</button>
        </div>
    );
};

export default Payments;