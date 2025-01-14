import React from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';

const Featured = () => {
    const {data : products = [], isLoading} = useQuery({
        queryKey:['products'],
        queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/products`)
            return data
        }
    })
    console.log(products)
    return (
        <div className=' container mx-auto '>
            <Section
            titel='New Add Products'
            description='Featured Products '
            ></Section>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    products.slice(0,4).map(product => (
                        <div key={product._id} >
                           <div className='border-2 flex gap-5 p-2 items-center justify-between rounded-lg border-yellow-300'>
                           <img className='w-4/12 h-32 object-cover' src={product.productsImg} alt="" />
                            
                            <div>
                            <h1 className='text-xl font-bold'>{product.productName}</h1>
                            <p className='bg-blue-gray-100 text-center rounded-lg'>#{product.tags}</p>
                            </div>
                            <div className='flex items-center text-righ gap-4 '>
                                {product.vote}
                            <FaCaretSquareDown size={30} />
                            <FaCaretSquareUp size={30} />
                            {product.upvote}
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Featured;