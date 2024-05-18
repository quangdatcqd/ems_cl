import React from 'react';
export const Wellcome2Config = {
    name: "Wellcome2",
    bgType: "color",
    bgValue: "#312F2E",
    elements: [
        {
            name: "text",
            text: "Welcome <br/>to Our Site"
        },
        {
            name: "text",
            text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text."
        },

    ]
}

export default function Wellcome2({ config = Wellcome2Config }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 relative bg-no-repeat  bg-cover`} style={{ ...styled }}  >
            <div className=' w-[980px] flex justify-between rounded text-white  mx-auto   py-10'>
                <div className='text-left w-[40%] my-10 text-5xl font-["DINNeuzeitGrotesk"]' dangerouslySetInnerHTML={{ __html: config.elements[0].text }} />
                <div className='text-left mt-10 w-[50%]' dangerouslySetInnerHTML={{ __html: config.elements[1].text }}></div>
            </div>
        </div>
    );
}
