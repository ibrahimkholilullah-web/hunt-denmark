import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../Shared/Loading';
import ContextRepotable from './ContextRepotable';

const ReportedContents = () => {
    const {data : report=[], isLoading,refetch} = useQuery({
        queryKey: ['report'],
        queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/report`)
            return data
        }
    })
    if(isLoading) return <Loading></Loading>
    console.log(report)
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
          <th>Image</th>
          <th>Name</th>
          <th>Ditails</th>
          <th>Delete </th>
          
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {
          report.map((report, inx) => <ContextRepotable refetch={refetch} inx={inx} key={report._id} report={report}></ContextRepotable>)
        }
     
        
      </tbody>
     
    </table>
     </div>
        </div>
      
      </div>
    );
};

export default ReportedContents;