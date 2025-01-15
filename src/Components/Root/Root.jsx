import React from 'react';
import Navber from '../Rout/Home/Navber';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='mx-auto'>
            <Navber></Navber>
            <div className=' pt-[81px] '>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;