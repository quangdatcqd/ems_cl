

import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton'; 
import SaveIcon from '@mui/icons-material/Save';
import eventService  from '../../services/admin/eventService.service';
import toast from 'react-hot-toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
export function MainNav({eventData}:{eventData:any}): React.JSX.Element {
  const [loading ,setLoading] = React.useState(false)
  const router = useNavigate();


  const handleUpdateWebConfig = async ()=>{ 
    setLoading(true)
    const dataSave = await eventService.modifyEvent(eventData)
    if(dataSave?.statusCode){
      toast.error(dataSave.message);
    }else{
      toast.success("Updated!",{position:"top-center"});

    }
    setLoading(false)
  }
  return (
    <div className='h-[80px] fixed flex items-center justify-end  bg-white w-[100%]  z-[61] top-0 left-0 web-side-nav px-10'>
      <div>
        <LoadingButton
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<VisibilityIcon />} 
          onClick={()=>router(paths.website.viewPath+eventData.id)} 
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
  );
}
