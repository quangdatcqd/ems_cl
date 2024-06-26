import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { Divider, Grid, TextField } from '@mui/material';
import eventService from '../../../services/admin/eventService.service';
import toast from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { EventDataType } from '../../../types/event';
const schema = zod.object({
  _id: zod.string(),
  name: zod.string().min(1, { message: 'Name is required' }),
  startTime: zod.string().min(1, { message: 'Start time is required' }),
  endTime: zod.string().min(1, { message: 'End time is required' }),
  location: zod.string().min(1, { message: 'Location is required' }),
})

type Values = zod.infer<typeof schema>;


export function EventEditForm({ eventData, handleCloseEdit }: { eventData: EventDataType, handleCloseEdit: Function }): React.JSX.Element {

  const defaultValues = {
    _id: eventData._id,
    name: eventData.name,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    location: eventData.location
  } satisfies Values;


  const [isPending, setIsPending] = React.useState<boolean>(false);
  const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  
  const onSubmit = React.useCallback(async (values: Values, e: any): Promise<void> => {
    setIsPending(true);
    const data = await eventService.modifyEvent(values);
    if (data?.statusCode) {
      setError('root', { type: 'server', message: data?.message });
    } else { 
      toast.success("Modified event information successfully!");
      if (e.nativeEvent.submitter.innerText === "Update And Close") {
        handleCloseEdit({ open: false, userData: {} })
      }
    }
    setIsPending(false);
  },
    [setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Divider />
      <Stack spacing={3} sx={{ paddingTop: 2 }}>
        <Grid container spacing={3}>
          <Grid xs={12} item={true}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.name)}  >
                  <TextField id="standard-basic" {...field} label="Event name" variant="standard" />
                  {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid xs={12} item={true}>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.location)}>
                  <TextField id="standard-basic" {...field} label="Location" variant="standard" />
                  {errors.location ? <FormHelperText>{errors.location.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="startTime"
              render={() => (
                <FormControl fullWidth={true} error={Boolean(errors.startTime)}>
                  <DatePicker name='startTime'
                    defaultValue={dayjs(eventData.startTime)}
                    onChange={(value) => setValue("startTime", value?.toISOString() || "")}
                    format='YYYY-MM-DD' />
                  {errors.startTime ? <FormHelperText>{errors.startTime.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="endTime"
              render={() => (
                <FormControl fullWidth={true} error={Boolean(errors.endTime)} >
                  <DatePicker name='endTime'
                    format='YYYY-MM-DD'
                    defaultValue={dayjs(eventData.endTime)}
                    onChange={(value) => setValue("endTime", value?.toISOString() || "")}
                  />
                  {errors.endTime ? <FormHelperText>{errors.endTime.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          {errors.root ? <Grid xs={12} item={true}><Alert color="error">{errors.root.message}</Alert>  </Grid> : null}
          <Grid xs={12} item={true}>
            <Grid container spacing={1}>
              <Grid item>
                <Button disabled={isPending} type="submit" variant="contained">
                  Update Event
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={isPending} type="submit" tabIndex={10} variant="outlined" >
                  Update And Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}


