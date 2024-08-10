import React from 'react';

export const Gallery2Config = {

    name: "Gallery2",
    bgType: "color",
    bgValue: "white",
    elements: [
        {
            name: "text",
            text: "View Gallery",
            ENG_text: "View Gallery",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "There may be no better way to communicate what we do than through images. As you browse our site, take a few moments to let your eyes linger here, and see if you can get a feel for our signature touch.",
            ENG_text: "There may be no better way to communicate what we do than through images. As you browse our site, take a few moments to let your eyes linger here, and see if you can get a feel for our signature touch.",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_8ebcdf4b28f141ef9924a3ee58a8099a~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_8ebcdf4b28f141ef9924a3ee58a8099a~mv2.webp"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_8126f3379c9147728962ba3691f282c8~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_8126f3379c9147728962ba3691f282c8~mv2.webp"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_78a5d714a07d456e8706bd1803304649~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_78a5d714a07d456e8706bd1803304649~mv2.webp"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        }

    ]
}

export default function Gallery2({ config = Gallery2Config, activeLang="ENG_text" }: any): React.JSX.Element {
    return (
        <div className={`w-100 p-5 py-20`}    >
            <div className='w-[650px]  mx-auto  '>
                <p className={`text-5xl font-["DINNeuzeitGrotesk"]`}
                    dangerouslySetInnerHTML={{ __html: config.elements[0][activeLang]}} style={{
                        textAlign: config.elements[0].align,
                        color: config.elements[0].color
                    }} />
                    
                <p className={`mt-8 font-["Avenir-Light"]`}
                    dangerouslySetInnerHTML={{ __html: config.elements[1][activeLang]}}
                    style={{
                        textAlign: config.elements[1].align,
                        color: config.elements[1].color
                    }} />
            </div>
            <div className="grid grid-rows-2 mt-10 gap-4 grid-flow-col ">
                <div className="row-span-1 col-span-4">
                    <img src={config.elements[2].text} alt="Image 1" className="w-full object-cover h-[18rem]" />
                </div>
                <div className="row-span-1 col-span-3">
                    <img src={config.elements[3].text} alt="Image 2" className="w-full object-cover  h-[17rem]" />
                </div>
                <div className="row-span-1 col-span-1">
                    <img src={config.elements[4].text} alt="Image 3" className="w-full object-cover  h-[17rem]" />
                </div>
                <div className="row-span-2 col-span-12">
                    <img src={config.elements[5].text} alt="Image 4" className="w-full object-cover  h-[36rem]" />
                </div>
            </div>
        </div>
    );
}
