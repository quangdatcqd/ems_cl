import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { Divider, Grid } from '@mui/material';
import userManagerService from '../../../services/admin/userManager.service';
import toast from 'react-hot-toast';



const schema = zod.object({
  username: zod.string().min(1, { message: 'Username is required' }),
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(8, "New Password is too short - should be 8 chars minimum")
    .refine(value => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
    }).refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter.",
    }).refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one number.",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "Password must contain at least one special character.",
    }),
  confirmPassword: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  phoneNumber: zod.string()
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);


type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', phoneNumber: '', name: '', email: '', password: 'Abc123Abc@', confirmPassword: 'Abc123Abc@' } satisfies Values;

export function SignUpForm({handleCloseDlg}:{handleCloseDlg:Function}): React.JSX.Element {

  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const { control, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values,e:any): Promise<void> => {

      setIsPending(true);
      const data = await userManagerService.createAdminUser(values);
      if (data?.statusCode) {
        setError('root', { type: 'server', message: data?.message });
      } else {
        control._reset();
        toast.success("New user created successfully!");
        if(e.nativeEvent.submitter.innerText === "Create And Close") { 
          handleCloseDlg(false)
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

          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.name)}  >
                  <InputLabel>Full name</InputLabel>
                  <OutlinedInput {...field} label="Full name" />
                  {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item={true}   >
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.phoneNumber)}>
                  <InputLabel>Phone number</InputLabel>
                  <OutlinedInput {...field} label="Phone number" />
                  {errors.phoneNumber ? <FormHelperText>{errors.phoneNumber.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.username)}>
                  <InputLabel>User name</InputLabel>
                  <OutlinedInput {...field} label="User name" />
                  {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.email)}>
                  <InputLabel>Email Address</InputLabel>
                  <OutlinedInput {...field} label="Email Address" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    {...field}
                    endAdornment={
                      showPassword ? (
                        <EyeIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={(): void => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <EyeSlashIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={(): void => {
                            setShowPassword(true);
                          }}
                        />
                      )
                    }
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12} item={true}>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormControl fullWidth={true} error={Boolean(errors.confirmPassword)}>
                  <InputLabel>Confirm password</InputLabel>
                  <OutlinedInput
                    {...field}
                    endAdornment={
                      showPassword ? (
                        <EyeIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={(): void => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <EyeSlashIcon
                          cursor="pointer"
                          fontSize="var(--icon-fontSize-md)"
                          onClick={(): void => {
                            setShowPassword(true);
                          }}
                        />
                      )
                    }
                    label="Confirm password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
          </Grid>
          {errors.root ? <Grid xs={12} item={true}><Alert color="error">{errors.root.message}</Alert>  </Grid> : null}
          <Grid xs={12} item={true}>
            <Grid container spacing={1}>
              <Grid item>
                <Button disabled={isPending} type="submit" variant="contained">
                  Create User
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={isPending} type="submit" tabIndex={10}   variant="outlined" >
                  Create And Close
                </Button>
              </Grid>
            </Grid> 
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}


