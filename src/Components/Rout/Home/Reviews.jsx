import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosePublic from '../../PublicAxiose/useAxiosePublic';
import Loading from '../../Shared/Loading';
import Section from '../../Shared/Section';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import {motion} from "framer-motion"
import {fadeIn}  from "../../Animation/variants"
const Reviews = () => {
    const axiosePublic = useAxiosePublic()
    const {data: reviews=[], isLoading} = useQuery({
        queryKey: ['revies'],
        queryFn: async () =>{
            const {data} = await axiosePublic.get('/reviews')
            return data
        }
    })
    if(isLoading) return <Loading></Loading>
    console.log(reviews)
    return (
       <div className='bg-[#E6F6EE]'>
         <div className='conatiner mx-auto pb-20'>
            <Section titel='Review Products' description='All Reviews'></Section>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">{reviews.map(repo => 
                <SwiperSlide key={repo._id}>
                <motion.div
                variants={fadeIn('up', 0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once: false,amount: 0.7}}
                className='w-8/12 mx-auto text-center'>
                    <img className='mx-auto w-16 h-16 rounded-full' src={repo.reviewerImage} alt="" />
                    <h1 className='p-1 style-new'>{repo.reviewerName}</h1>
                    <p>{repo.product} ({repo.rating}.0)</p> 
                    <p className='text-sm'>{repo.description}</p>
                </motion.div>

                </SwiperSlide>)}
        
        

      </Swiper>
        </div>
       </div>
    );
};

export default Reviews;