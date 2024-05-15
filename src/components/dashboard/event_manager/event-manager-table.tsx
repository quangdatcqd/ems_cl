 

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelection } from '../../../hooks/use-selection';
import { Button, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, Grow, IconButton, LinearProgress, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
  
import toast from 'react-hot-toast';
import eventService  from '../../../services/admin/eventService.service';
import { EventEditForm } from './event-edit-form';
import { EventDataType } from '../../../types/event';
import { Link } from 'react-router-dom';
import { paths } from '../../../paths';

 
interface EvenManagerTableProps {
  count?: number;
  page?: number;
  rows?: EventDataType[];
  rowsPerPage?: number;
  isPending: boolean;
  fetchUsers: Function,
  setSort: Function
}



export function EvenManagerTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, fetchUsers, setSort }: EvenManagerTableProps): React.JSX.Element {

  const [openDlg, setOpenDlg] = React.useState<any>({ open: false, userData: {} });

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const handleOpenEdit = (value: any) => {

    setOpenDlg({
      open: true,
      userData: value
    })
  };
  const handleCloseEdit = () => {
    setOpenDlg({
      open: false,
      userData: {}
    })
    fetchUsers();
  };


  const handlePageChange = ( _: React.MouseEvent | null, page: number) => {
    setSort((sort: any) => ({ ...sort, page: page + 1 }))
  }

  const handlePerPageChange = (e: any) => {
    setSort((sort: any) => ({ ...sort, limit: e.target.value }))

  }

  return (
    <Card>
      {isPending && <LinearProgress />}
      <Dialog
        open={openDlg.open}
        onClose={handleCloseEdit}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Modify User</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <EventEditForm eventData={openDlg.userData} handleCloseEdit={handleCloseEdit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Location</TableCell>   
              <TableCell>Website</TableCell>   
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}> 
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{dayjs(row.startTime).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{dayjs(row.endTime).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell><Link className='react-link' to={paths.website.setupPath+`/${row.id}`}>view</Link></TableCell>
                  <TableCell >
                    <IconButton aria-label="edit" color="success" onClick={() => handleOpenEdit(row)}>
                      < BorderColorIcon />
                    </IconButton>
                    <ConfirmPopover idUser={row.id} fetchUsers={fetchUsers} />
                  </TableCell>
                </TableRow>
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
    </Card>
  );
}


const ConfirmPopover = ({ idUser, fetchUsers }: { idUser: string, fetchUsers: Function }) => {

  const handleRemoveUser = async (event: Event | React.SyntheticEvent) => {
    const resRemove = await eventService.removeEvent(idUser);
    if (resRemove?.data) {
      handleClose(event)
      toast.success("User remove successfully!")
      fetchUsers();
    } else {
      toast.success(resRemove?.message)
    }
  };
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

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
      id="composition-button"
      aria-controls={open ? 'composition-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
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