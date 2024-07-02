

import * as React from 'react';
import dayjs from 'dayjs';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Table, TableBody, TablePagination, TableHead, Stack, Divider, Card, Box, TableRow, TableCell, Typography, ListItemText, Avatar, Button, ClickAwayListener, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grow, IconButton, LinearProgress, List, ListItem, ListItemAvatar, MenuItem, MenuList, Paper, Popper, useMediaQuery, Grid } from '@mui/material';
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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import TransgenderIcon from '@mui/icons-material/Transgender';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import QueueIcon from '@mui/icons-material/Queue';

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
  const [openDlgMenu, setOpenDlgMenu] = React.useState<any>({ open: false, eventId: null });
  const isMobile = useMediaQuery('(max-width: 600px)');

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
              <TableCell>Location</TableCell>
              <TableCell>Food </TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Action</TableCell>
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
                  handleOpenEdit={handleOpenEdit}
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

      { openDlgEdit.open && <EventEditForm openDlgEdit={openDlgEdit} handleCloseEdit={handleCloseEdit} />}
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
    </Card>
  );
}



function Row({ row, handleOpenMenu, fetchEvents, handleOpenEdit }: any) {
  const [open, setOpen] = React.useState(false);
  const copyToClipboard = (eventId: string) => {
    navigator.clipboard.writeText(import.meta.env.VITE_WEB_URL + paths.website.viewPath + eventId);
    toast.success('Copied to clipboard!');
  };
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
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography variant="subtitle2">{row.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{dayjs(row.startTime).format('YYYY-MM-DD') + ' - ' + dayjs(row.endTime).format('YYYY-MM-DD')}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>
          {
            row?.useFood === true ?
              <Button onClick={() => handleOpenMenu(row._id)}>Menu</Button>
              : "Disabled"
          }
        </TableCell>
        <TableCell><Link className='react-link' to={paths.admin.website.setupPath + `/${row._id}`}>editor</Link></TableCell>
        <TableCell >
          <IconButton aria-label="edit" color="success" onClick={() => copyToClipboard(row._id)}>
            < ContentCopyIcon />
          </IconButton>
          <IconButton aria-label="edit" color="success" onClick={() => handleOpenEdit(row)}>
            < BorderColorIcon />
          </IconButton>
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
function EventDetail({ event }: { event: EventDataType }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Grid container spacing={0} >
        <Grid item xl={3}  lg={4} sm={6} xs={12}>
          <ListItem sx={{padding:0}}>
            <ListItemAvatar>
              <Avatar>
                <RunningWithErrorsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Registration Deadline" secondary={dayjs(event.registrationDeadline).format('YYYY-MM-DD')} />
          </ListItem>
        </Grid>
        <Grid item xl={3}  lg={4} sm={6} xs={12}>
          <ListItem sx={{padding:0}}>
            <ListItemAvatar>
              <Avatar>
                <PeopleAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Capacity Limit" secondary={event.capacityLimit} />
          </ListItem>
        </Grid>

        <Grid item xl={3}  lg={4} sm={6} xs={12}>
          <ListItem sx={{padding:0}}>
            <ListItemAvatar>
              <Avatar>
                <ContactEmergencyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Age Range" secondary={event.allowMinAge + ' - ' + event.allowMaxAge} />
          </ListItem>
        </Grid>
        <Grid item xl={3}  lg={4} sm={6} xs={12}>
          <ListItem sx={{padding:0}}>
            <ListItemAvatar>
              <Avatar>
                <TransgenderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Allowed Gender" secondary={event.allowGender} />
          </ListItem>
        </Grid>
        <Grid item xl={3} lg={4} sm={6} xs={12}>
          <ListItem sx={{padding:0}}>
            <ListItemAvatar>
              <Avatar>
                <QueueIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Allowed Waitlist" secondary={event.allowWaitlist ? "Yes":"No" } />
          </ListItem>
        </Grid>
      </Grid> 
    </List>
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
    <IconButton
      ref={anchorRef}
      onClick={handleToggle}
      color='error'
    >
      < DeleteForeverIcon />
    </IconButton>
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
    </Popper>
  </>
}