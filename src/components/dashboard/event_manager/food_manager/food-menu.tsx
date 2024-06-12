import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import eventService from '../../../../services/admin/eventService.service';
import toast from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FoodItem from './food-item';

const schema = zod.object({
  name: zod.string().min(1, { message: 'Name is required' }),
  image: zod.string().min(1, { message: 'Image is required' }),
  price: zod.string().min(1, { message: 'Price is required' }),
})
type Values = zod.infer<typeof schema>;

const defaultValues = { name: '', image: '', price: '' } satisfies Values;

interface EventCreateFormProps {
  openDlgMenu: {
    open: boolean,
    eventId: string
  },
  handleCloseDlg: any
}

export function FoodMenu({ openDlgMenu, handleCloseDlg }: EventCreateFormProps) {
  const [isPending, setIsPending] = React.useState<boolean>(false);
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

  const items = [
    { name: "Beef steak", price: 5, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 15, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 52, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 35, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 54, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 5, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 35, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },
    { name: "Beef steak", price: 5, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg" },

  ]
  return (

    <div className='p-2 '>

      <div className='grid    sm:grid-cols-3   md:grid-cols-4 xl:grid-cols-6 gap-4'>
        {
          items.map((item) => {
            return <div className='' key={item.name}>
                  <FoodItem item={item} />
                </div>
          })
        }
      </div>

    </div>


    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <Divider />
    //   <Stack spacing={3} sx={{ paddingTop: 2 }}>
    //     <Grid container spacing={3}>
    //       <Grid xs={12} item={true}>
    //         <Controller
    //           control={control}
    //           name="name"
    //           render={({ field }) => (
    //             <FormControl fullWidth={true} error={Boolean(errors.name)}  >
    //               <TextField id="standard-basic" {...field} label="Dish name" variant="standard" />
    //               {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
    //             </FormControl>
    //           )}
    //         />
    //       </Grid>

    //       <Grid xs={12} item={true}>
    //         <Controller
    //           control={control}
    //           name="price"
    //           render={({ field }) => (
    //             <FormControl fullWidth={true} error={Boolean(errors.price)}>
    //               <TextField type='number' id="standard-basic" {...field} label="Dish price" variant="standard" />
    //               {errors.price ? <FormHelperText>{errors.price.message}</FormHelperText> : null}
    //             </FormControl>
    //           )}
    //         />
    //       </Grid>

    //       <Grid md={6} xs={12} item={true}> 
    //       </Grid>

    //       {errors.root ? <Grid xs={12} item={true}><Alert color="error">{errors.root.message}</Alert>  </Grid> : null}
    //       <Grid xs={12} item={true}>
    //         <Grid container spacing={1}>
    //           <Grid item>
    //             <Button disabled={isPending} type="submit" variant="contained">
    //               Create Event
    //             </Button>
    //           </Grid>
    //           <Grid item>
    //             <Button disabled={isPending} type="submit" tabIndex={10} variant="outlined" >
    //               Create And Close
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Stack>
    // </form>
  );
}


