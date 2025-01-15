import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UpdatePage from './UpdatePage';
import axios from 'axios';
import toast from 'react-hot-toast';

const RableRow = ({owner,inx,refetch}) => {
    const {productName,
        productsImg,
        description,
        tags,
        externalLink,
        ownerImage,
        ownerName,
        ownerEmail,
        upvote,
        vote,
        status, _id} = owner
        const handleDelete = async (id) =>{
            try{
               const {data} =  await axios.delete(`${import.meta.env.VITE_PROJECT_APT}/products/${id}`)
               toast.success('Sucessfully Delete Data')
               refetch()
            }catch(error){
                toast.error(err.message)
            }
            
           }
        const updateDelete =  (id) =>{
            toast(
                (t) => (
                  <div className='flex gap-5 items-center'>
                    <div>
                      <p>Are You <b>Sure ? </b></p>
                    </div>
                    <div className='flex gap-2'>
                      <button className='bg-red-500 text-white py-2 rounded-md px-3'
                      onClick={()=> {
                        toast.dismiss(t.id)
                        handleDelete(id)}
                      }
                      >Yes</button>
                      <button className='bg-green-500 text-white py-2 rounded-md px-3'
                       onClick={() => toast.dismiss(t.id)}>Dismiss</button>
                      </div>
                  </div>
                ),
               
              );
    
        }
    return (
        <tr>
        <th>
         {inx + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={productsImg} />
              </div>
            </div>
            <div>
              <div className="font-bold">{productName}</div>
            </div>
          </div>
        </td>
        <td>
         # {tags}
        </td>
        <td>{upvote}</td>
        <td className={`${status === 'pending' && 'text-red-600' } `}>{status}</td>
        <th className='flex items-center gap-4'>
         <Link to={`/update/${_id}`}> <FaEdit size={25} /></Link>
        <MdAutoDelete onClick={() => updateDelete(_id)} size={25} />

        </th>
      </tr>
    );
};

export default RableRow;