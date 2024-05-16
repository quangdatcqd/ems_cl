
import { Suspense } from "react";
import Routes from "./routes";
import Loading from "./components/Loading";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./components/core/theme-provider/theme-provider";
import DialogMessage from "./components/DialogMessage";

import AuthProvider from "./provider/authProvider";
import WebEditorProvider from "./provider/webEditorProvider";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <AuthProvider>
          <WebEditorProvider>
            <Routes />
            <Toaster position="bottom-left" />
            <DialogMessage />
          </WebEditorProvider>
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
