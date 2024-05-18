import React from 'react';

export const Service1Config = {
    name: "Service1",
    bgType: "color",
    bgValue: "#F5EDE5",
    elements: [
        {
            name: "text",
            text: "Services"
        },
        {
            name: "text",
            text: "Provide a general description of the items below and introduce the services you offer. Click on the text box to edit the content."
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        },
        {
            name: "text",
            text: "Service Name"
        },
        {
            name: "text",
            text: "1Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book."
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        },
        {
            name: "text",
            text: "Service Name"
        },
        {
            name: "text",
            text: "2Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book."
        }, {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        },
        {
            name: "text",
            text: "Service Name"
        },
        {
            name: "text",
            text: "3Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book."
        }
    ]
}

export default function Service1({ config = Service1Config }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100   bg-no-repeat  bg-cover py-20`} style={{ minHeight: "500px", ...styled }}  >
            <div className='w-[960px]  mx-auto text-[#266445]   '>
                <p className='font-["DINNeuzeitGrotesk"] font-[500] text-center text-6xl ' dangerouslySetInnerHTML={{ __html: config.elements[0].text }}></p>
                <div className=' flex justify-center'>
                    <p className='  w-[80%] text-center mt-5' dangerouslySetInnerHTML={{ __html: config.elements[1].text }}></p>
                </div>
                <div className='grid grid-cols-3 mt-8  '>
                    {
                        config.elements.map((element: any, index: number) => {
                            if (element.name === "image")
                                return (
                                    <div key={index} className='gird flex flex-col justify-center items-center'>
                                        <img src={element.text} alt="" className='w-32 h-32 rounded-full object-cover' />
                                        <p className='my-5 text-xl font-[700] font-["DINNeuzeitGrotesk"]'>{config.elements[index + 1].text}</p>
                                        <div className='w-[80%]'>
                                            <p className='text-center font-["Avenir-Light"] leading-7'>{config.elements[index + 2].text}</p>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
