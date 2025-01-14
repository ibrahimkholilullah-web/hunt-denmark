import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../Shared/Loading';

const Allproducts = () => {
    const {data : allProducts= [], isLoading, refetch} = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/all-products`)
            return data 
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className=' container mx-auto'>
            <h1>Ibrahim</h1>
        </div>
    );
};

export default Allproducts;