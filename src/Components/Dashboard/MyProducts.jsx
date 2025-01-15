import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // For toast notifications
import useAuth from '../AuthProvider/useAuth'; // Assuming you have this hook
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RableRow from './RableRow';
import Loading from '../Shared/Loading';

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch user's products
  
        const {data :Useremail = [], isLoading, refetch} = useQuery({
          queryKey: ['email', user?.email],
          queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/prosycts/${user?.email}/dash`)
            return data
          }
        })
     
  
if(isLoading) return <Loading></Loading>
  return (
    <div>
      <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-sm'>
        <th>
          NO
        </th>
        <th>Name</th>
        <th>Tags</th>
        <th>Up vote</th>
        <th>Status</th>
        <th> E & D</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        Useremail.map((owner, inx) => <RableRow refetch={refetch} inx={inx} key={owner._id} owner={owner}></RableRow>)
      }
   
      
    </tbody>
   
  </table>
   </div>
      </div>
    
    </div>
    
  );
};

export default MyProducts;
