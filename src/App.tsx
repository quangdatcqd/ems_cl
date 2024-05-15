 
import {  Suspense } from "react"; 
import Routes from "./routes";
import Loading from "./components/Loading";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./components/core/theme-provider/theme-provider";
import DialogMessage from "./components/DialogMessage";
import { DialogProvider } from "./context/dialogContext"; 
 
import AuthProvider from "./provider/authProvider";

function App() {
  return (
    <Suspense fallback={<Loading />}>
    <ThemeProvider> 
      <AuthProvider>
      <DialogProvider> 
        <Routes />
        <Toaster position="bottom-left" />
        <DialogMessage /> 
      </DialogProvider> 
      </AuthProvider> 
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
