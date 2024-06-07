 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import eventService from '../../services/admin/eventService.service';
import { WebConfigType } from '../../context/webEditorContext'; 
import { WebComponents } from '../../components/website/components/WebComponent';
import { NavTemplates } from '../../components/website/components/WebTemplates';

export  function WebRender() {

    const params = useParams();
    const [webConfig, setWebConfig] = useState<WebConfigType[]>();
    const fetchWebConfig = async () => {
        const eventRs = await eventService.getEventByID(params.id)
        if (!eventRs?.statusCode) {
            if (eventRs?.data?.webConfig !== "") setWebConfig(JSON.parse(eventRs?.data?.webConfig))
        }
    }
    useEffect(() => { 
        if(params?.template){
            const template = NavTemplates.find(temp =>temp.name===params.template);
            if(template) setWebConfig(template.config)
        }
        if(params?.id) fetchWebConfig();
    }, [])
    return (
        <div className='bg-white flexible-box flex-grow'  >
            {
                webConfig?.map((element, index) => {
                    const Element: any = WebComponents.find(Section => Section.component.name === element.name);
                    return(<Element.component key={index} config={element} />)
                })
            }
            <div className='join_button'>Join now</div>
        </div>
    );
}








