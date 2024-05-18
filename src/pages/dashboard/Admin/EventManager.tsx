import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { EventManagerFilter } from '../../../components/dashboard/event_manager/event-manager-filter';
import { EvenManagerTable } from '../../../components/dashboard/event_manager/event-manager-table';
import { EventCreateForm } from '../../../components/dashboard/event_manager/event-create-form';
import eventService from '../../../services/admin/eventService.service';
import {  EventResponseType } from '../../../types/event';

 
export default function AccountManager(): React.JSX.Element {
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
  const [userData, setUserData] = React.useState<EventResponseType>(initialValues);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [openDlg, setOpenDlg] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<any>();
  const fetchUsers = async () => {
    setIsPending(true)
    const users = await eventService.getAllEvents(sort);
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
      <Stack direction="row" spacing={3}>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} onClick={handleOpenDlg} variant="contained">
          Add
        </Button>
      </Stack>
      <Dialog
        open={openDlg}
        onClose={handleCloseDlg}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <EventCreateForm handleCloseDlg={handleCloseDlg} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDlg}>Close</Button>
        </DialogActions>
      </Dialog>

      <EventManagerFilter setSort={setSort} />
      <EvenManagerTable
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