import * as React from 'react'; 
import Stack from '@mui/material/Stack'; 
import { EventManagerFilter } from '../../../components/dashboard/event_manager/event-manager-filter'; 
import eventService from '../../../services/admin/eventService.service';
import {  EventResponseType } from '../../../types/event';
import FoodResTable   from '../../../components/dashboard/event_food_registration/food-res-table'; 

 
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
  const [eventData, setEventData] = React.useState<EventResponseType>(initialValues);
  const [isPending, setIsPending] = React.useState<boolean>(false); 
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
  return (
    <Stack spacing={2}> 
      <EventManagerFilter setSort={setSort} />
      <FoodResTable 
        count={eventData.metadata.count}
        page={eventData.metadata.page - 1}
        rows={eventData.data}
        rowsPerPage={eventData.metadata.limit}
        isPending={isPending}
        setSort={setSort}
      />
    </Stack>
  );
} 