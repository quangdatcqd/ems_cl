import React from 'react';

export const Service1Config = {
    name: "Service1",
    bgType: "color",
    bgValue: "#F5EDE5",
    elements: [
        {
            name: "text",
            text: "Services",
            ENG_text: "Services",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "Provide a general description of the items below and introduce the services you offer. Click on the text box to edit the content.",
            ENG_text: "Provide a general description of the items below and introduce the services you offer. Click on the text box to edit the content.",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        },
        {
            name: "text",
            text: "Service Name",
            ENG_text: "Service Name",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.",
            ENG_text: "Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        },
        {
            name: "text",
            text: "Service Name",
            ENG_text: "Service Name",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "2Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.",
            ENG_text: "2Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        }, {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_b6b1b3c3a6fd43a784fd8e28390261e9~mv2.webp"
        },
        {
            name: "text",
            text: "Service Name",
            ENG_text: "Service Name",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "3Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.",
            ENG_text: "3Describe your service here. What makes it great? Use short catchy text to tell people what you offer, and the benefits they will receive. A great description gets readers in the mood, and makes them more likely to go ahead and book.",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        }
    ]
}

export default function Service1({ config = Service1Config, activeLang="ENG_text" }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100   bg-no-repeat  bg-cover py-20`} style={{ minHeight: "500px", ...styled }}  >
            <div className='w-[960px]  mx-auto    '>
                <p className={`font-["DINNeuzeitGrotesk"] font-[500] text-6xl`}
                    dangerouslySetInnerHTML={{ __html: config.elements[0][activeLang] }}
                    style={{
                        textAlign: config.elements[0].align,
                        color: config.elements[0].color
                    }}></p>
                <div className=' flex justify-center'>
                    <p className={`w-[80%] mt-5`}
                        dangerouslySetInnerHTML={{ __html: config.elements[1][activeLang] }}
                        style={{
                            textAlign: config.elements[1].align,
                            color: config.elements[1].color
                        }}></p>
                </div>
                <div className='grid grid-cols-3 mt-8  '>
                    {
                        config?.elements?.map((element: any, index: number) => {
                            if (element.name === "image")
                                return (
                                    <div key={index} className='gird flex flex-col justify-center items-center'>
                                        <img src={element.text} alt="" className='w-32 h-32 rounded-full object-cover' />

                                        <p className={`my-5 text-xl font-[700] font-["DINNeuzeitGrotesk"] leading-7`}
                                            style={{
                                                textAlign: config.elements[index + 1].align,
                                                color: config.elements[index + 1].color
                                            }}>{config.elements[index + 1][activeLang]}</p>

                                        <div className='w-[80%]'>
                                            <p className={`font-["Avenir-Light"] leading-7`}
                                                style={{
                                                    textAlign: config.elements[index + 2].align,
                                                    color: config.elements[index + 2].color
                                                }}>{config.elements[index + 2][activeLang]}</p>
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
