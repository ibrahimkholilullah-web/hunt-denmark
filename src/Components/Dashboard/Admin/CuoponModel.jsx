import React, { useState } from 'react';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import toast from 'react-hot-toast';
import { imageUpload } from '../../ImageBB/Utilist';

const CuoponModel = ({ cuopon, refetch }) => {
  const [loading, setLoading] = useState(false);
  const axioseSecure = useSecureAxiose();
  const { code, date, amount, description, imagecupon, _id } = cuopon;

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const code = form.couponcode.value;
    const date = form.date.value;
    const amount = form.amount.value;
    const image = form.image.files[0];
    const description = form.description.value;

    let imagecuponUrl = imagecupon; // Use the existing image URL if no new image is uploaded.
    if (image) {
      try {
        imagecuponUrl = await imageUpload(image);
      } catch (err) {
        toast.error('Image upload failed.');
        setLoading(false);
        return;
      }
    }

    const updatedCoupon = {
      code,
      date,
      amount,
      description,
      imagecupon: imagecuponUrl,
    };

    try {
      await axioseSecure.patch(`/update/coupon/${_id}`, updatedCoupon);
      toast.success('Coupon updated successfully!');
      refetch(); // Refresh the coupon data.
      document.getElementById('my_modal_3').close(); // Close the modal.
    } catch (err) {
      toast.error(`Error updating coupon: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Modal */}
      <dialog id="my_modal_3" className="modal p-2">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 -top-0"
            onClick={() => document.getElementById('my_modal_3').close()}
          >
            ✕
          </button>
          <form onSubmit={handleUpdateCoupon} className="space-y-4">
            <input
              type="text"
              name="couponcode"
              defaultValue={code}
              required
              placeholder="Coupon Code"
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              defaultValue={date}
              name="date"
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="amount"
              defaultValue={amount}
              required
              placeholder="Discount Amount"
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              id="productImage"
              accept="image/*"
              name="image"
              className="file-input file-input-bordered bg-gray-100 border-gray-300 hover:border-green-500 border rounded w-full"
            />
            <textarea
              placeholder="Coupon Description"
              name="description"
              defaultValue={description}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Update Coupon'
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CuoponModel;
