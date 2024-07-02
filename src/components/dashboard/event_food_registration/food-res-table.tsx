import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TablePagination } from '@mui/material';
import { Divider } from 'rsuite';
import dayjs from 'dayjs';
import eventParticipantService from '../../../services/client/eventParticipant.service';
import PersonPinIcon from '@mui/icons-material/PersonPin'; 
import FoodMenu from './FoodMenu';

interface EvenManagerTableProps {
  count?: number;
  page?: number;
  rows?: any;
  rowsPerPage?: number;
  isPending: boolean;
  setSort: Function
}

function Row({ row,handleOpenMenu }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{dayjs(row.startTime).format('YYYY-MM-DD')}</TableCell>
        <TableCell align="right">{dayjs(row.endTime).format('YYYY-MM-DD')}</TableCell>
        <TableCell align="right">{row.location}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <ListUsers eventId={row._id} handleOpenMenu={handleOpenMenu} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function ListUsers({ eventId,handleOpenMenu }: any) {
  const [listUsers, setListUsers] = React.useState([])

  React.useEffect(() => {
    const fetchUser = async () => {
      const users = await eventParticipantService.getUserParticipants(eventId);
      if (users?.data) setListUsers(users.data)
    }
    fetchUser()
  }, [])
  return (
    <div className='  '>
      <Typography variant="h6" gutterBottom component="div">
        User ({listUsers?.length})
      </Typography>
      <div className='flex gap-5 '>
        {listUsers?.map((user: any, index: number) => { 
          return (
            <div className='p-5 py-3  flex flex-col justify-center items-center bg-white font-bold shadow-lg rounded-xl' key={index}>
              <PersonPinIcon color='success' sx={{ fontSize: 35 }} />
              <div className='mb-2 text-center'>{user.user.name}</div>
              <Button color="success" onClick={()=>handleOpenMenu(eventId,user.user._id)}>View Foods</Button>
            </div>)
        })}
      </div>
    </div>
  )
}


export default function FoodResTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, setSort }: EvenManagerTableProps) {
  const [openDlgMenu, setOpenDlgMenu] = React.useState<any>({ open: false, eventId: null });
  const handlePageChange = (_: React.MouseEvent | null, page: number) => {
    setSort((sort: any) => ({ ...sort, page: page + 1 }))
  }

  const handlePerPageChange = (e: any) => {
    setSort((sort: any) => ({ ...sort, limit: e.target.value }))
  }

  
  const handleOpenMenu = (eventId: string,userId:string) => { 
    
    setOpenDlgMenu({
      open: true,
      eventId: eventId,
      userId: userId
    })
  };
  const handleCloseMenu = () => {
    setOpenDlgMenu({
      open: false,
      eventId: null,
      userId: null
    }) 
  };

  return (
    <>
     {isPending && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Collapse</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <Row key={row.name} row={row} handleOpenMenu={ handleOpenMenu }/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

      <Dialog
        open={openDlgMenu.open}
        onClose={handleCloseMenu}
        fullWidth={true}
        maxWidth={"xl"}
      >
        <DialogTitle>Food Menu</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <FoodMenu eventId={openDlgMenu.eventId} userId={openDlgMenu.userId}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
