

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert'; 
import Stack from '@mui/material/Stack'; 
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import {   useForm } from 'react-hook-form';
import { z as zod } from 'zod'; 
import { Link, useParams } from 'react-router-dom';  
import adminAuthService from '../../../services/adminAuth.service';
import { paths } from '../../../paths';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

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
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const params = useParams(); 
  
  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const dataReset = await adminAuthService.changeResetPassword({...values,...params});
      if (dataReset?.statusCode !==201) {
        setError('root', { type: 'server', message: dataReset.message });
      }
      else {
        toast.success("Your password has been updated!")
      }
      setIsPending(false); 
    },
    [setError]
  );

  return (
    <div  >
     <div className='text-center flex flex-col justify-center items-center mb-5'>
        <div className='text-white text-center font-[700] text-4xl -mt-5 bg-[#699fbf70] px-5 py-2 rounded-ss-3xl rounded-br-3xl'>Reset password</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
        <div>
            <div className='text-white  relative'>
              <input  {...register("newPassword")} placeholder='New password' name='newPassword' type={showPassword ? 'text' : 'password'} className='w-[100%] bg-[#e9e9e920] placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
              <div className='absolute right-2 top-[50%] -translate-y-[50%] p-1 rounded-full   hover:bg-[#ffe6e644]'>
                {
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
              </div>
            </div> 
            {errors?.newPassword?.message && <span className='text-[#f4ff4c] pl-1' >{errors.newPassword.message}</span>}
          </div>
        <div>
            <div className='text-white  relative'>
              <input  {...register("confirmPassword")} placeholder='Confirm password' name='confirmPassword' type={showPassword ? 'text' : 'password'} className='w-[100%] bg-[#e9e9e920] placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
              <div className='absolute right-2 top-[50%] -translate-y-[50%] p-1 rounded-full   hover:bg-[#ffe6e644]'>
                {
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
              </div>
            </div> 
            {errors?.confirmPassword?.message && <span className='text-[#f4ff4c] pl-1' >{errors.confirmPassword.message}</span>}
          </div>
          <div>
            <Link to={paths.client.auth.resetPassword} className='text-[#fbceb5] hover:text-[#fbceb5]' >
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <button type="submit" className='  rounded-3xl p-2 font-[500]  text-lg hover:bg-[#faba97] bg-[#fbceb5]  text-[#93658c]'>
            {isPending ? <CircularProgress size={20} color="success" /> : "Update Password"}
          </button>
        </Stack>
      </form>
    </div>
  );
}
