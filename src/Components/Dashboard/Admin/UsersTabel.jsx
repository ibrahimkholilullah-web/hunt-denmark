import React from 'react';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import toast from 'react-hot-toast';

const UsersTabel = ({ user, inx, refetch }) => {
  const { role, name, email } = user;
  const axioseSecure = useSecureAxiose();

  const handleChangeRole = async (selectRole) => {
    if (role === selectRole) {
      return role;
    }
    try {
      await axioseSecure.patch(`user/role/${email}`, {
        role: selectRole,
      });
      toast.success('Role updated successfully!');
      refetch();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <tr className="text-center border-b text-[#253D4E]">
      <th className="py-2 text-sm">{inx + 1}</th>
      <td className="py-2">
        <div className="flex items-center justify-center gap-3">
          <div className="font-bold text-[#253D4E]">{name}</div>
        </div>
      </td>
      <td className="py-2 text-sm text-[#253D4E]">{email}</td>
      <td className="py-2 text-sm">
        <span
          className={`px-2 py-1 rounded-md text-[#253D4E] ${
            role === 'admin'
              ? 'bg-green-500'
              : role === 'modarator'
              ? 'bg-blue-500'
              : 'bg-gray-400'
          }`}
        >
          {role}
        </span>
      </td>
      <td className="py-2">
        <select
          onChange={(e) => handleChangeRole(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={role}
        >
          <option value={role}>{role}</option>
          <option value="users">User</option>
          <option value="admin">Admin</option>
          <option value="modarator">Moderator</option>
        </select>
      </td>
    </tr>
  );
};

export default UsersTabel;
