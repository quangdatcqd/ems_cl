import { useContext  } from "react";
import DialogContext, { DialogContextType } from "../context/dialogContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
const DialogMessage = () => {
  const { dialog,setDialog } = useContext<DialogContextType>(DialogContext);  
  const handleClose = () =>{
    setDialog({ ...dialog,open:false })
  }
  return <div >
    {
     
        <Dialog
     
          open={dialog.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >  
        
          <DialogTitle id="alert-dialog-title">
            {dialog.title} 
          </DialogTitle>
          <DialogContent> 
              {dialog.text} 
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog> 
}

  </div>
}
export default DialogMessage;