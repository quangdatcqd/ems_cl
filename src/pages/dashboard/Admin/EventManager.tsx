import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { EventManagerFilter } from '../../../components/dashboard/event_manager/event-manager-filter';
import { EvenManagerTable } from '../../../components/dashboard/event_manager/event-manager-table';
import { EventCreateForm } from '../../../components/dashboard/event_manager/event-create-form';
import eventService from '../../../services/admin/eventService.service';
import { EventResponseType } from '../../../interface/event';


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
  const [eventData, setEventData] = React.useState<EventResponseType>(initialValues);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [openDlg, setOpenDlg] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<any>();
  const fetchEvents = async () => {
    setIsPending(true)
    const events = await eventService.getAllEvents(sort);
    setEventData(events)
    setIsPending(false)
  }
  React.useEffect(() => {
    fetchEvents();
  }, [sort])
  const handleCloseDlg = () => {
    fetchEvents();
    setOpenDlg(false)
  }
  const handleOpenDlg = () => {
    setOpenDlg(true)
  }
  return (
    <Stack spacing={2}>
      <div className='flex justify-start gap-10'>
        <EventManagerFilter setSort={setSort} />
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} onClick={handleOpenDlg} variant="contained">
          Add
        </Button>
      </div>
      <EventCreateForm openDlg={openDlg} handleCloseDlg={handleCloseDlg} />

      <EvenManagerTable
        fetchEvents={fetchEvents}
        count={eventData?.metadata?.count}
        page={eventData?.metadata?.page - 1}
        rows={eventData?.data}
        rowsPerPage={eventData?.metadata?.limit}
        isPending={isPending}
        setSort={setSort}
      />
    </Stack>
  );
} 