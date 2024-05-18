import React from 'react';
import Button1 from '../elements/Button1';

export const Wellcome1Config = {
    name: "Wellcome1",
    bgType: "image",
    bgValue: "/assets/background-images/bg1.webp",
    elements: [
        {
            name: "text",
            text: "Wellcome",
            color: "#266445",
            align: "center"

        },
        {
            name: "text",
            text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.",
            color: "#266445",
            align: "center"
        },

    ]
}

export default function Wellcome1({ config = Wellcome1Config }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 relative bg-no-repeat  bg-cover`} style={{ minHeight: "500px", ...styled }}  >
            <div className='bg-[#ffffff] max-w-[20rem]  sm:max-w-[30rem] md:max-w-[40rem] rounded   mx-auto   transform translate-y-1/4 px-5 py-10'>
                <p className={`font-["DINNeuzeitGrotesk"]  font-[500]   text-5xl `}
                    dangerouslySetInnerHTML={{ __html: config.elements[0].text }}
                    style={{ textAlign: config.elements[0].align, color: config.elements[0].color }}
                ></p>

                <p className={`mt-10`}
                    style={{ textAlign: config.elements[1].align, color: config.elements[1].color }}
                    dangerouslySetInnerHTML={{ __html: config.elements[1].text }}></p>
                <div className='text-center my-10'>
                    <Button1 title="Start Now" />
                </div>
            </div>
        </div>
    );
}
