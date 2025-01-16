import React from 'react';
import Loading from '../../Shared/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RableRow from '../RableRow';
import ProductsReviewTabel from './ProductsReviewTabel';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';

const ProductReview = () => {
  const axioseSecure = useSecureAxiose()
    const {data :panding = [], isLoading, refetch} = useQuery({
        queryKey: ['panding'],
        queryFn: async () =>{
          const {data} = await axioseSecure.get(`/panding`)
          return data
        }
      })
   
console.log(panding)
if(isLoading) return <Loading></Loading>
    return (
        <div>
        <div className='border-2 border-black m-2 rounded-xl'>
        <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr className='text-sm border-b-2 border-white text-center'>
          <th>
            NO
          </th>
          <th>Name</th>
          <th>Status</th>
          <th>Featured</th>
          <th>Accept </th>
          <th>Reject</th>
          <th>Details </th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {
          panding.map((review, inx) => <ProductsReviewTabel refetch={refetch} inx={inx} key={review._id} review={review}></ProductsReviewTabel>)
        }
     
        
      </tbody>
     
    </table>
     </div>
        </div>
      
      </div>
    );
};

export default ProductReview;