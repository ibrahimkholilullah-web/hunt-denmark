import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../AuthProvider/useAuth';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import RableRow from '../RableRow';
import UsersTabel from './UsersTabel';
import Loading from '../../Shared/Loading';

const ManageUser = () => {
    const secureAxiose = useSecureAxiose()
    const {user} = useAuth()
    const {data : users=[], isLoading, refetch} = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () =>{
            const {data} = await secureAxiose.get(`/users/${user?.email}`)
            return data
        }
    })
    if(isLoading)return <Loading></Loading>
    return (
        <div>
      <div className='border-2 border-black m-2 rounded-xl'>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-sm border-b-2 text-center text-black border-white'>
        <th>
          NO
        </th>
        <th>Name</th>
        <th>email</th>
       
        <th>Role</th>
        <th>Make Admin</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user, inx) => <UsersTabel refetch={refetch} inx={inx} key={user._id} user={user}></UsersTabel>)
      }
   
      
    </tbody>
   
  </table>
   </div>
      </div>
    
    </div>
    );
};

export default ManageUser;