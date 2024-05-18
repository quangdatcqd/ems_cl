import React from 'react';

export const Gallery1Config = {

    name: "Gallery1",
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
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_dbff3970b37f4d8bb013ece00b3fd41f~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_dbff3970b37f4d8bb013ece00b3fd41f~mv2.webp"
        },
        {
            name: "image",
            text: "https://static.wixstatic.com/media/a3c153_61df4a3793024ffb896d50abc9370f0b~mv2.jpg/v1/fit/w_895,h_276,q_90/a3c153_61df4a3793024ffb896d50abc9370f0b~mv2.webp"
        }

    ]
}

export default function Gallery1({ config = Gallery1Config }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 bg-no-repeat  py-20 bg-cover`} style={{ minHeight: "500px", ...styled }}  >
            {/* <img src={bgImage} className='w-full' alt="" /> */}
            <div className='container rounded   mx-auto  '>
                <div className='w-[650px]  mx-auto  '>
                    <p className='text-center text-5xl text-[#266445] font-["DINNeuzeitGrotesk"] ' dangerouslySetInnerHTML={{ __html: config.elements[0].text }}></p>
                    {/* <TextElement text={"Wellcome"} /> */}
                    <p className='text-[#266445] text-center mt-8 font-["Avenir-Light"] ' dangerouslySetInnerHTML={{ __html: config.elements[1].text }}></p>
                </div>
                <div className='text-center my-10'>
                    <div className="grid grid-cols-3 gap-8">
                        {
                            config.elements.map((image: any, index: number) => {
                                if (image.name === "image" && image.text)
                                    return (
                                        <img key={index} height={300} width={"100%"} className='object-cover h-[300px]' src={image.text}></img>
                                    )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
