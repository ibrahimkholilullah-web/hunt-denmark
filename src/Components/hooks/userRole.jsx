import React from 'react';
import useAuth from '../AuthProvider/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useSecureAxiose from '../useSecureAxiose/useSecureAxiose';

const userRole = () => {
    const {user,loading} = useAuth()
    const axioseSecure = useSecureAxiose()
    const {data : role, isLoading} = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () =>{
            const {data} = await axioseSecure.get(`/users/role/${user?.email}`)
            return data.role
        }
    })
    return [role, isLoading]
};

export default userRole;