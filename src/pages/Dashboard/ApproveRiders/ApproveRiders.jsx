import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle, FaCheckSquare, FaEye, FaTrash } from 'react-icons/fa';
import { IoIosRemoveCircle } from 'react-icons/io';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const {refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

 

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: `${status}!`,
                        text: `Your application has been ${status}.`,
                        icon: "success",
                        timer: 2500,
                    });
                }
            })
    }

       const handleApproval = rider => {
        // console.log(id);
        updateRiderStatus(rider,'approved' )

    }
       const handleRejection = rider => {
        // console.log(id);
        updateRiderStatus(rider,'rejected' )

    }

    return (
        <div >
            <h2 className='text-3xl font-semibold text-center my-5'>Riders pending for approval: {riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='text-center'>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Application Status</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {/* row 1 */}
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'} `}>{rider.status}</p>

                                </td>
                                <td>{rider.district}</td>
                                <td>
                                    <button className='btn p-2'><FaEye /></button>
                                    <button onClick={() => handleApproval(rider)} className='btn p-2'><FaCheckSquare /></button>
                                    <button onClick={()=> handleRejection(rider)} className='btn p-2'><IoIosRemoveCircle /></button>
                                    <button className='btn p-2'><FaTrash /></button>
                                    
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;