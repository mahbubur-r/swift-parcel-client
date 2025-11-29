import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-3xl text-red-500 font-bold m-5'>Payment has been cancelled. Please try again</h2>
            <Link to='/dashboard/my-parcels'><button className='btn btn-primary text-black font-semibold'>Try Again!</button></Link>
        </div>
    );
};

export default PaymentCancelled;