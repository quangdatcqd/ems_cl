import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { AdminUserManagerFilter } from '../../../components/dashboard/users_manager/admin-user-manager-filter';
import { UserManagerTable } from '../../../components/dashboard/users_manager/user-manager-table';
import UserManagerService from '../../../services/admin/userManager.service';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { SignUpForm } from '../../../components/dashboard/users_manager/sign-up-form';


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
export default function AdminAccountManager(): React.JSX.Element {
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
  const [openDlg, setOpenDlg] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<any>();
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
  const handleOpenDlg = () => {
    setOpenDlg(true)
  }
  return (
    <Stack spacing={2}>
      <div  className='flex justify-start gap-10 items-center'>
        <AdminUserManagerFilter setSort={setSort} />
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} onClick={handleOpenDlg} variant="contained">
          Add
        </Button>
      </div>
      <Dialog
        open={openDlg}
        onClose={handleCloseDlg}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <SignUpForm handleCloseDlg={handleCloseDlg} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDlg}>Close</Button>
        </DialogActions>
      </Dialog>


      <UserManagerTable
        fetchUsers={fetchUsers}
        count={userData.metadata.count}
        page={userData.metadata.page - 1}
        rows={userData.data}
        rowsPerPage={userData.metadata.limit}
        isPending={isPending}
        setSort={setSort}
      />
    </Stack>
  );
} 