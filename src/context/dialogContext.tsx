import { ReactNode, createContext, useState } from "react";

export interface DialogContextType {
  dialog: {
    title:string,
    open:boolean,
    text:string
  } ;
  setDialog: React.Dispatch<React.SetStateAction<any>>;
}

const DialogContext = createContext<DialogContextType>({
    dialog: {
      title:"",
      open:false,
      text:""
    },
    setDialog: () => {}
  } );

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<any>({open:false,title:"",text:""});

  return (
    <DialogContext.Provider value={{ dialog, setDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContext;