import React from 'react';
import userRole from '../../hooks/userRole';
import Loading from '../../Shared/Loading';
import { Navigate } from 'react-router-dom';

const UserRole = ({childres}) => {
    const [role, isLoading] = userRole()
    if(isLoading) return <Loading></Loading>
    if(role === 'users') return childres
    return <Navigate to="/"></Navigate>
};

export default UserRole;