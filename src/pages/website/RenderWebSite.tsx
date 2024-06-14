
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import eventService from '../../services/admin/eventService.service';
import { WebConfigType } from '../../context/webEditorContext';
import { WebComponents } from '../../components/website/components/WebComponent';
import { NavTemplates } from '../../components/website/components/WebTemplates';
import eventParticipantService from '../../services/client/eventParticipant.service';
import toast from 'react-hot-toast';
import { paths } from '../../paths';

export function WebRender() {
    const params = useParams();
    const navigator = useNavigate();
    const [webConfig, setWebConfig] = useState<WebConfigType[]>();


    const fetchWebConfig = async () => {
        const eventRs = await eventService.getWebConfigEvent(params.id) 
        if (eventRs?.data?.webConfig !== "") setWebConfig(JSON.parse(eventRs?.data?.webConfig))

    }

    useEffect(() => {
        if (params?.template) {
            const template = NavTemplates.find(temp => temp.name === params.template);
            if (template) setWebConfig(template.config)
        }
        if (params?.id) fetchWebConfig();
    }, [])

    
    return (
        <div className='bg-white flexible-box flex-grow'  >
            {
                webConfig?.map((element, index) => {
                    const Element: any = WebComponents.find(Section => Section.component.name === element.name);
                    return (<Element.component key={index} config={element} />)
                })
            }
            <Link to={paths.website.joinEventPath + params.id}><div className='join_button' >Join now</div></Link>
        </div>
    );
}








