

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { paths } from '../../../paths';
import { CircularProgress } from '@mui/material';
import clientAuthService from '../../../services/clientAuth.service';
import toast from 'react-hot-toast';


const schema = zod.object({
  username: zod.string().min(1, { message: 'Username is required' }),
  name: zod.string().min(1, { message: 'Name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string()
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
  confirmPassword: zod.string(),
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
const defaultValues = { username: '', phoneNumber: '', name: '', email: '', password: '', confirmPassword: '' } satisfies Values;

export default function ClientSignUp(): React.JSX.Element {
  const router = useNavigate(); 

  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true); 
      const data = await clientAuthService.signUp(values);
      if (data?.statusCode) { 
        setError('root', { type: 'server', message: data.message });
      }
      else { 
        toast.success("Registration successful, please log in!")
        setTimeout(() => window.location.href = paths.client.auth.signIn, 5000);
      }
      setIsPending(false);
    },
    [router, setError]

  );

  return (
    <div >
      <div className='text-center flex flex-col justify-center items-center'>
        <div className='text-white text-center font-[700] text-4xl -mt-5 bg-[#699fbf70] px-5 py-2 rounded-ss-3xl rounded-br-3xl'>Sign Up</div>
        <p className="text-white mt-3 mb-2" >
          Already have an account?{' '}
          <Link to={paths.client.auth.signIn} className='text-[#fbceb5] hover:text-[#fbceb5] '   >
            Sign in
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5} >
          <div className='flex flex-col sm:flex-row justify-center gap-2 '>
            <InputSignUp register={register("name")} placeholder={'Name'} error={errors.name?.message} />
            <InputSignUp register={register("username")} placeholder={'User Name'} error={errors.username?.message} />
          </div>
          <div className='flex flex-col sm:flex-row justify-center gap-2 '>
            <InputSignUp register={register("email")} placeholder={'Email'} error={errors.email?.message} />
            <InputSignUp register={register("phoneNumber")} placeholder={'Phone Number'} error={errors.phoneNumber?.message} />
          </div>
          <div className='flex flex-col sm:flex-row justify-center   gap-2'>
            <div>
              <div className='text-white  relative '>
                <InputSignUp register={register("password")} type={showPassword ? 'text' : 'password'} placeholder={'Password'} />
                <div className='absolute right-2 top-[50%] -translate-y-[50%] p-1 rounded-full hover:bg-[#ffe6e644]'>
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
              {errors?.password?.message && <span className='text-[#f4ff4c] pl-1' >{errors.password.message}</span>}
            </div>
            <div>
              <div className='text-white  relative '>
                <InputSignUp register={register("confirmPassword")} type={showPassword ? 'text' : 'password'} placeholder={'Confirm Password'} /> 
                <div className='absolute right-2 top-[50%] -translate-y-[50%] p-1 rounded-full hover:bg-[#ffe6e644]'>
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
          </div> 
          <div className=' '>{errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}</div>
          <div>
            <Link to={paths.client.auth.resetPassword} className='text-[#fbceb5] hover:text-[#fbceb5]' >
              Forgot password?
            </Link>
          </div>
          <div className='text-center'>
          <button type="submit" className=' border rounded-3xl p-2 font-[500] text-lg hover:bg-[#faba97] bg-[#fbceb5]  text-[#93658c] w-[80%]'>
            {isPending ? <CircularProgress size={20} color="success" /> : "Sign Up"}
          </button>
          </div>
        </Stack>
      </form>
    </div>
  );
}



function InputSignUp({ register, type = "text", placeholder, error }: any) {
  return (
    <div>
      <input {...register}
        placeholder={placeholder}
        type={type}
        className='bg-[#e9e9e920] sm:w-[14rem] w-[100%]   placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
      {error && <span className='text-[#f4ff4c] pl-1' >{error}</span>}
    </div>
  )
}