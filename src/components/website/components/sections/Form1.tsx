import React from 'react';
import Input1 from '../elements/Input1';
import LongInput from '../elements/LongInput';
import Button1 from '../elements/Button1';


export const  Form1Config = {
    name:"Form1",
    bgType: "image",
    bgValue: "/assets/background-images/bg1.webp",
    elements: [
      {
        name: "text",
        text: "WELCOME"
      },
      {
        name: "text",
        text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text."
      },

    ]
}
export default function Form1({config = Form1Config}:any): React.JSX.Element {
   
    let styled = config.bgType === "image" ? { backgroundImage: `url('${config.bgValue}')` } : { backgroundColor: config.bgValue }
  
    return (
        <div className={`w-100 relative`} style={{ minHeight: "700px", ...styled }}  >
            <div className='p-10  flex bg-[#ffffff]   max-w-[20rem] absolute  sm:max-w-[20rem] md:max-w-[50rem] rounded left-1/2 -translate-x-1/2   top-1/2 transform -translate-y-1/2 '>
                <div className='w-[40rem] p-5 flex flex-col justify-between'>
                    <h1 className='text-[2rem] text-center leading-10'>Leave us a message and we'll get back to you.</h1>
                    <img src="/assets/background-images/bg2.webp" className='mt-5 rounded-2xl' alt="" />
                </div>
                <div className='md:max-w-[18rem] p-5'>
                    <Input1 label='Full Name' />
                    <Input1 label='Email' />
                    <Input1 label='Subject' />
                    <Input1 label='Message' />
                    <LongInput label='Type your message here...' name='message' /> 
                    <Button1  title='Submit'   />
                </div>
            </div>
        </div>
    );
}
