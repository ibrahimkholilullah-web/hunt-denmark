import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // For toast notifications
import useAuth from '../AuthProvider/useAuth'; // Assuming you have this hook

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch user's products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?ownerEmail=${user?.email}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong!');
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user]);

  // Handle delete product
  const handleDelete = async (productId) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success('Product deleted successfully!');
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        throw new Error('Failed to delete the product');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  // Redirect to update page
  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">You have not posted any products yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Votes</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{product.votes || 0}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      product.status === 'Accepted'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {product.status || 'Pending'}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyProducts;
