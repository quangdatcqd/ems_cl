import React from 'react';
import Button1 from '../elements/Button1';

export const Wellcome3Config = {
    name: "Wellcome3",
    bgType: "color",
    bgValue: "white",
    elements: [
        {
            name: "text",
            text: "Empower<br/>Growth"
        },
        {
            name: "text",
            text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text."
        },
        {
            name: "image",
            text: "/assets/background-images/bg1.webp"
        },

    ]
}

export default function Wellcome3({ config = Wellcome3Config }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 flex`}  style={{minHeight: "500px"}}>
            <div className='bg-no-repeat  bg-cover h-100 w-[50%]   flex items-center flex-col  justify-center '  style={styled  } >
                <div className='w-[80%]'>
                    <p className='font-["DINNeuzeitGrotesk"] font-[500] text-center text-5xl text-[#266445]' dangerouslySetInnerHTML={{ __html: config.elements[0].text }}></p>
                    <div className='flex justify-center'>
                        <p className='text-[#266445] w-[30rem]  text-center mt-10  ' dangerouslySetInnerHTML={{ __html: config.elements[1].text }}></p>
                    </div>
                    <div className='text-center my-10'>
                        <Button1 title="Start Now" />
                    </div>
                </div>
            </div>
            <img src={config.elements[2].text} width={"50%"} alt="" />
        </div>
    );
}
