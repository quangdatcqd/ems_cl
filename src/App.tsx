
import { Suspense } from "react";
import Routes from "./routes";
import Loading from "./components/Loading";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./components/core/theme-provider/theme-provider"; 

import AuthProvider from "./provider/authProvider";
import WebEditorProvider from "./provider/webEditorProvider";
import { GoogleOAuthProvider } from '@react-oauth/google'; 


function App() {
  

  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <AuthProvider>
          <WebEditorProvider> 
              <GoogleOAuthProvider clientId="754923245716-lr4bar37omhol71vjct1ggd6hni5sntl.apps.googleusercontent.com">
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
