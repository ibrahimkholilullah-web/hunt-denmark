import { Carousel, Typography } from '@material-tailwind/react';
import React from 'react';
import banner1 from "../../../assets/Image/banner1.jpg";
import banner2 from "../../../assets/Image/banner2.jpg";
import banner3 from "../../../assets/Image/banner3.jpg";

const Banner = () => {
    return (
     <div className='bg-[#BCE3C9] '>
           <Carousel className="h-[50vh] w-11/12  mx-auto sm:h-[60vh] md:h-[70vh] lg:h-[70vh] xl:h-[80vh]">
            {/* Slide 1 */}
            <div className="relative h-full w-full">
                <img
                    src={banner1}
                    alt="banner 1"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="w-11/12 text-center md:w-2/3 lg:w-1/2">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl text-[#D98855] font-bold varela"
                        >
                            Centralized Mac maintenance for teams
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-8 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 style-new"
                        >
                           CleanMyMac Business offers a centralized solution for small and medium teams to maintain and optimize their Mac systems, ensuring peak performance and security across all devices.
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Slide 2 */}
            <div className="relative h-full w-full">
                <img
                    src={banner2}
                    alt="banner 2"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center bg-black/50">
                    <div className="w-11/12 pl-4 md:w-2/3 md:pl-12 lg:pl-16">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold varela"
                        >
                            An AI face swapper for videos and images
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-8 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 style-new"
                        >
                            ClipZap employs advanced AI technology to seamlessly swap faces in both videos and images, providing a user-friendly interface for creative content editing.
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Slide 3 */}
            <div className="relative h-full w-full">
                <img
                    src={banner3}
                    alt="banner 3"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-end bg-black/40">
                    <div className="w-11/12 pl-4 pb-4 md:w-2/3 md:pl-12 md:pb-12 lg:pl-16 lg:pb-16">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold varela"
                        >
                            Search the world with your mind-map AI
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 style-new"
                        >
                            Minduck Discovery utilizes AI to transform traditional search methods, allowing users to explore information through intuitive mind-mapping, enhancing learning and research efficiency.
                        </Typography>
                    </div>
                </div>
            </div>
        </Carousel>
     </div>
    );
};

export default Banner;
