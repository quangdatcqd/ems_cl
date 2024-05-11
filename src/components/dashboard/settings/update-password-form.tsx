 

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput'; 
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, FormHelperText, Grid } from '@mui/material';
import adminAuthService from '../../../services/adminAuth.service';
import toast from 'react-hot-toast';
import { useAuth } from '../../../provider/authProvider';

const schema = zod.object({
  username: zod.string().min(1, { message: 'username is required' }),
  oldPassword: zod.string().min(8, "Old Password is too short - should be 8 chars minimum"),
  newPassword: zod.string().min(8, "New Password is too short - should be 8 chars minimum")
  .refine(value=>/[A-Z]/.test(value),{
    message: "Password must contain at least one uppercase letter.",
  }).refine((value) => /[a-z]/.test(value), {
    message: "Password must contain at least one lowercase letter.",
  }).refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one number.",
  })
  .refine((value) => /[^A-Za-z0-9]/.test(value), {
    message: "Password must contain at least one special character.",
  }),
  confirmPassword: zod.string().min(1, { message: 'New Password is too short - should be 8 chars minimum' }),
}).refine(
  (values) => {
    return values.newPassword === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);

type Values = zod.infer<typeof schema>;

const defaultValues = { username: "", oldPassword: "", newPassword: '', confirmPassword: '', } satisfies Values;
export function UpdatePasswordForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const { control, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const {setAuth} = useAuth();
  const onSubmit = React.useCallback( 
    async (values: Values): Promise<void> => { 
      setIsPending(true);
      const data = await adminAuthService.updatePassword(values); 
      if (data?.statusCode) { 
        setError('root', { type: 'server', message: data.message });
      }else{
        toast.success("Password changed successfully!")
        setAuth(data?.data)
      }
      setIsPending(false);
    },
    [setError]

  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}   >
      <Card>
   
        <CardHeader subheader="Update password" title="Password" />
        <Divider /> 
        <CardContent>
       
          <Grid container spacing={3}>
            <Grid md={6} xs={12} item={true}>
              <Controller
                control={control} 
                name="username"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.username)} fullWidth={true}>
                    <InputLabel>username</InputLabel>
                    <OutlinedInput {...field} label="username" type="username" />
                    {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12} item={true}>
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.newPassword)} fullWidth={true}>
                    <InputLabel>New Password</InputLabel>
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
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.newPassword ? <FormHelperText>{errors.newPassword.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12} item={true}>
              <Controller
                control={control}
                name="oldPassword"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.oldPassword)} fullWidth={true}>
                    <InputLabel>Old Password</InputLabel>
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
                      label="Old Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.oldPassword ? <FormHelperText>{errors.oldPassword.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12} item={true}>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.confirmPassword)} fullWidth={true}>
                    <InputLabel>Confirm Password</InputLabel>
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
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
                  </FormControl>

                )}
              />
            </Grid>
            <Grid   xs={12} item={true}>
            {errors.root ? <Alert  color="error">{errors.root.message}</Alert> : null}
            </Grid>
          </Grid>
         
        </CardContent> 
        <Divider /> 
        <CardActions sx={{ justifyContent: 'flex-end' }}> 
          <Button disabled={isPending} variant="contained" type="submit">Update</Button>
        </CardActions>
     
      </Card>
      </form>
  );
}



// <CardContent> 
// <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
// <Controller
//   control={control}
//   name="username"
//   render={({ field }) => (
//     <FormControl error={Boolean(errors.username)}>
//       <InputLabel>username</InputLabel>
//       <OutlinedInput {...field} label="username address" type="username" />
//       {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
//     </FormControl>
//   )}
// />
//   <Controller
//     control={control}
//     name="newPassword"
//     render={({ field }) => (
//       <FormControl error={Boolean(errors.newPassword)}>
//         <InputLabel>Password</InputLabel>
//         <OutlinedInput
//           {...field}
//           endAdornment={
//             showPassword ? (
//               <EyeIcon
//                 cursor="pointer"
//                 fontSize="var(--icon-fontSize-md)"
//                 onClick={(): void => {
//                   setShowPassword(false);
//                 }}
//               />
//             ) : (
//               <EyeSlashIcon
//                 cursor="pointer"
//                 fontSize="var(--icon-fontSize-md)"
//                 onClick={(): void => {
//                   setShowPassword(true);
//                 }}
//               />
//             )
//           }
//           label="Password"
//           type={showPassword ? 'text' : 'password'}
//         />
//         {errors.newPassword ? <FormHelperText>{errors.newPassword.message}</FormHelperText> : null}
//       </FormControl>
//     )}
//   />
//   <Controller
//     control={control}
//     name="confirmPassword"
//     render={({ field }) => (
//       <FormControl error={Boolean(errors.confirmPassword)}>
//         <InputLabel>Confirm Password</InputLabel>
//         <OutlinedInput
//           {...field}
//           endAdornment={
//             showPassword ? (
//               <EyeIcon
//                 cursor="pointer"
//                 fontSize="var(--icon-fontSize-md)"
//                 onClick={(): void => {
//                   setShowPassword(false);
//                 }}
//               />
//             ) : (
//               <EyeSlashIcon
//                 cursor="pointer"
//                 fontSize="var(--icon-fontSize-md)"
//                 onClick={(): void => {
//                   setShowPassword(true);
//                 }}
//               />
//             )
//           }
//           label="Confirm Password"
//           type={showPassword ? 'text' : 'password'}
//         />
//         {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
//       </FormControl>
      
//     )}
//   />
//     {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
// </Stack>
// </CardContent> 
