import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'; 
import { UserManagerTable } from '../../../components/dashboard/users_manager/user-manager-table';
import UserManagerService from '../../../services/admin/userManager.service';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ClientUserManagerFilter } from '../../../components/dashboard/users_manager/client-user-manager-filter';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import CreateSurvey from '../../../components/dashboard/surveys_manager/survey-creator';

interface UserType {
  data: any;
  metadata: {
    count: number,
    page: number,
    last: number,
    limit: number,
    sort: {
      createdAt: string
    }
  }
} 
export default function Survey(): React.JSX.Element { 
  const initialValues = {
    data: [],
    metadata: {
      count: 0,
      page: 1,
      last: 1,
      limit: 10,
      sort: {
        createdAt: "desc"
      }
    }
  }
  const [userData, setUserData] = React.useState<UserType>(initialValues);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [openDlg, setOpenDlg] = React.useState<boolean>(true);
  const [sort, setSort] = React.useState<any>({accountType:"Client"});
  const fetchUsers = async () => {
    setIsPending(true)
    const users = await UserManagerService.getAllAdminUsers(sort);
    setUserData(users)
    setIsPending(false)
  }
  React.useEffect(() => { 
    fetchUsers(); 
  }, [sort])
 
  const handleCloseDlg = () => {
    fetchUsers();
    setOpenDlg(false)
  }
  
  return (
    <Stack spacing={2}> 
      <div className='flex justify-start gap-10'> 
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} onClick={() => setOpenDlg(true)}   variant="contained">
          Add
        </Button>
      </div>
      <Dialog
        open={openDlg}
        onClose={handleCloseDlg}
        fullScreen={true} 

      >
        <DialogTitle>Form builder</DialogTitle>
        <DialogContent>
           <CreateSurvey/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDlg}>Close</Button>
        </DialogActions>
      </Dialog>

      <ClientUserManagerFilter setSort={setSort} />
      <UserManagerTable
        fetchUsers={fetchUsers}
        count={userData?.metadata?.count}
        page={userData?.metadata?.page - 1}
        rows={userData?.data}
        rowsPerPage={userData?.metadata?.limit}
        isPending={isPending}
        setSort={setSort}
      />
    </Stack>
  );
} 