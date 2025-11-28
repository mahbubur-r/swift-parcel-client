import React from 'react';
import axios from 'axios'

const axiosSecure = axios.create({
    // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
    baseURL: import.meta.env.VITE_API_URL
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;