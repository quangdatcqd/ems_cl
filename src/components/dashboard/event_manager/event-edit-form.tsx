import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, useMediaQuery } from '@mui/material';
import eventService from '../../../services/admin/eventService.service';
import toast from 'react-hot-toast';
import { EventDataType } from '../../../interface/event';
import { Genders } from '../../../constants/event';
import { DateRangePicker, DatePicker, RadioGroup } from 'rsuite';
import Radio, { ValueType } from 'rsuite/esm/Radio';
import { RadioLabel } from './radio-label';
import TaiwandFlag from '../../../assets/flags/taiwand_flag.png';
import UKFlag from '../../../assets/flags/UK_flag.png';
import VIFlag from '../../../assets/flags/VI_flag.png';

const schema = zod.object({
  _id: zod.string(),
  name: zod.string().min(1, { message: 'Name is required' }),
  startTime: zod.string().min(1, { message: 'Start time is required' }),
  endTime: zod.string().min(1, { message: 'End time is required' }),
  location: zod.string().min(1, { message: 'Location is required' }),
  useFood: zod.boolean(),
  allowWaitlist: zod.boolean(),
  typeCheckin: zod.string(),
  capacityLimit: zod.number(),
  registrationDeadline: zod.string().min(1, { message: 'Registration Deadline Expired is required' }),
  allowMinAge: zod.number(),
  allowMaxAge: zod.number(),
  allowGender: zod.string().min(1, { message: 'Gender Allowed required' }),
  languages: zod.string().min(1, { message: 'Language is required' }),
})

type Values = zod.infer<typeof schema>;

interface Props {
  openDlgEdit: {
    open: boolean
    eventData: EventDataType
  }

  handleCloseEdit: any
}


export function EventEditForm({ openDlgEdit, handleCloseEdit }: Props): React.JSX.Element {
  const { open, eventData } = openDlgEdit;
  const defaultValues = {
    _id: eventData._id,
    name: eventData.name,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    location: eventData.location,
    useFood: eventData.useFood,
    allowWaitlist: eventData.allowWaitlist,
    capacityLimit: eventData.capacityLimit,
    typeCheckin: eventData.typeCheckin,
    registrationDeadline: eventData.registrationDeadline,
    allowMinAge: eventData.allowMinAge,
    allowMaxAge: eventData.allowMaxAge,
    allowGender: eventData.allowGender,
    languages: eventData.languages
  } satisfies Values;


  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showCapacityLimit, setShowCapacityLimit] = React.useState<boolean>(eventData.capacityLimit > 0);
  const { control, handleSubmit, setError, formState: { errors }, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const fullScreenSM = useMediaQuery("(max-width:600px)")
  const [languages, setLanguages] = React.useState<string[]>(eventData?.languages?.split(","));

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
  const handleSelectLang = (lang: string) => {
    const exists = languages.includes(lang);
    if (exists && languages.length <= 1) return;

    let langs = languages;
    if (exists) langs = langs.filter(l => l !== lang)
    else langs = [...langs, lang]
    setValue("languages", langs.join(","))
    setLanguages(langs)
  }
  return (
    <Dialog
      open={open}
      onClose={handleCloseEdit}
      fullWidth={true}
      maxWidth={"sm"}
      fullScreen={fullScreenSM}
    >
      <DialogTitle>Modify Event</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
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
              <Grid sm={6} xs={12} item={true}>
                <FormControl fullWidth={true} error={Boolean(errors.startTime || errors.endTime)} >
                  <label className='text-slate-500 text-sm'>Duration Date</label>
                  <DateRangePicker
                    ranges={[]}
                    showOneCalendar
                    size='lg'
                    defaultValue={[new Date(defaultValues.startTime), new Date(defaultValues.endTime)]}
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
                    defaultValue={new Date(defaultValues.registrationDeadline)}
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
                    <Grid sm={6} xs={5} item={true} className={`${showCapacityLimit ? "opacity-1" : "opacity-0"}`}>
                      <TextField defaultValue={defaultValues.capacityLimit} name="capacityLimit" type="number" sx={{ marginTop: 0, width: "100%" }} onChange={(e) => setValue("capacityLimit", Number(e.target.value) || 0)} label="Capaticy Limit" variant="outlined" />
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>


              <Grid sm={6} xs={12} item={true}>
                <RadioLabel>Check In: </RadioLabel>
                <RadioGroup name="radio-group-inline-picker-label" onChange={(value: ValueType) => setValue("typeCheckin", value.toString())} inline appearance="default" defaultValue={defaultValues.typeCheckin}>
                  <Radio value="Offline">Offline</Radio>
                  <Radio value="Online">Online</Radio>
                </RadioGroup>
              </Grid>
              <Grid sm={6} xs={12} item={true}>
                <RadioLabel>Languages: </RadioLabel>
                <div className='flex gap-2 text-sm my-2'>
                  <div onClick={() => handleSelectLang("EN")}
                    className={` ${languages.includes("EN") ? "bg-white border-sky-200" : "bg-slate-300"} select-none hover:bg-white hover:border-sky-200 rounded-full cursor-pointer flex gap-2 items-center font-[500]  p-2 border`}>
                    <img src={UKFlag} className='w-6' alt="" /> EN </div>
                  <div onClick={() => handleSelectLang("TW")}
                    className={` ${languages.includes("TW") ? "bg-white border-sky-200" : "bg-slate-300"} select-none hover:bg-white hover:border-sky-200 rounded-full cursor-pointer flex gap-2 items-center font-[500]  p-2 border`}>
                    <img src={TaiwandFlag} className='w-6' alt="" /> TW </div>
                  <div onClick={() => handleSelectLang("VI")}
                    className={` ${languages.includes("VI") ? "bg-white border-sky-200" : "bg-slate-300"} select-none hover:bg-white hover:border-sky-200 rounded-full cursor-pointer flex gap-2 items-center font-[500]  p-2 border`}>
                    <img src={VIFlag} className='w-6' alt="" /> VI </div>
                </div>
              </Grid>


              {errors.root && <Grid xs={12} item={true}><Alert color="error">{errors.root.message}</Alert>  </Grid>}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit}>Close</Button>
      </DialogActions>
    </Dialog >
  );
}


