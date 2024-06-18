
import { Suspense } from "react";
import Routes from "./routes";
import Loading from "./components/Loading";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./components/core/theme-provider/theme-provider"; 

import AuthProvider from "./provider/authProvider";
import WebEditorProvider from "./provider/webEditorProvider";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { GOOGLE_CLIENT_ID } from "./paths";


function App() { 

  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <AuthProvider>
          <WebEditorProvider> 
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Routes />
              </GoogleOAuthProvider> 
            <Toaster position="bottom-left" /> 
          </WebEditorProvider>
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
