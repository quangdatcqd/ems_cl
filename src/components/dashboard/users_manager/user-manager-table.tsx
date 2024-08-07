

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
// import { useSelection } from '../../../hooks/use-selection';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,   IconButton, LinearProgress  } from '@mui/material';
 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./users_manager.css"
import { EditForm } from './edit-form';
import userManagerService from '../../../services/admin/userManager.service';
import toast from 'react-hot-toast';
import { UserDataType } from '../../../interface/user';
import { ConfirmPopover } from '../../ConfirmPopover';



interface UsersTableProps {
  count?: number;
  page?: number;
  rows?: UserDataType[];
  rowsPerPage?: number;
  isPending: boolean;
  fetchUsers: Function,
  setSort: Function
}



export function UserManagerTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, fetchUsers, setSort }: UsersTableProps): React.JSX.Element {

  const [openDlg, setOpenDlg] = React.useState<any>({ open: false, userData: {} });



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


  const handlePageChange = (_: React.MouseEvent | null, page: number) => {
    setSort((sort: any) => ({ ...sort, page: page + 1 }))
  }

  const handlePerPageChange = (e: any) => {
    setSort((sort: any) => ({ ...sort, limit: e.target.value }))

  }


  const handleRemoveUser = async (idUser: string) => {
    const resRemove = await userManagerService.removeAdminUser(idUser);
    if (resRemove?.data) {
      toast.success("User remove successfully!")
      fetchUsers();
    } else {
      toast.success(resRemove?.message)
    }
  };
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
          <EditForm data={openDlg} handleCloseEdit={handleCloseEdit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
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
              </TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              // const isSelected = selected?.has(row.id);
              let userTypeCreated = "Default";
              if (row.googleId) userTypeCreated = "Google";
              if (row.facebookId) userTypeCreated = "Meta";
              return (
                <TableRow hover key={row._id}  >
                  {/* <TableCell padding="checkbox">
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
                  </TableCell> */}
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      {/* <Avatar src={row.avatar} /> */}
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>

                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell >  {userTypeCreated}  </TableCell>
                  <TableCell >  {row.type}  </TableCell>
                  <TableCell >
                    <span className={'badge-custom ' + row.status}>{row.status} </span>
                  </TableCell>
                  <TableCell >
                    <Actions handleOpenEdit={() => handleOpenEdit(row)} handleRemoveUser={() => handleRemoveUser(row._id)} />
                    {/* <ConfirmPopover idUser={row._id} fetchUsers={fetchUsers} /> */}
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


const Actions = ({ handleOpenEdit, handleRemoveUser }: any) => {
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const anchorRef = React.useRef<any>(null);
  return (
    <>
      <IconButton aria-label="edit" color="success" onClick={handleOpenEdit}>
        < BorderColorIcon />
      </IconButton>

      <IconButton
        ref={anchorRef}
        onClick={() => setOpenConfirmDelete(!openConfirmDelete)}
        color='error'
      >
        < DeleteForeverIcon />
      </IconButton>
      <ConfirmPopover message='Confirm!'
        open={openConfirmDelete} setOpen={setOpenConfirmDelete}
        actionFunc={handleRemoveUser}
        anchorRef={anchorRef}
      />
    </>
  )
}

// const ConfirmPopodver = ({ idUser, fetchUsers }: { idUser: string, fetchUsers: Function }) => {

//   const handleRemoveUser = async (event: Event | React.SyntheticEvent) => {
//     const resRemove = await userManagerService.removeAdminUser(idUser);
//     if (resRemove?.data) {
//       handleClose(event)
//       toast.success("User remove successfully!")
//       fetchUsers();
//     } else {
//       toast.success(resRemove?.message)
//     }
//   };
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef<HTMLButtonElement>(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };
//   const handleClose = (event: Event | React.SyntheticEvent) => {
//     if (
//       anchorRef.current &&
//       anchorRef.current.contains(event.target as HTMLElement)
//     ) {
//       return;
//     }
//     setOpen(false);
//   };

//   function handleListKeyDown(event: React.KeyboardEvent) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     } else if (event.key === 'Escape') {
//       setOpen(false);
//     }
//   }
//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current!.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return <>
//     <IconButton
//       ref={anchorRef}
//       id="composition-button"
//       aria-controls={open ? 'composition-menu' : undefined}
//       aria-expanded={open ? 'true' : undefined}
//       aria-haspopup="true"
//       onClick={handleToggle}
//       color='error'
//     >
//       < DeleteForeverIcon />
//     </IconButton>
//     <Popper
//       open={open}
//       anchorEl={anchorRef.current}
//       role={undefined}
//       placement="left-start"
//       transition
//       disablePortal
//       sx={{ zIndex: 9999 }}
//     >
//       {({ TransitionProps, placement }) => (
//         <Grow
//           {...TransitionProps} style={{
//             transformOrigin:
//               placement === 'bottom-start' ? 'left top' : 'left bottom',
//           }}
//         >
//           <Paper  >
//             <ClickAwayListener onClickAway={handleClose}>
//               <MenuList
//                 autoFocusItem={open}
//                 id="composition-menu"
//                 aria-labelledby="composition-button"
//                 onKeyDown={handleListKeyDown}
//                 sx={{ padding: 0 }}
//               >
//                 <MenuItem sx={{ padding: 0 }}  >
//                   <Button sx={{ borderRadius: 1 }} color='warning' variant='outlined' onClick={handleRemoveUser} >
//                     <CheckIcon /> Confirm Deletion</Button>
//                 </MenuItem>
//               </MenuList>
//             </ClickAwayListener>
//           </Paper>
//         </Grow>
//       )}
//     </Popper>
//   </>
// }