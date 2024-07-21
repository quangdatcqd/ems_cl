import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import {  Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel,  Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, useMediaQuery } from '@mui/material';
import eventService from '../../../services/admin/eventService.service';
import toast from 'react-hot-toast';
import { Genders } from '../../../constants/event';
import { DateRangePicker, DatePicker, RadioGroup, Radio } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';
import { RadioLabel } from './radio-label';


const schema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  location: zod.string().min(1, { message: 'Location is required' }),
  startTime: zod.string().min(1, { message: 'Start time is required' }),
  endTime: zod.string().min(1, { message: 'End time is required' }),
  useFood: zod.boolean(),
  allowWaitlist: zod.boolean(),
  typeCheckin: zod.string(),
  capacityLimit: zod.number(),
  registrationDeadline: zod.string().min(1, { message: 'Registration Deadline Expired is required' }),
  allowMinAge: zod.number(),
  allowMaxAge: zod.number(),
  allowGender: zod.string().min(1, { message: 'Gender Allowed required' }),
})
type Values = zod.infer<typeof schema>;

interface EventCreateFormProps {
  openDlg: boolean,
  handleCloseDlg: any
}

export function EventCreateForm({ openDlg, handleCloseDlg }: EventCreateFormProps) {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showCapacityLimit, setShowCapacityLimit] = React.useState<boolean>(false);
  const fullScreenSM = useMediaQuery("(max-width:600px)")


  const defaultValues = {
    name: '', location: '', startTime: '',
    endTime: '', useFood: false, allowWaitlist: false, typeCheckin: "Offline",
    capacityLimit: 0, registrationDeadline: '',
    allowMinAge: 0, allowMaxAge: 150, allowGender: 'All',
  } satisfies Values;
  const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const onSubmit = React.useCallback(async (values: Values, e: any): Promise<void> => {
    setIsPending(true);

    const data = await eventService.createEvent(values);
    if (data?.statusCode) {
      setError('root', { type: 'server', message: data?.message });
    } else {
      control._reset();
      toast.success("New event created successfully!");
      if (e.nativeEvent.submitter.innerText === "Create And Close") {
        handleCloseDlg(false)
      }
    }
    setIsPending(false);
  },
    [setError]
  );
  return (

    <Dialog
      open={openDlg}
      onClose={handleCloseDlg}
      fullWidth={true}
      maxWidth={"sm"}
      fullScreen={fullScreenSM}
    >
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Divider />
          <Stack spacing={2} sx={{ paddingTop: 2 }}>
            <Grid container spacing={2}>
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
              {/* <Grid sm={6} xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.startTime)}>
                  <DatePicker name='startTime' label="Start time"
                    onChange={(value) => setValue("startTime", value?.toISOString() || "")}
                    format='YYYY-MM-DD' />
                  {errors.startTime ? <FormHelperText>{errors.startTime.message}</FormHelperText> : null}
                </FormControl>
              </Grid> */}
              {/* <Grid sm={6} xs={12} item={true}>
                <Controller
                  control={control}
                  name="endTime"
                  render={() => (
                    <FormControl fullWidth={true} error={Boolean(errors.endTime)} >
                      <DatePicker name='endTime' label="End Time"
                        format='YYYY-MM-DD'
                        onChange={(value) => setValue("endTime", value?.toISOString() || "")} />

                      {errors.endTime && <FormHelperText>{errors.endTime.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid> */}
              <Grid sm={6} xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.startTime || errors.endTime)} >
                  <label className='text-slate-500 text-sm'>Duration Date</label>
                  <DateRangePicker
                    ranges={[]}
                    showOneCalendar
                    size='lg'
                    onChange={(value: any) => {
                      setValue("startTime", value[0]?.toISOString() || "")
                      setValue("endTime", value[1]?.toISOString() || "")
                    }}

                  />
                  {errors.startTime && <FormHelperText>{errors.startTime.message}</FormHelperText>}
                  {errors.endTime && <FormHelperText>{errors.endTime.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid sm={6} xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.registrationDeadline)} >
                  <label className='text-slate-500 text-sm'>Registration Deadline</label>
                  <DatePicker name='registrationDeadline'
                    size='lg'
                    onChange={(value) => setValue("registrationDeadline", value?.toISOString() || "")} />

                  {errors.registrationDeadline && <FormHelperText>{errors.registrationDeadline.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} sm={6} xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.useFood)} >
                  <FormControlLabel control={<Switch defaultChecked={Boolean(defaultValues.useFood)} onChange={(value) => setValue("useFood", value.target.checked)} name="useFood" />} label="Use Food " />
                </FormControl>
              </Grid>

              <Grid md={6} sm={6} xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.allowWaitlist)} >
                  <FormControlLabel control={<Switch defaultChecked={Boolean(defaultValues.allowWaitlist)} onChange={(value) => setValue("allowWaitlist", value.target.checked)} name="allowWaitlist" />} label="Allow For Waitlist" />
                </FormControl>
              </Grid>
              <Grid sm={3} xs={6} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.allowMinAge)}  >
                  <TextField id="standard-basic" type='number' defaultValue={defaultValues.allowMinAge} onChange={(e: any) => setValue("allowMinAge", Number(e.target.value) || 0)} label="Allow Min Age" variant="standard" />
                  {errors.allowMinAge ? <FormHelperText>{errors.allowMinAge.message}</FormHelperText> : null}
                </FormControl>
              </Grid>
              <Grid sm={3} xs={6} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.allowMaxAge)}>
                  <TextField id="standard-basic" type='number' defaultValue={defaultValues.allowMaxAge} onChange={(e: any) => setValue("allowMaxAge", Number(e.target.value) || 0)} label="Allow Max Age" variant="standard" />
                  {errors.allowMaxAge ? <FormHelperText>{errors.allowMaxAge.message}</FormHelperText> : null}
                </FormControl>
              </Grid>
              <Grid md={6} sm={6} xs={12} item={true}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-helper-label">Allow Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    sx={{ padding: 0, margin: 0 }}
                    name='allowGender'
                    defaultValue={defaultValues.allowGender}
                    onChange={(e: SelectChangeEvent) => setValue("allowGender", e.target.value)}
                    label={"Allow Gender"}
                  >
                    {
                      Genders.map((gender: string, index: number) => {
                        return <MenuItem key={index} value={gender}>{gender}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.capacityLimit)} >
                  <Grid container spacing={3}>
                    <Grid sm={6} xs={7} item={true}>
                      <FormControlLabel className='' control={<Switch checked={Boolean(showCapacityLimit)} onChange={(e) => setShowCapacityLimit(e.target.checked)} />} label="Event Capacity Limit" />
                    </Grid>
                    <Grid sm={6} xs={5} item={true}>
                      {
                        showCapacityLimit &&
                        <TextField type="number" sx={{ marginTop: 0, width: "100%" }} onChange={(e) => setValue("capacityLimit", Number(e.target.value) || 0)} label="Capaticy Limit" variant="outlined" />
                      }
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid md={12} item={true}>
                <RadioGroup name="radio-group-inline-picker-label" onChange={(value:ValueType) => setValue("typeCheckin", value.toString())} inline appearance="default" defaultValue={defaultValues.typeCheckin}>
                  <RadioLabel>Check In Type: </RadioLabel>
                  <Radio value="Offline">Offline</Radio> 
                  <Radio value="Online">Online</Radio>
                </RadioGroup>
              </Grid>



              {errors.root && <Grid xs={12} item={true}><Alert color="error">{errors.root.message}</Alert>  </Grid>}
              <Grid xs={12} item={true}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button disabled={isPending} type="submit" variant="contained">
                      Create Event
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button disabled={isPending} type="submit" tabIndex={10} variant="outlined" >
                      Create And Close
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDlg}>Close</Button>
      </DialogActions>
    </Dialog>

  );
} 