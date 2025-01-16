import React from 'react';
import Navber from '../Rout/Home/Navber';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div className='mx-auto'>
            <Navber></Navber>
            <div className=' pt-[80px] '>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;