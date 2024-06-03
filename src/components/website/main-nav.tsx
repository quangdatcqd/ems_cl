

import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import eventService from '../../services/admin/eventService.service';
import toast from 'react-hot-toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
import { useWebEditorConfig } from '../../provider/webEditorProvider';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { EventDataType } from '../../types/event';




export function MainNav({ eventData }: { eventData: EventDataType }): React.JSX.Element {
  const [loading, setLoading] = React.useState(false)
  const router = useNavigate();
  const { webConfigs,setWebConfigs } = useWebEditorConfig();

  const handleUpdateWebConfig = async () => {
    setLoading(true)
    const dataSave = await eventService.modifyEvent({ ...eventData, webConfig: JSON.stringify(webConfigs) })
    if (dataSave?.statusCode) {
      toast.error(dataSave.message);
    } else {
      toast.success("Updated!", { position: "top-center" });

    }
    setLoading(false)
  }
  return (
    <div className='h-[80px] fixed flex items-center justify-between  bg-white w-[100%]  z-[61] top-0 left-0 web-side-nav px-10'>

      <div>
        <Button
          component="label"
          role={undefined}
          variant="text"
          tabIndex={-1}
          startIcon={<ArrowBackIcon />}
          onClick={() => router(paths.admin.dashboard.eventManager)}
        >
          Home
        </Button>
      </div>

      <div className='flex'>
      <div>
          <LoadingButton
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<ClearAllIcon />}
            onClick={() => setWebConfigs([])}
          >
            Clear section
          </LoadingButton>
        </div>
        <div className='ml-5'>
          <LoadingButton
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<VisibilityIcon />}
            onClick={() => router(paths.admin.website.viewPath + eventData._id)}
          >
            Preview
          </LoadingButton>
        </div>
        <div className='ml-5'>
          <LoadingButton
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<SaveIcon />}
            loading={loading}
            onClick={handleUpdateWebConfig}
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
