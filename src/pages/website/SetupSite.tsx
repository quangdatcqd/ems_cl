
import * as React from 'react';
import { SideNav } from '../../components/website/side-nav';
import WebEditor from '../../components/website/web-editor';
import { MainNav } from '../../components/website/main-nav';
import eventService from '../../services/admin/eventService.service';
import { useParams } from 'react-router-dom';
import { getLocalStorage } from '../../helpers/common.helper';
import GenericNotFound from '../../components/GenericNotFound';
import { useWebEditorConfig } from '../../provider/webEditorProvider';

export default function SetupSite() {

    const params = useParams();
    const [eventData, setEventData] = React.useState<any>(null);
    const { setWebConfigs } = useWebEditorConfig();
    const [activeKey, setActiveKey] = React.useState('');
    const fetchWebConfig = async () => {
        const eventRs = await eventService.getEventByID(params.id)
        setEventData(eventRs?.data)
        if (!eventRs?.statusCode) {
            if (eventRs?.data?.webConfig !== "") setWebConfigs(JSON.parse(eventRs?.data?.webConfig))
            else {
                const configCache = getLocalStorage("webConfig");
                if (configCache?.id === params?.id) setWebConfigs(configCache?.config)
            }
        }
    }
    React.useEffect(() => {
        fetchWebConfig();
    }, [])
    return (
        <>
            {
                eventData !== undefined ? <>
                    <MainNav eventData={eventData} />
                    <div className=' '>
                        <SideNav setActiveKey={setActiveKey} activeKey={activeKey} />
                        <WebEditor setActiveKey={setActiveKey} languages={eventData?.languages}/>
                    </div>
                </> : <GenericNotFound />
            }

        </>
    );
};
