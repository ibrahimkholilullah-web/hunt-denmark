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
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box w-full max-w-md bg-[#DBF2E8] md:max-w-lg lg:max-w-xl">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {/* Report Form */}
          <form onSubmit={handleReport} className="mt-4">
            <div>
              <textarea
                name="reportDetails"
                placeholder="Type your report here"
                className="w-full border-2 p-2 rounded-lg border-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                id="reportTextArea"
                cols="30"
                rows="6"
                required
              ></textarea>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Submit"
                className="btn hover:bg-green-900 bg-green-700 text-white w-full max-w-[150px] py-2 rounded-lg"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
    
    );
};

export default Report;