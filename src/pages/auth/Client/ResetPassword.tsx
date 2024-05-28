

import * as React from 'react'; 
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'; 
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../provider/authProvider';
import { paths } from '../../../paths'; 
import { CircularProgress } from '@mui/material';
import clientAuthService from '../../../services/clientAuth.service';  
import toast from 'react-hot-toast';
const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  username: zod.string().min(1, { message: 'Username is required' })
});

type Values = zod.infer<typeof schema>;

const defaultValues = { username: '', email: '' } satisfies Values;

export default function ResetPassword(): React.JSX.Element {
  const router = useNavigate();
  const { setAuth } = useAuth();
  const { userData } = useParams();
  React.useEffect(() => {
    if (userData) {
      const loginInfo = JSON.parse(userData);
      setAuth(loginInfo)
      window.location.href = paths.client.home
    }
  }, [userData])
 
  const [isPending, setIsPending] = React.useState<boolean>(false);  
  const { register, handleSubmit, setError, formState: { errors }, } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      const dataReset = await clientAuthService.resetPassword(values);
      if (dataReset?.statusCode !== 201) {
        setError('root', { type: 'server', message: dataReset.message });
      }
      else {
        toast.success(dataReset?.message) 
      }
      setIsPending(false);
    },
    [router, setError]

  ); 
  return (
    <Stack spacing={2}>
      <div className='text-center flex flex-col justify-center items-center mb-3'>
        <div className='text-white text-center font-[700] text-4xl -mt-5 bg-[#699fbf70] px-5 py-2 rounded-ss-3xl rounded-br-3xl'>Reset password</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1.5}>
          <Stack>
            <input {...register("email")} placeholder='Email' type="text" className='bg-[#e9e9e920] placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
            {errors.email?.message && <span className='text-[#f4ff4c] pl-1' >{errors.email.message}</span>}
          </Stack>
          <Stack>
            <input {...register("username")} placeholder='Username' type="text" className='bg-[#e9e9e920] placeholder:text-white focus:bg-transparent hover:bg-transparent outline-none border border-[#d0d0d0d3] rounded-3xl py-2 px-5 text-white' />
            {errors.username?.message && <span className='text-[#f4ff4c] pl-1' >{errors.username.message}</span>}
          </Stack>
          <div>
            <Link to={paths.client.auth.signIn} className='text-[#fbceb5] hover:text-[#fbceb5]' >
              Back to sign in.
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <button type="submit" className='  rounded-3xl p-2 font-[500]  text-lg hover:bg-[#faba97] bg-[#fbceb5]  text-[#93658c]'>
            {isPending ? <CircularProgress size={20} color="success" /> : "Send recovery link"}
          </button>
        </Stack>
      </form >
    </Stack >
  );
}
