import React from 'react';
import Section from '../../Shared/Section';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../Shared/Loading';
import { Link } from 'react-router-dom';
import { FcNext } from 'react-icons/fc';

const TrendingProducts = () => {
    const {data : tranding=[], isLoading,refetch} = useQuery({
        queryKey: ['treanding'],
        queryFn: async () =>{
            const {data} = await axios.get(`${import.meta.env.VITE_PROJECT_APT}/traending/home`)
            return data
        }
    })
    // productName,
    //     productsImg,
    //     description,
    //     tags,
    //     externalLink,
    //     ownerImage,
    //     ownerName,
    //     ownerEmail,
    //     upvote,
    //     vote,
    //     status
    if(isLoading) return <Loading></Loading>
    console.log(tranding)
    return (
       <div className=' place-items-center bg-gradient-to-b from-[#3BB77E]/20  to-white/40 '>
         <div className='container mx-auto md:pb-20'>
            <Section titel='New Trending' description='Trending Products'></Section>
            <div className='px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    tranding.map(tranfing => (
                        <div key={tranfing._id}>
                            <div className="card bg-[#FBFDFC] hover:bg-[#E5F6EE] border rounded-lg py-4  shadow-xl">
                              <figure>
                                <img
                                  className='h-44 w-44  rounded-full object-cover'
                                  src={tranfing.productsImg}
                                  alt="Shoes" />
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title varela">
                                  {tranfing.productName}
                                  <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p className='style-new'>{tranfing.description.slice(0,50)}...</p>
                                <div className="card-actions justify-end">
                                  <div className="badge badge-outline varela">{tranfing.upvote}</div>
                                  <div className="badge badge-outline">Vote</div>
                                </div>
                              </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Link to='/allProducts' className='btn w-36 my-8 border-2 bg-[#3BB77E] hover:bg-[#3BB77E] flex mx-auto   rounded-none varela'>View More <FcNext className='text-[#3BB77E]' size={20} />
            </Link>
        </div>
       </div>
    );
};

export default TrendingProducts;