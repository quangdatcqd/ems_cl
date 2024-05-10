import * as React from 'react';  
import { Layout } from '../../../components/auth/layout';
import { SignInForm } from '../../../components/auth/sign-in-form'; 
 

export default function AdminLogin(): React.JSX.Element {
  return (
    <Layout>  
        <SignInForm />  
    </Layout>
  );
}
