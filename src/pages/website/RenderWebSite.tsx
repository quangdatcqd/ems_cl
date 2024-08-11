
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import eventService from '../../services/admin/eventService.service';
import { WebComponents } from '../../components/website/components/WebComponent';
import { NavTemplates } from '../../components/website/components/WebTemplates';
import { paths } from '../../paths';
import TaiwandFlag from '../../assets/flags/taiwand_flag.png';
import UKFlag from '../../assets/flags/UK_flag.png';
import VIFlag from '../../assets/flags/VI_flag.png';
import { EventDataType } from '../../interface/event';

export function WebRender() {
    const params = useParams();
    const [eventData, setEventData] = useState<EventDataType>();
    const [eventTemplate, setTemplate] = useState<EventDataType>();
    const [activeLang, setActiveLang] = useState<"ENG" | "TW" | "VI">("ENG");

    const fetchEventData = async () => {
        const eventRs = await eventService.getWebConfigEvent(params.id)
        if (eventRs?.data) setEventData(eventRs?.data)

    }

    useEffect(() => {
        if (params?.template) {
            const template = NavTemplates.find(temp => temp.name === params.template);
            if (template) setTemplate(template.config)
        }
        if (params?.id) fetchEventData();
    }, []) 
    const webConfigs = (eventData?.webConfig &&  eventData?.webConfig !== "" ) ? JSON.parse(eventData?.webConfig) : eventTemplate 
    return (
        <div className='bg-white flexible-box flex-grow'  >
            <div className='group fixed -top-2 right-1 z-10 text-sm bg-white p-2 pt-5 rounded-md'>
                <div className='group-hover:flex hidden flex-col gap-2  '> 
                    {
                        eventData?.languages?.split(",")?.map((lang: string, index: number) => {
                            if (lang === "EN")
                                return <div key={index} onClick={() => setActiveLang("ENG")} className='rounded-full cursor-pointer flex flex-col items-center font-[500]'> <img src={UKFlag} className='w-6' alt="" /> ENG </div>
                            if (lang === "TW")
                                return <div key={index} onClick={() => setActiveLang("TW")} className='rounded-full cursor-pointer flex flex-col items-center font-[500]'> <img src={TaiwandFlag} className='w-6' alt="" /> TW </div>
                            if (lang === "VI")
                                return <div key={index} onClick={() => setActiveLang("VI")} className='rounded-full cursor-pointer flex flex-col items-center font-[500]'> <img src={VIFlag} className='w-6' alt="" /> VIE </div>
                        })
                    }
                </div>
                <div className='group-hover:hidden block'>
                    {
                        eventData?.languages?.split(",")?.map((lang: string, index: number) => {
                            if (lang === "EN" && activeLang === "ENG")
                                return <div key={index} className='rounded-full cursor-pointer flex flex-col items-center font-[500]'> <img src={UKFlag} className='w-6' alt="" /> ENG </div>
                            if (lang === "TW" && activeLang === "TW")
                                return <div key={index} className='rounded-full cursor-pointer flex flex-col items-center font-[500]'> <img src={TaiwandFlag} className='w-6' alt="" /> TW </div>
                            if (lang === "VI" && activeLang === "VI")
                                <div key={index} className='rounded-full cursor-pointer flex flex-col items-center font-[500]'> <img src={VIFlag} className='w-6' alt="" /> VIE </div>
                        })
                    }
                </div>
            </div>


            {
                webConfigs?.map((element: any, index: number) => {
                    const Element: any = WebComponents.find(Section => Section.component.name === element.name);
                    return (<Element.component key={index} config={element} activeLang={activeLang + "_text"} />)
                })
            }
            <Link to={paths.website.joinEventPath + params.id}><div className='join_button' >Join now</div></Link>
        </div>
    );
}








