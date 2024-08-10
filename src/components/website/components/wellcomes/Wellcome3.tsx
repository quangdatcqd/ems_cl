import React from 'react';
import Button1 from '../elements/Button1';

export const Wellcome3Config = {
    name: "Wellcome3",
    bgType: "color",
    bgValue: "white",
    elements: [
        {
            name: "text",
            text: "Empower<br/>Growth",
            ENG_text: "Empower<br/>Growth",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.",
            ENG_text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.",
            VI_text: "",
            TW_text: "",
            color: "#266445",
            align: "center"
        },
        {
            name: "image",
            text: "/assets/background-images/bg1.webp"
        },

    ]
}

export default function Wellcome3({ config = Wellcome3Config , activeLang="ENG_text"}: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 flex`} style={{ minHeight: "500px" }}>
            <div className='bg-no-repeat  bg-cover h-100 w-[50%]   flex items-center flex-col  justify-center ' style={styled} >
                <div className='w-[80%]'>
                    <p className={`font-["DINNeuzeitGrotesk"] font-[500] text-5xl`} 
                        dangerouslySetInnerHTML={{ __html: config.elements[0][activeLang] }}
                        style={{
                            textAlign: config.elements[0].align,
                            color: config.elements[0].color
                        }} />
                    <div className='flex justify-center'>
                        <p className={`w-[30rem] mt-10 `}
                            dangerouslySetInnerHTML={{ __html: config.elements[1][activeLang] }}
                            style={{
                                textAlign: config.elements[1].align,
                                color: config.elements[1].color
                            }} />
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
