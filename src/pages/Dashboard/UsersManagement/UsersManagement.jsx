import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { HiUserRemove } from 'react-icons/hi';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure()
    // states for find users
    const [searchText, setSearchText] = useState('')
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        }
    })
    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data);

                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Confirmed!",
                        text: `${user.displayName} marked as an Admin`,
                        icon: "success",
                        timer: 2000,
                    });
                }

            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        // Swal.fire({
        //     title: "Agree with the cost?",
        //     text: `Do you want to change ${user.displayName} role?`,
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Confirm and Continue to Payment!"
        // })
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                console.log(res.data);

                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Confirmed!",
                        text: `${user.displayName} marked as an User`,
                        icon: "success",
                        timer: 2000,
                    });
                }

            })
    }
    return (
        <div>
            <h2 className='text-3xl font-semibold text-center my-5'>Manage Users: {users.length}</h2>
            <p>Search Text: {searchText}</p>

            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input 
                onChange={(e)=> setSearchText(e.target.value)}

                type="search" 
                className="grow" 
                placeholder="Search User" />
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.photoURL}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.role}
                                <br />
                                <span className="badge badge-ghost badge-sm">{user.location}</span>
                            </td>
                            <td>{user.role}</td>
                            <th>
                                {
                                    user.role === 'admin' ? <button onClick={() => handleRemoveAdmin(user)} className="btn bg-red-400"><FiShieldOff></FiShieldOff></button>
                                        : <button onClick={() => handleMakeAdmin(user)} className="btn bg-green-400"><FaUserShield /></button>
                                }


                            </th>
                        </tr>)}
                        {/* row 1 */}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;