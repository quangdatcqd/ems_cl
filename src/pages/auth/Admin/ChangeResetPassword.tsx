

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod'; 
import { Link, useParams } from 'react-router-dom'; 
import DialogContext from '../../../context/dialogContext';
import adminAuthService from '../../../services/adminAuth.service';
import { paths } from '../../../paths';

const schema = zod.object({  
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
    message: "Confirm password must match!",
    path: ["confirmPassword"],
  }
);;

type Values = zod.infer<typeof schema>;

const defaultValues = { newPassword: '', confirmPassword: '' } satisfies Values;

export function ChangeResetPassword(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const { setDialog } = React.useContext(DialogContext);
  const { control, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const params = useParams(); 
  
  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const dataReset = await adminAuthService.changeResetPassword({...values,...params});
      if (dataReset?.statusCode !==201) {
        setError('root', { type: 'server', message: dataReset.message });
      }
      else {
        
        setDialog({
          title: "Reset password",
          open: true,
          text: dataReset?.message
        })
      }
      setIsPending(false); 
    },
    [setError]
  );

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Reset password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
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
               <div>
            <Link to={paths.admin.auth.signIn} className='react-link' >
              Back to login?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Update Password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
