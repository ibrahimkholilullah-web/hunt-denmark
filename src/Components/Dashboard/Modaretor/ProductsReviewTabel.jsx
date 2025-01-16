import React from 'react';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import toast from 'react-hot-toast';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';

const ProductsReviewTabel = ({ review, inx, refetch }) => {
    const axioseSecure = useSecureAxiose();
    const { productName, status, _id, fetures } = review;

    const addFeature = async () => {
        try {
            await axioseSecure.put(`/fetures/${_id}`);
            toast.success('Feature added successfully');
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const acceptBtn = async () => {
        try {
            await axioseSecure.patch(`/accept/${_id}`);
            toast.success('Status updated to accepted');
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const rejectBtn = async () => {
        try {
            await axioseSecure.patch(`/reject/${_id}`);
            toast.success(`Status updated to rejected for ${productName}`);
            refetch();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <tr className="text-center text-sm md:text-base">
            <th>{inx + 1}</th>
            <td>
                <div className="font-bold">{productName}</div>
            </td>
            <td>
                <p
                    className={`px-2 py-1 rounded-lg text-white ${
                        status === 'pending' ? 'bg-yellow-400' :
                        status === 'reject' ? 'bg-gray-400' :
                        'bg-green-600'
                    }`}
                >
                    {status}
                </p>
            </td>
            <td
                onClick={fetures !== 'Approve' ? addFeature : undefined}
                className={`${fetures === 'Approve' ? '' : 'cursor-pointer'}`}
            >
                <p
                    className={`px-2 py-1 rounded-lg text-white ${
                        fetures === 'Approve' ? 'bg-gray-300' : 'bg-green-400'
                    }`}
                >
                    Add Featured
                </p>
            </td>
            <td
                onClick={status !== 'accept' ? acceptBtn : undefined}
                className={`${status === 'accept' ? '' : 'cursor-pointer'}`}
            >
                <p
                    className={`px-2 py-1 rounded-lg text-white ${
                        status === 'accept' ? 'bg-gray-300' : 'bg-blue-400'
                    }`}
                >
                    Accept
                </p>
            </td>
            <td
                onClick={status !== 'reject' ? rejectBtn : undefined}
                className={`${status === 'reject' ? '' : 'cursor-pointer'}`}
            >
                <p
                    className={`px-2 py-1 rounded-lg text-white ${
                        status === 'reject' ? 'bg-gray-300' : 'bg-red-400'
                    }`}
                >
                    Reject
                </p>
            </td>
            <th className="flex items-center justify-center gap-2">
                <Link to={`/ditails/${_id}`} className="text-blue-500 hover:text-blue-700">
                    <TbListDetails size={25} />
                </Link>
            </th>
        </tr>
    );
};

export default ProductsReviewTabel;
