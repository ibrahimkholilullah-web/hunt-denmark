import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';

const ProductsReviewTabel = ({review, inx, refetch}) => {
    const axioseSecure = useSecureAxiose()
    const {productName,
        status, _id,fetures} = review
        const addFeature = async () =>{
            try{
                const {data} = await axioseSecure.put(`/fetures/${_id}`)
                toast.success('Add Fetures section')
                refetch()
            }catch(err){
                toast.error(err.message)
            }
        }
        const acceptBtn =async () =>{
            try{
                const {data} = await axioseSecure.patch(`/accept/${_id}`)
                toast.success('Status Update')
                refetch()
            }catch(err){
                toast.error(err.message)
            }
        }
        const rejectBtn = async() =>{
            try{
                const {data} = await axioseSecure.patch(`/reject/${_id}`)
                toast.success(`User Status Rejects ${productName}`)
                refetch()
            }catch(err){
                toast.error(err.message)
            }
        }
    return (
        <tr className='text-center'>
        <th>
         {inx + 1}
        </th>
        <td>
            
              <div className="font-bold">{productName}</div>
        </td>
        <td >
         <p className={`${status === 'pending' ? "bg-yellow-400 px-1 rounded-xl" : '' } ${status === 'reject' ? 'bg-blue-gray-300 px-1 rounded-xl': ''} ${status === 'accept' ? 'bg-deep-orange-700 text-white px-1 rounded-xl': ''}`}>{status}</p>
        </td>
        <td onClick={fetures !== 'Approve' ? addFeature : undefined} className={`${ fetures === "Approve" ?'':' cursor-pointer ' }`}>
         <p className={`text-white px-1 rounded-lg ${fetures === 'Approve' ? 'bg-gray-300' : 'bg-green-300'}`}>Add Featured</p>
        </td>
        <td
          onClick={status !== 'accept' ? acceptBtn : undefined} className={`${ status === "accept" ?'':' cursor-pointer ' }`}
        >
        <p className={`text-white px-1 rounded-lg ${status === 'accept' ? 'bg-gray-300' : 'bg-brown-300'}`}>
          Accept
        </p>
        </td>

        <td onClick={status !== 'reject' ? rejectBtn : undefined} className={`${ status === "reject" ?'':' cursor-pointer ' }`}>
            <p className={`text-white px-1 rounded-lg ${status === 'reject' ? 'bg-gray-300' : 'bg-red-300'}`}>Reject</p>
        </td>
        <th className='flex items-center justify-center gap-4'>
         <Link to={`/ditails/${_id}`}> <TbListDetails size={25} /></Link>

        </th>
      </tr>
    );
};

export default ProductsReviewTabel;