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
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { LinearProgress, TablePagination } from '@mui/material';
import { Divider } from 'rsuite';
import dayjs from 'dayjs';
import eventParticipantService from '../../../services/client/eventParticipant.service';


interface EvenManagerTableProps {
  count?: number;
  page?: number;
  rows?: any;
  rowsPerPage?: number;
  isPending: boolean;
  setSort: Function
}

function Row({ row }: any) {
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
              <ListUsers eventId={row._id} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function ListUsers({ eventId }: any) {
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
      <p className='mb-1'>
        User Joined ({listUsers?.length})
      </p>
      <div className='grid  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'> 
        {listUsers?.map((user: any, index: number) => {
          if (!user?.onWaitlist)
            return (
              <div className=' p-2 font-[500] px-3 border-2 border-[#fed995] border-dashed  bg-[#fff8ebb3]   rounded-xl text-slate-500' key={index}>
                {/* <PersonPinIcon color='success' sx={{ fontSize: 35 }} /> */}
                <p className='mt-0'>
                  <ContactEmergencyIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                  <span className=''>{user.user.name}</span>
                </p>
                <p className="mt-0 italic text-slate-500  ">
                  <TransgenderIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                  <span>{user.gender}</span>
                </p>
                <p className='mt-0'>
                  <ChairAltIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                  <span className=''>{user.seat}</span>
                </p>

              </div>)
        })}
      </div>
      <p className='mb-1 mt-4'>
        Wait List:
      </p>
      <div className='grid  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
        {listUsers?.map((user: any, index: number) => {
          if (user?.onWaitlist)
            return (
              <div className=' p-2 font-[500] px-3 border-2 border-[#fed995] border-dashed  bg-[#fff8eb9a]   rounded-xl text-slate-500' key={index}>
                {/* <PersonPinIcon color='success' sx={{ fontSize: 35 }} /> */}
                <p className='mt-0'>
                  <ContactEmergencyIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                  <span className=''>{user.user.name}</span>
                </p>
                <p className="mt-0 italic text-slate-500  ">
                  <TransgenderIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                  <span>{user.gender}</span>
                </p>
                <p className='mt-0'>
                  <ChairAltIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                  <span className=''>{user.seat}</span>
                </p>

              </div>)
        })}
      </div>
    </div>
  )
}


export default function EventResTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, setSort }: EvenManagerTableProps) {
  const handlePageChange = (_: React.MouseEvent | null, page: number) => {
    setSort((sort: any) => ({ ...sort, page: page + 1 }))
  }

  const handlePerPageChange = (e: any) => {
    setSort((sort: any) => ({ ...sort, limit: e.target.value }))
  }


  return (
    <>
      {isPending && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <Row key={row.name} row={row} />
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
    </>
  );
}
