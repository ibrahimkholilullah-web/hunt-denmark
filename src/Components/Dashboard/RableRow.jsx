import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UpdatePage from './UpdatePage';

const RableRow = ({owner,inx}) => {
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
        <MdAutoDelete size={25} />

        </th>
      </tr>
    );
};

export default RableRow;