
export interface Footer1ConfigType {
    name: string,
    bgType: string,
    bgValue: string,
    elements:
    {
        name: string,
        text: string
    }
}

export const Footer1Config = {
    name: "Footer1",
    bgType: "color",
    bgValue: "white",
    elements: [
        {
            name: "image",
            text: "/assets/logos/logo1.png"
        },
        {
            name: "text",
            text: "500 Terry Francine Street<br/>San Francisco CA 94158",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: " Tel: 123-456-7890 <br/> Fax: 123-456-7890<br/>info@mysite.com",
            color: "#266445",
            align: "center"
        },
        {
            name: "text",
            text: "©2035 by Twilight Events. Powered and secured by DOT",
            color: "#266445",
            align: "center"
        },

    ]
}


export default function Footer1({ config = Footer1Config }: any) {
    let styled = config?.bgType === "image" ? { backgroundImage: `url('${config?.bgValue}')` } : { backgroundColor: config?.bgValue }
    return (
        <div className='bg-white py-10 bg-no-repeat bg-cover' style={{ ...styled }} >
            <div className=' w-[980px] mx-auto flex justify-center h-24 items-center  '>
                <div className='w-60  '>
                    <img src={config.elements[0].text} width={80} className='object-cover transform scale-150' alt="" />
                </div>
                <div className={`w-60`}
                    dangerouslySetInnerHTML={{ __html: config.elements[1].text }}
                    style={{
                        textAlign: config.elements[1].align,
                        color: config.elements[1].color
                    }} />
                <div className={`w-60`}
                    dangerouslySetInnerHTML={{ __html: config.elements[2].text }}
                    style={{
                        textAlign: config.elements[2].align,
                        color: config.elements[2].color
                    }} />
                <div className={`w-60`}
                    dangerouslySetInnerHTML={{ __html: config.elements[3].text }}
                    style={{
                        textAlign: config.elements[3].align,
                        color: config.elements[3].color
                    }} />
            </div>
        </div>
    );
}
