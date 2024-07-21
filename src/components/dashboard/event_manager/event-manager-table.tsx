

import * as React from 'react';
import dayjs from 'dayjs';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Table, TableBody, TablePagination, TableHead, Stack, Divider, Card, Box, TableRow, TableCell, Typography,   Button, ClickAwayListener, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grow, IconButton, LinearProgress,  MenuItem, MenuList, Paper, Popper, useMediaQuery,   Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import eventService from '../../../services/admin/eventService.service';
import { EventEditForm } from './event-edit-form';
import { EventDataType } from '../../../interface/event';
import { Link } from 'react-router-dom';
import { paths } from '../../../paths';
import { FoodMenu } from './food_manager/food-menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EventPrintPreview from './event-print-preview';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DownloadIcon from '@mui/icons-material/Download';

import QRScanner from './qr-scanner';
import { EventDetail } from './event-detail';
import { RewardMenu } from './reward_manager/reward-menu';
interface EvenManagerTableProps {
  count?: number;
  page?: number;
  rows?: EventDataType[];
  rowsPerPage?: number;
  isPending: boolean;
  fetchEvents: Function,
  setSort: Function
}



export function EvenManagerTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, fetchEvents, setSort }: EvenManagerTableProps): React.JSX.Element {

  const [openDlgEdit, setOpenDlgEdit] = React.useState<any>({ open: false, eventData: {} });
  const [openDlgPrint, setOpenDlgPrint] = React.useState<any>({ open: false, eventData: {} });
  const [openDlgMenu, setOpenDlgMenu] = React.useState<any>({ open: false, eventId: null });
  const [openDlgReward, setOpenDlgReward] = React.useState<any>({ open: false, eventData: null });
  const [openQRDlg, setOpenQRDlg] = React.useState<any>({
    open:false,
    eventData:null
  });
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleOpenReward = (value: any) => {
    setOpenDlgReward({
      open: true,
      eventData: value
    })
  };

  const handleCloseReward = () => {
    setOpenDlgReward({
      open: false,
      eventData: {}
    }) 
  };
  const handleOpenEdit = (value: any) => {
    setOpenDlgEdit({
      open: true,
      eventData: value
    })
  };

  const handleCloseEdit = () => {
    setOpenDlgEdit({
      open: false,
      eventData: {}
    })
    fetchEvents();
  };
  const handleOpenPrint = (row: EventDataType) => {
    setOpenDlgPrint({
      open: true,
      eventData: row
    })
  };
  const handleClosePrint = () => {
    setOpenDlgPrint({
      open: false,
      eventData: {}
    })
  };
  const handleOpenMenu = (value: string) => {

    setOpenDlgMenu({
      open: true,
      eventId: value
    })
  };
  const handleCloseMenu = () => {
    setOpenDlgMenu({
      open: false,
      eventId: null
    })
  };
  const handleCloseQRDlg = () => { 
    setOpenQRDlg({
      open:false,
      eventData:null
    })
  }
  const handleOpenQRDlg = (row:any) => {
    setOpenQRDlg({
      open:true,
      eventData:row 
    })
  }

  const handlePageChange = (_: React.MouseEvent | null, page: number) => {
    setSort((sort: any) => ({ ...sort, page: page + 1 }))
  }

  const handlePerPageChange = (e: any) => {
    setSort((sort: any) => ({ ...sort, limit: e.target.value }))
  }


 
  return (
    <Card>
      {isPending && <LinearProgress />}
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Collapse</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Duration</TableCell> 
              <TableCell align='center'>Food </TableCell>
              <TableCell align='center'>Reward</TableCell>
              <TableCell align='center'>Website</TableCell>
              <TableCell align='center'>QR</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <Row
                  key={row._id}
                  row={row}
                  fetchEvents={fetchEvents}
                  handleOpenMenu={handleOpenMenu}
                  handleOpenReward={handleOpenReward}
                  handleOpenEdit={handleOpenEdit}
                  handleOpenPrint={handleOpenPrint}
                  handleOpenQRDlg={()=>handleOpenQRDlg(row)}
                />
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {openDlgEdit.open && <EventEditForm openDlgEdit={openDlgEdit} handleCloseEdit={handleCloseEdit} />}
      {openDlgPrint.open && <EventPrintPreview openDlgPrint={openDlgPrint} handleClosePrint={handleClosePrint} />}

      <Dialog
        open={openDlgMenu.open}
        onClose={handleCloseMenu}
        fullWidth={true}
        maxWidth={"lg"}
        fullScreen={isMobile}
      >
        <DialogTitle>Food Menu</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <FoodMenu eventId={openDlgMenu.eventId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu}>Close</Button>
        </DialogActions>
      </Dialog> 

      <Dialog
        open={openDlgReward.open}
        onClose={handleCloseReward}
        fullWidth={true}
        maxWidth={"lg"}
        fullScreen={isMobile}
      >
        <DialogTitle>Reward Menu</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <RewardMenu eventData={openDlgReward.eventData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReward}>Close</Button>
        </DialogActions>
      </Dialog> 
      <QRScanner openDlg={openQRDlg} handleCloseDlg={handleCloseQRDlg}/>
    </Card>
  );
}



function Row({ row, handleOpenMenu, fetchEvents, handleOpenEdit, handleOpenPrint,handleOpenQRDlg,handleOpenReward }: any) {
  const [open, setOpen] = React.useState(false);
  const copyToClipboard = (eventId: string) => {
    navigator.clipboard.writeText(import.meta.env.VITE_WEB_URL + paths.website.viewPath + eventId);
    toast.success('Copied to clipboard!');
  };
  const handleDownload = (eventId: string) => eventService.QRDownload(import.meta.env.VITE_WEB_URL + paths.website.viewPath + eventId);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell  >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}><Typography variant="subtitle2">{row.name}</Typography></Stack>
        </TableCell>
        <TableCell>{dayjs(row.startTime).format('YYYY-MM-DD') + ' - ' + dayjs(row.endTime).format('YYYY-MM-DD')}</TableCell>
        
        <TableCell align='center'>
          {
            row?.useFood === true ? <Button onClick={() => handleOpenMenu(row._id)}>Menu</Button> : "Disabled"
          }
        </TableCell>
        <TableCell align='center'><Button onClick={() => handleOpenReward(row)}>Reward</Button> </TableCell>
        <TableCell align='center' >
          <Link className='react-link' to={paths.admin.website.setupPath + `/${row._id}`}>Editor</Link>
        </TableCell>
        <TableCell align='center'>
          <Tooltip title="Scan QR">
            <IconButton aria-label="edit" color="info" onClick={handleOpenQRDlg}>
              <QrCodeScannerIcon sx={{ fontSize: 26 }}  />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save QR URL ">
            <IconButton aria-label="edit" color="success" onClick={() => handleDownload(row._id)}>
              <DownloadIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align='center'>
          <Tooltip title="Copy URL">
            <IconButton aria-label="edit" color="success" onClick={() => copyToClipboard(row._id)}>
              < ContentCopyIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Event">
            <IconButton aria-label="edit" color="success" onClick={() => handleOpenEdit(row)}>
              < BorderColorIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          {
            row?.typeCheckin === "Offline" &&
            <Tooltip title="Print check list user">
              <IconButton aria-label="edit" color="success" onClick={() => handleOpenPrint(row)}>
                < LocalPrintshopIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          }
          <ConfirmPopover idUser={row._id} fetchEvents={fetchEvents} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <EventDetail event={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const ConfirmPopover = ({ idUser, fetchEvents }: { idUser: string, fetchEvents: Function }) => {

  const handleRemoveUser = async (event: Event | React.SyntheticEvent) => {
    const resRemove = await eventService.removeEvent(idUser);
    if (resRemove?.data) {
      handleClose(event)
      toast.success("User remove successfully!")
      fetchEvents();
    } else {
      toast.success(resRemove?.message)
    }
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return <>
    <Tooltip title="Delete Event">
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        color='error'
      >
        < DeleteForeverIcon sx={{ fontSize: 23 }} />
      </IconButton>
    </Tooltip>
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="left-start"
      transition
      disablePortal
      sx={{ zIndex: 9999 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps} style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper  >
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
                sx={{ padding: 0 }}
              >
                <MenuItem sx={{ padding: 0 }}  >
                  <Button sx={{ borderRadius: 1 }} color='warning' variant='outlined' onClick={handleRemoveUser} >
                    <CheckIcon /> Confirm Deletion</Button>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper></>

}