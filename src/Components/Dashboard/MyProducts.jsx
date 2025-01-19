import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // For toast notifications
import useAuth from '../AuthProvider/useAuth'; // Assuming you have this hook
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RableRow from './RableRow';
import Loading from '../Shared/Loading';
import useSecureAxiose from '../useSecureAxiose/useSecureAxiose';
import { Helmet } from 'react-helmet-async';

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const secureAxiose = useSecureAxiose()
  // Fetch user's products
  
        const {data :Useremail = [], isLoading, refetch} = useQuery({
          queryKey: ['email', user?.email],
          queryFn: async () =>{
            const {data} = await secureAxiose.get(`/prosycts/${user?.email}/dash`)
            return data
          }
        })
     
  
if(isLoading) return <Loading></Loading>
  return (
    <div>
                 <Helmet>
              <title> HUND Denmark || My Products</title>
            </Helmet>
      <div className='border-2 border-[#3BB77E] m-2 rounded-xl'>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-sm border-b-2 border-white'>
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
        Useremail.length === 0 ? <tr>
        <td
          colSpan="6"
          className="text-center style-new text-[#253D4E] py-5 text-lg"
        >
          No products added yet. Please add your products!
        </td>
      </tr> : <>
      {
        Useremail.map((owner, inx) => <RableRow refetch={refetch} inx={inx} key={owner._id} owner={owner}></RableRow>)
      }
      </>
      }
   
      
    </tbody>
   
  </table>
   </div>
      </div>
    
    </div>
    
  );
};

export default MyProducts;
