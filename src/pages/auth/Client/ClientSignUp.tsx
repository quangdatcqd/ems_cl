import * as React from 'react'; 
  
import { Layout } from '../../../components/auth/layout';
import { SignUpForm } from '../../../components/auth/sign-up-form';
 

export default function ClientSignUp(): React.JSX.Element {
  return (
    <Layout> 
        <SignUpForm /> 
    </Layout>
  );
}
