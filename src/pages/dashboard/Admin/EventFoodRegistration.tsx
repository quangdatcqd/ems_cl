import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus'; 
import { EventManagerFilter } from '../../../components/dashboard/event_manager/event-manager-filter';
import { EvenManagerTable } from '../../../components/dashboard/event_manager/event-manager-table';
import { EventCreateForm } from '../../../components/dashboard/event_manager/event-create-form';
import eventService from '../../../services/admin/eventService.service';
import {  EventResponseType } from '../../../types/event';
import { FoodResTable } from '../../../components/dashboard/event_food_registration/food-res-table';
import eventFoodRegisServiceService from '../../../services/admin/eventFoodRegisService.service';

 
export default function EventFoodRegistration(): React.JSX.Element {
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
  const [foodResData, setFoodResData] = React.useState<EventResponseType>(initialValues);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [openDlg, setOpenDlg] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<any>();
  const fetchFoodRes = async () => {
    setIsPending(true)
    const users = await eventFoodRegisServiceService.getAllFoodRes(sort);
    setFoodResData(users)
    setIsPending(false)
  }
  React.useEffect(() => {
    fetchFoodRes();
  }, [sort])
  const handleCloseDlg = () => {
    fetchFoodRes();
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
      <EventCreateForm openDlg={openDlg} handleCloseDlg={handleCloseDlg} />
      <EventManagerFilter setSort={setSort} />
      <FoodResTable
        fetchFoodRes={fetchFoodRes}
        count={foodResData.metadata.count}
        page={foodResData.metadata.page - 1}
        rows={foodResData.data}
        rowsPerPage={foodResData.metadata.limit}
        isPending={isPending}
        setSort={setSort}
      />
    </Stack>
  );
} 