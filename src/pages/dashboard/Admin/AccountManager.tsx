import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'; 
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus'; 

import { UserManagerFilter } from '../../../components/dashboard/users_manager/UserManagerFilter';
import { UserManagerTable } from '../../../components/dashboard/users_manager/UserManagerTable'; 
import UserManagerService from '../../../services/admin/userManager.service'; 
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import Dialog  from '@mui/material/Dialog'; 
import { SignUpForm } from '../../../components/dashboard/users_manager/SignUpForm';


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

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)', 
//   bgcolor: 'background.paper', 
//   boxShadow: 24,
//   p: 4,
// };

export default function AccountManager(): React.JSX.Element {

  // const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

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
  const fetchUsers = async () => {
    setIsPending(true)
    const users = await UserManagerService.getAllAdminUsers({});
    setUserData(users)
    setIsPending(false)
  }
  React.useEffect(() => { 
    fetchUsers();
  }, [])
  const handleCloseDlg = () => {
    fetchUsers();
    setOpenDlg(false)
  }
  const handleOpenDlg = () => {
    setOpenDlg(true)
  }
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={3}>  
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} onClick={handleOpenDlg} variant="contained">
            Add
          </Button> 
      </Stack>
      <Dialog 
        open={openDlg}
        onClose={handleCloseDlg}
        fullWidth={true} 
        maxWidth={"md"} 
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
        <SignUpForm handleCloseDlg={handleCloseDlg}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDlg}>Close</Button>
        </DialogActions>
      </Dialog>

      <UserManagerFilter />
      <UserManagerTable
        fetchUsers={fetchUsers}
        count={userData.metadata.count}
        page={userData.metadata.page - 1}
        rows={userData.data}
        rowsPerPage={userData.metadata.limit}
        isPending={isPending}
      />
    </Stack>
  );
}

// function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
//   return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
