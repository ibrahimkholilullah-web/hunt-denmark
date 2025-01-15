import React from 'react';
import Navber from '../Rout/Home/Navber';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='w-11/12  mx-auto'>
            <Navber></Navber>
            <div className=' pt-28 '>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;