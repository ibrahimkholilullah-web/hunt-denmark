import React from 'react';
import { Link } from 'react-router-dom';
import { MdAutoDelete } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import toast from 'react-hot-toast';
import axios from 'axios';

const ContextRepotable = ({report,inx,refetch}) => {
  const {repoterName,repoterEmail,reportImaPro,reportProducts,proId,_id} = report
  const handleDelete = async (id) =>{
    try{
         await axios.delete(`${import.meta.env.VITE_PROJECT_APT}/report/${id}`)
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
        <tr className='text-center'>
        <th>
         {inx + 1}
        </th>
        <td>
        <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={reportImaPro} />
              </div>
            </div>
        </td>
        <td >
            
          <div className="font-bold">{reportProducts}</div>
        </td>
        <td className='text-center'>
        <Link to={`/ditails/${proId}`}> <TbListDetails  className='flex mx-auto' size={25} /></Link>
        </td>
        <th className='text-center'>
        <MdAutoDelete className='flex mx-auto cursor-pointer ' onClick={() => updateDelete(_id)} size={25} />

        </th>
      </tr>
    );
};

export default ContextRepotable;