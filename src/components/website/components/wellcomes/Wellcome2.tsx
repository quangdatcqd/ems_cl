import React from 'react';
export const Wellcome2Config = {
    name: "Wellcome2",
    bgType: "color",
    bgValue: "#312F2E",
    elements: [
        {
            name: "text",
            text: "", 
            ENG_text: "Welcome <br/>to Our Site",
            VI_text: "",
            TW_text: "",
            color: "white",
            align: "center"
        },
        {
            name: "text",
            text: "",
            ENG_text: "Welcome visitors to your site with a short, engaging introduction. Double click to edit and add your own text.", 
            VI_text: "",
            TW_text: "",
            color: "white",
            align: "center"
        },

    ]
}

export default function Wellcome2({ config = Wellcome2Config, activeLang="ENG_text" }: any): React.JSX.Element {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className={`w-100 relative bg-no-repeat  bg-cover`} style={{ ...styled }}  >
            <div className=' w-[980px] flex justify-between rounded   mx-auto   py-10'>
                <div className={`w-[40%] my-10 text-5xl font-["DINNeuzeitGrotesk"]`}
                    dangerouslySetInnerHTML={{ __html: config.elements[0][activeLang] }}
                    style={{
                        textAlign: config.elements[0].align,
                        color: config.elements[0].color
                    }} />
                <div className={`mt-10 w-[50%]`}
                    dangerouslySetInnerHTML={{ __html: config.elements[1][activeLang] }}
                    style={{
                        textAlign: config.elements[1].align,
                        color: config.elements[1].color
                    }}/>
            </div>
        </div>
    );
}
