import * as React from 'react';  
import { Layout } from '../../../components/auth/layout'; 
import { ResetPasswordForm } from '../../../components/auth/reset-password-form';
 

export default function ResetPassword(): React.JSX.Element {
  return (
    <Layout>  
        <ResetPasswordForm/>
    </Layout>
  );
}
