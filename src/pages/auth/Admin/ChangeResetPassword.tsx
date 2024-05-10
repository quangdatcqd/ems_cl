import * as React from 'react';  
import { Layout } from '../../../components/auth/layout'; 
import { ChangeResetPasswordForm } from '../../../components/auth/change-reset-password-form';
 

export default function ChangeResetPassword(): React.JSX.Element {
  return (
    <Layout>  
        <ChangeResetPasswordForm/>
    </Layout>
  );
}
