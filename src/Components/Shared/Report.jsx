import React from 'react';
import useAuth from '../AuthProvider/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Report = ({ditails}) => {
  const {user} = useAuth()
  const repoterName = user?.displayName
  const repoterEmail = user?.email
  const reportProducts = ditails.productName
  const reportImaPro = ditails.productsImg
  const proId = ditails._id
  const handleReport =async e =>{
    e.preventDefault()
    const reportpost = {
      repoterName,repoterEmail,reportImaPro,reportProducts,proId
  
    }
    try{
      const {data} =await axios.post(`${import.meta.env.VITE_PROJECT_APT}/report`,reportpost)
      console.log(data)
      toast.success('Report Sent Modarator.')
      e.target.reset()
    }catch(err){
      toast.error(err.message)
    }
    console.log(reportpost)
    document.getElementById("my_modal_3").close();

  }
  
    return (
       <div>
         {/* You can open the modal using document.getElementById('ID').showModal() method */}
         <dialog id="my_modal_3" className="modal">
           <div className="modal-box">
             <form method="dialog">
               {/* if there is a button in form, it will close the modal */}
               <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              
             </form>
             <form onSubmit={handleReport}>
              <div >
                <textarea name="" placeholder='Report Type this area ' className='border-2 p-2 rounded-lg border-black text-brown-900' id="" cols="40" rows="8"></textarea>
              </div>
              <input type="submit" value="Submit" className='btn hover:bg-brown-900 bg-[#1B5E20] text-white w-24' />
             </form>
           
           </div>
         </dialog>
       </div>
    );
};

export default Report;