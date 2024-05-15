import React from 'react';
import Button1 from '../elements/Button1';
 

interface PropTypes {
    bgImage: string,

};

export default function Section1(): React.JSX.Element { 
    return ( 
         <div className={`w-100 relative bg-bg-temp-1 `} style={{minHeight:"500px" }}  >
            {/* <img src={bgImage} className='w-full' alt="" /> */}
            <div className='bg-[#ffffff] max-w-[20rem]  sm:max-w-[30rem] md:max-w-[40rem] rounded   mx-auto   transform translate-y-1/4 px-5 py-10'>
                <p className='uppercase font-[500] text-center text-5xl text-[#361502]'>Wellcome</p>
                <p className='text-[#361502] text-center mt-10'>
                    Welcome visitors to your site with a short, engaging introduction. <br />
                    Double click to edit and add your own text.
                </p>
                <div className='text-center my-10'>
                    <Button1 title="Start Now"  />
                </div>
            </div>
        </div>
    );
}
