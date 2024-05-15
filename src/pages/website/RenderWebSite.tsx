
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../../services/admin/eventService.service';
import { ListSections } from '../../components/website/components/sections/ListSections';
import Header from '../../components/website/components/Header';
import Footer from '../../components/website/components/Footer';


interface WebConfigType {
    header: boolean,
    footer: boolean,
    sections: { name: string }[]
}

export default function RenderWebSite() {
    const params = useParams();
    const [webConfig, setWebConfig] = useState<WebConfigType>();
    const fetchWebConfig = async () => {
        const eventRs = await eventService.getEventByID(params.id)
        if (!eventRs?.statusCode) {
            if (eventRs?.data?.webConfig !== "") setWebConfig(JSON.parse(eventRs?.data?.webConfig))
        }
    }
    useEffect(() => {
        fetchWebConfig();
    }, [])
    let Component: any = [];
    if (webConfig?.header) Component.push(Header) 
    webConfig?.sections?.forEach(element => {
        Component.push(...ListSections.filter((Section: any) => Section?.name === element?.name))
    }); 
    if (webConfig?.footer) Component.push(Footer) 
    return (
        <div className='bg-white flexible-box flex-grow ' >
            {
                Component.map((Comp: any, index: number) => (
                    <div key={index}  >
                        <div  >
                            <Comp />
                        </div> 
                    </div>
                ))
            }
        </div>
    );
}

