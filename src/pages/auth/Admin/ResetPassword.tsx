

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
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod'; 
import { Link } from 'react-router-dom';
import DialogContext from '../../../context/dialogContext';
import adminAuthService from '../../../services/adminAuth.service';
import { paths } from '../../../paths';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  username: zod.string().min(1, { message: 'Username is required' })
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: '', username: '' } satisfies Values;

export function ResetPassword(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const { setDialog } = React.useContext(DialogContext);
  const { control, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const dataReset = await adminAuthService.resetPassword(values);
      if (dataReset?.statusCode !== 201) {
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
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(errors.username)}>
                <InputLabel>username</InputLabel>
                <OutlinedInput {...field} label="username" type="username" />
                {errors.username ? <FormHelperText>{errors.username.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link to={paths.admin.auth.signIn} className='react-link'  > 
                Back to sign in.
              
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Send recovery link
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
