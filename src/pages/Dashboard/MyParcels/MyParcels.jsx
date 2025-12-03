import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import { Link } from 'react-router';



const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;

        }

    })

    const handleParcelDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        // refreshdata in the UI
                        refetch();
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });
        // console.log(id);
    }


    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);

        // redirect to payment page
        window.location.assign(res.data.url);
        // window.location.href= res.data.url;
    }

    return (
        <div>
            <h2>My all parcels: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='text-center'>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Delivery Tracking ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* table row */}
                        {
                            parcels.map((parcel, index) =>
                                <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>
                                        {
                                            parcel.paymentStatus === 'paid' ? <span className='text-green-400'>Paid</span>
                                                // :<Link to ={`/dashboard/payment/${parcel._id}`} className='btn btn-primary text-black'><button>Pay</button></Link>
                                                : <button onClick={()=>handlePayment(parcel)} className='btn btn-primary text-black'>Pay</button>

                                        }
                                    </td>
                                    <td>{parcel.deliveryStatus}</td>
                                    <td><Link to={`parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link></td>
                                    <td>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <CgDetailsMore />
                                        </button>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <FaEdit ></FaEdit >
                                        </button>

                                        <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square hover:bg-primary'>
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyParcels;