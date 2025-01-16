import React from 'react';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import toast from 'react-hot-toast';

const UsersTabel = ({user, inx,refetch}) => {
    const {role,name,email} = user
    const axioseSecure = useSecureAxiose()
    const handleChangeRole = async (selectRole) =>{
        if(role === selectRole){
            return role
        } 
        try{
             await axioseSecure.patch(`user/role/${email}`,{
                role : selectRole,
            })
            toast.success('Role updated successfully!')
            refetch()
        }catch(err){
            toast.error(err?.message)
        }
    }
    return (
        <tr>
        <th>
         {inx + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            
            <div>
              <div className="font-bold">{name}</div>
            </div>
          </div>
        </td>
        <td>
         {email}
        </td>
        <td>{role}</td>
        <td>
            <select onClick={(e)=>handleChangeRole(e.target.value)} className='bg-blue-gray-100' Value={role} name="" id="">
                <option value={role}>{role}</option>
                <option value="admin">Admin</option>
                <option value="modarator">Moderator</option>
            </select>
        </td>
        
      </tr>
    );
};

export default UsersTabel;