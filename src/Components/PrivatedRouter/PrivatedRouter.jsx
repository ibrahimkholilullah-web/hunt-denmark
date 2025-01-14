import React from 'react';
import useAuth from '../AuthProvider/useAuth';
import Loading from '../Shared/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PrivatedRouter = ({children}) => {
    const location = useLocation()
    const {user,loading} = useAuth()
    if(loading) return <Loading></Loading>
    if(user) return children;

    return <Navigate to='/login' state={location.pathname}></Navigate>
};

export default PrivatedRouter;