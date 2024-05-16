import React from 'react';
import Button1 from '../elements/Button1';
import TextElement from '../elements/TextElement';

export const Section1Config = {
    name: "Section1",
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

export default function Section1({ config=Section1Config }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 relative  `} style={{ minHeight: "500px", ...styled }}  >
            {/* <img src={bgImage} className='w-full' alt="" /> */}
            <div className='bg-[#ffffff] max-w-[20rem]  sm:max-w-[30rem] md:max-w-[40rem] rounded   mx-auto   transform translate-y-1/4 px-5 py-10'>
                <p className='uppercase font-[500] text-center text-5xl text-[#361502]' dangerouslySetInnerHTML={{ __html: config.elements[0].text }}></p>
                {/* <TextElement text={"Wellcome"} /> */}
                <p className='text-[#361502] text-center mt-10' dangerouslySetInnerHTML={{ __html: config.elements[1].text }}></p>
                <div className='text-center my-10'>
                    <Button1 title="Start Now" />
                </div>
            </div>
        </div>
    );
}
