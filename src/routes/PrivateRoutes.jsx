import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log('location', location);
    
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to= '/login' state={location.pathname }></Navigate>
    }

    return children;
};

export default PrivateRoutes;