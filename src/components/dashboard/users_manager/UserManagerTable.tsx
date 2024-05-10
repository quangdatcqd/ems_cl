'use client';

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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress, Popover } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; 
import "./users_manager.css"
import { EditForm } from './EditForm';
import userManagerService from '../../../services/admin/userManager.service';
import toast from 'react-hot-toast';
function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  // avatar: string;
  name: string;
  username: string;
  email: string;
  // address: { city: string; state: string; country: string; street: string };
  phoneNumber: string;
  type: string;
  createdAt: Date;
  status: string;

}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
  isPending: boolean;
  fetchUsers: Function
}



export function UserManagerTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, fetchUsers }: CustomersTableProps): React.JSX.Element {

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
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
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
                      {/* <Avatar src={row.avatar} /> */}
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>

                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell >  {row.type}  </TableCell>
                  <TableCell >
                    <span className={'badge-custom ' + row.status}>{row.status} </span>
                  </TableCell>
                  <TableCell >
                    <IconButton aria-label="edit" color="success" onClick={() => handleOpenEdit(row)}>
                      < BorderColorIcon />
                    </IconButton>
                    <ConfirmPopover idUser={row.id} fetchUsers={fetchUsers}/>

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
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}


const ConfirmPopover = ({idUser,fetchUsers}:{idUser:string,fetchUsers:Function}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null); 
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => { 
    setAnchorEl(event.currentTarget);
   
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemoveUser = async () => {
    const resRemove = await userManagerService.removeAdminUser(idUser); 
    if(resRemove?.data){
      handleClose();
      toast.success("User remove successfully!")
      fetchUsers();
    } else{
      toast.success(resRemove?.message)
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return <>
    <IconButton aria-label="remove" color="error" onClick={handleClick}>
      < DeleteForeverIcon />
    </IconButton>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Button aria-describedby={id} variant="outlined" color='error' onClick={handleRemoveUser}>
        Comfirm!
      </Button>
    </Popover >
  </>
}