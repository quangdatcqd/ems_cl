'use client';

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

import { paths } from '../../paths';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/authProvider';
import adminAuthService from '../../services/adminAuth.service'; 
const schema = zod.object({
  username: zod.string().min(1, { message: 'username is required' }),
  password: zod.string().min(8, "Password is too short - should be 8 chars minimum"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', password: '' } satisfies Values;

export function SignInForm(): React.JSX.Element { 
  const router = useNavigate();
  const {auth, setAuth } = useAuth();
  if (auth) {
    setInterval(()=>router(paths.home),100)
  } 

  const [showPassword, setShowPassword] = React.useState<boolean>(); 
  const [isPending, setIsPending] = React.useState<boolean>(false); 
  const { control, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const data = await adminAuthService.signInWithPassword(values);
      if (data?.statusCode) {
        setAuth(null);
        setError('root', { type: 'server', message: data.message });
      }
      else {
        setAuth(data.data);
        window.location.href = paths.dashboard.overview
      }
      setIsPending(false);
    },
    [router, setError]

  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        {/* <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <NavLink to={paths.admin.signUp} > 
            <span  style={{textDecoration:"underline", color:'blue'}} > Sign up </span>
          </NavLink>
        </Typography> */}
      </Stack>
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
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
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
          <div> 
            <Link to={paths.admin.resetPassword} className='react-link' >
              Forgot password?
            </Link> 
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
      <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          cqd113
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Cqdcqd113@
        </Typography>
      </Alert>
    </Stack>
  );
}
