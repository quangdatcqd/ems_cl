import React from 'react';

function Header() {
    return (
        <div className='bg-white px-10  py-2 '>
            <div className=' w-[90%] mx-auto flex justify-between h-24 items-center  '>
                <div className='w-36 overflow-hidden '>
                    <img src="/assets/logos/logo1.png" width={100} className='object-cover transform scale-150' alt="" />
                </div>
                <div className='h-100'>
                    <ul className='flex gap-10 text-[18px] font-[500] text-slate-500'>
                        <li className='py-0 px-1  border-b-4 border-white hover:border-red-100 hover:text-red-400 cursor-pointer'> Home </li>
                        <li className='py-0 px-1  border-b-4 border-white hover:border-red-100 hover:text-red-400 cursor-pointer'>Service</li>
                        <li className='py-0 px-1  border-b-4 border-white hover:border-red-100 hover:text-red-400 cursor-pointer'>About</li>
                        <li className='py-0 px-1  border-b-4 border-white hover:border-red-100 hover:text-red-400 cursor-pointer'>Contact</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;