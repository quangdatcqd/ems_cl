

import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert'; 
import Stack from '@mui/material/Stack';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../provider/authProvider';
import { paths } from '../../../paths';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import { CircularProgress } from '@mui/material';
import clientAuthService from '../../../services/clientAuth.service';
import { generateNonce } from '../../../helpers/common.helper';
const schema = zod.object({
  username: zod.string().min(1, 'Username is required'),
  password: zod.string().min(8, "Password is too short - should be 8 chars minimum"),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', password: '' } satisfies Values;

export default function ClientSignIn(): React.JSX.Element {
  const router = useNavigate();
  const {  setAuth } = useAuth();
  const {userData}=useParams();
 React.useEffect(()=>{
  if(userData){
    const loginInfo = JSON.parse(userData);
    setAuth(loginInfo)  
    window.location.href = paths.client.home
  }
 },[userData]) 

  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [nonce, setNonce] = React.useState<string>(generateNonce());
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true); 
      const data = await clientAuthService.signInWithPassword(values);
      if (data?.statusCode) {
        setAuth(null);
        setError('root', { type: 'server', message: data.message });
      }
      else {
        setAuth(data.data);
        setNonce(generateNonce())
        window.location.href = paths.client.home
      }
      setIsPending(false);
    },
    [router, setError]

  );

  const handleLoginGoogle = async (credentialResponse: any) => {
    const data = await clientAuthService.signInWithGoogle({ token: credentialResponse.credential, nonce: nonce });
    if (data?.statusCode) {
      setAuth(null);
      setError('root', { type: 'server', message: data.message });
    }
    else {
      setAuth(data.data);
      window.location.href = paths.client.home
    }
  }

  return (
    <div   className='w-[100%] sm:w-[20rem]'  >
      <div className='text-center flex flex-col justify-center items-center'>
        <div className='text-white text-center font-[700] text-4xl -mt-5 bg-[#699fbf70] px-5 py-2 rounded-ss-3xl rounded-br-3xl'>Sign In</div>
        <p className="text-white mt-3 mb-2" >
          You don't have an account?{' '}
          <Link to={paths.client.auth.signUp} className='text-[#fbceb5] hover:text-[#fbceb5] '   >
            Sign up
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5} >
          <Stack>
            <input {...register("username")} placeholder='Username' type="text" className='bg-[#e9e9e920] placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
            {errors.username?.message && <span className='text-[#f4ff4c] pl-1' >{errors.username.message}</span>}
          </Stack>
          <div>
            <div className='text-white  relative'>
              <input  {...register("password")} placeholder='Password' name='password' type={showPassword ? 'text' : 'password'} className='w-[100%] bg-[#e9e9e920] placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
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
            {errors?.password?.message && <span className='text-[#f4ff4c] pl-1' >{errors.password.message}</span>}
          </div>
          <div>
            <Link to={paths.client.auth.resetPassword} className='text-[#fbceb5] hover:text-[#fbceb5]' >
              Forgot password?
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <button type="submit" className='  rounded-3xl p-2 font-[500]  text-lg hover:bg-[#faba97] bg-[#fbceb5]  text-[#93658c]'>
            {isPending ? <CircularProgress size={20} color="success" /> : "Sign In"}
          </button>
          <span className='text-center text-white'>— Or Sign In With —</span>
          <div className='flex flex-col w-[100%] justify-center items-center gap-2 '> 
            <GoogleLogin 
              onSuccess={handleLoginGoogle}
              useOneTap
              nonce={nonce} 
            />
            <a href={paths.client.auth.signFBPath} className='w-40'>
              <div className='  text-center   rounded-md p-2 cursor-pointer     hover:bg-[#0f4ea1] bg-[#1877f2]  text-white'>
                <span className='flex items-center justify-center gap-1 '><FacebookTwoToneIcon sx={{ fontSize: "1.5rem" }} /> Facebook</span> 
              </div>
            </a> 
          </div>
        </Stack>
      </form >
    </div >
  );
}
