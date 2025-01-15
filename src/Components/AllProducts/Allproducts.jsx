import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Card from './Card';
import { FcNext, FcPrevious } from 'react-icons/fc';

const AllProducts = () => {
  const [search, setSearch] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [itemPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  // Fetch product count
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PROJECT_APT}/productsCount`);
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching product count:', error);
      }
    };

    fetchProductCount();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PROJECT_APT}/all-products?searchParams=${search}&page=${currentPage}&size=${itemPerPage}`
        );
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, currentPage, itemPerPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto min-h-screen">
      <div className="w-8/12 mx-auto mb-8">
        <label className="input input-bordered rounded-3xl flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-12 w-20 -mr-4 rounded-r-3xl p-2 text-white bg-[#54673B] opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <p className="border-2 w-20 rounded-3xl bg-[#54673B] text-white text-sm mb-2 justify-center flex">
        {allProducts?.length} Card
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allProducts.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
      <div className="pagination mt-10 flex items-center gap-5 justify-center mx-auto">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          <FcPrevious size={20} />
        </button>
        {pages.map((page) => (
          <button
            className={`p-2 rounded-xl w-10 ${
              currentPage === page ? 'bg-blue-500 text-white' : ''
            }`}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
          <FcNext />
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
