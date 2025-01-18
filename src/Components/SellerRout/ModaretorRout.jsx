import React from 'react';
import userRole from '../hooks/userRole';
import Loading from '../Shared/Loading';
import { Navigate } from 'react-router-dom';

const ModaretorRout = ({children}) => {
    const [role, isLoading] = userRole()
    if(isLoading) return <Loading></Loading>
    if(role === "modarator" ) return children
    return <Navigate to='/dadhboard/myprofile'></Navigate>
};

export default ModaretorRout;