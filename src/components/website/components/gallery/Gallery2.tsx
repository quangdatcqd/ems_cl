import React from 'react';

export const Gallery2Config = {

    name: "Gallery2",
    bgType: "color",
    bgValue: "white",
    elements: [
        {
            name: "text",
            text: "View Gallery"
        },
        {
            name: "text",
            text: "There may be no better way to communicate what we do than through images. As you browse our site, take a few moments to let your eyes linger here, and see if you can get a feel for our signature touch."
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

export default function Gallery2({ config = Gallery2Config }: any): React.JSX.Element { 
    return (
        <div className={`w-100 p-5 py-20`}    >
            <div className='w-[650px]  mx-auto  '>
                <p className='text-center text-5xl text-[#266445] font-["DINNeuzeitGrotesk"] ' dangerouslySetInnerHTML={{ __html: config.elements[0].text  }}></p>
                <p className='text-[#266445] text-center mt-8 font-["Avenir-Light"] ' dangerouslySetInnerHTML={{ __html: config.elements[1].text  }}></p>
            </div>
            <div className="grid grid-rows-2 mt-10 gap-4 grid-flow-col ">
                {/* Dòng 1 */}
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
