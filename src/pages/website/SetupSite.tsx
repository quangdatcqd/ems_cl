
import * as React from 'react';
import { SideNav } from '../../components/website/side-nav';
import WebEditor from '../../components/website/web-editor';
import { MainNav } from '../../components/website/main-nav';
import eventService from '../../services/admin/eventService.service';
import { useParams } from 'react-router-dom';
import { getLocalStorage } from '../../helpers/common.helper';

interface WebConfigs {
    header: boolean,
    footer: boolean,
    sections:
    {
        name: string,
    }[],
}

export default function SetupSite() {

    const params = useParams();
    const [dragCompName, setDragCompName] = React.useState<string>("");
    const [webConfig, setWebConfig] = React.useState<any>({ header: true, footer: true, sections: [] });
    const [eventData, setEventData] = React.useState<any>();

    const fetchWebConfig = async () => {
        const eventRs = await eventService.getEventByID(params.id)
        if (!eventRs?.statusCode) { 
            setEventData(eventRs?.data)
            if (eventRs?.data?.webConfig !== "") setWebConfig(JSON.parse(eventRs?.data?.webConfig))
            else {
                const configCache = getLocalStorage("webConfig"); 
                if (configCache.id === params.id) setWebConfig(configCache.config) 
            }
        }
    }
    React.useEffect(() => {
        fetchWebConfig();
    }, [])

    const handleDrag = (name: string) => {
        setDragCompName(name)
    }
    const handleDragEnter = (index: number) => {
        const webFG = webConfig;
        webFG?.sections.splice(index, 0, {
            name: dragCompName
        })
        const cacheConfig = {
            config: webFG,
            id: params.id
        }
        localStorage.setItem("webConfig", JSON.stringify(cacheConfig))
        setWebConfig({ ...webFG });
    }


    return (
        <>
            <MainNav eventData={{...eventData, webConfig:JSON.stringify(webConfig)}} />
            <div className='flex '>
                <SideNav handleDrag={handleDrag} />
                <WebEditor webConfigs={webConfig} handleDragEnter={handleDragEnter} />
            </div>
        </>
    );
};
