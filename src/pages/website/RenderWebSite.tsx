
 
import { ListSections } from '../../components/website/components/sections/ListSections';
import { ListHeaders } from '../../components/website/components/headers/ListHeaders';
import { ListFooters } from '../../components/website/components/footers/ListFooters';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import eventService from '../../services/admin/eventService.service';
import { WebConfigType } from '../../context/webEditorContext';
 
export default function WebEditor() { 

    const params = useParams();
    const [webConfig, setWebConfig] = useState<WebConfigType[]>();
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
    webConfig?.forEach((element, index) => {
        let Element: any = ListSections.find(Section => Section.name === element.name);
        Element && Component.push( <Element key={index} config={element}/> )

        Element = ListHeaders.find(Section => Section.name === element.name);
        Element && Component.push(<Element key={index} config={element}/>   )
        Element = ListFooters.find(Section => Section.name === element.name);
        Element && Component.push(<Element key={index} config={element}/> ) 
    }); 
    return (
        <div className='bg-white flexible-box flex-grow'  > 
            {   Component }
        </div>
    );
}








 