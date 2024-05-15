import React from 'react';

function Footer() {
    return (
        <div className='bg-white p-10    '>
            {/* <div className='w-100   flex items-center justify-center '>
                    <img src="/assets/logos/logo1.png" width={100} className='object-cover transform scale-150' alt="" />
                </div> */}
            <div className=' w-[90%] mx-auto flex justify-center h-24 items-center  '>
                <div className='w-60  '>
                <img src="/assets/logos/logo1.png" width={80} className='object-cover transform scale-150' alt="" />
                </div>
                <div className='w-60  '>
                    500 Terry Francine Street <br />
                    San Francisco CA 94158
                </div>
                <div className='w-60 '>
                    Tel: 123-456-7890 <br />
                    Fax: 123-456-7890<br />
                    info@mysite.com
                </div>
                <div className='w-60'>
                    ©2035 by Twilight Events.   <br />
                    Powered and secured by DOT
                </div>
            </div>
            {/* <div className='w-100 border-t-2 border-red-200' ></div> */}
        </div>
    );
}

export default Footer;