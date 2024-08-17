

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
import { Collapse, IconButton, LinearProgress, Tooltip } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import toast from 'react-hot-toast';
import { ConfirmPopover } from '../../ConfirmPopover';
import { SurveyDataType } from '../../../interface/survey';
import surveyService from '../../../services/admin/survey.service';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { paths } from '../../../paths';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface SurveysTableProps {
  count?: number;
  page?: number;
  rows?: SurveyDataType[];
  rowsPerPage?: number;
  isPending: boolean;
  fetchSurveys: Function,
  setSort: Function,
  setOpenDlg: Function
}



export function SurveyManagerTable({ count = 0, rows = [], page = 0, rowsPerPage = 0, isPending = false, fetchSurveys, setSort, setOpenDlg }: SurveysTableProps) {

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
        <Table sx={{ minWidth: '500px' }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'></TableCell>
              <TableCell> Title</TableCell>
              <TableCell align='center'>Created At</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <Row row={row} fetchSurveys={fetchSurveys} setOpenDlg={setOpenDlg} />
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

function Row(props: { setOpenDlg: Function, fetchSurveys: Function, row: SurveyDataType }) {
  const [collapse, setCollapse] = React.useState(false);
  const handleRemoveSurvey = async (idSurvey: string) => {
    const resRemove = await surveyService.removeSurvey(idSurvey);
    if (resRemove?.data) {
      toast.success("Survey remove successfully!")
      props.fetchSurveys();
    } else {
      toast.success(resRemove?.message)
    }
  };

  const copyToClipboard = (eventId: string) => {
    navigator.clipboard.writeText(import.meta.env.VITE_WEB_URL + paths.survey.surveyPath + eventId);
    toast.success('Copied to clipboard!');
  };

  const handleOpenEdit = (survey: string) => {
    props.setOpenDlg({
      open: true,
      survey: survey,
      surveyId: props.row._id
    })
  }
  return (
    <>
      <TableRow hover key={props.row._id}  >
        <TableCell  >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography variant="subtitle2">{props.row.title}</Typography>
          </Stack>
        </TableCell>
        <TableCell align='center'>{dayjs(props.row.createdAt).format('HH:MM - MMM D, YYYY')}</TableCell>
        <TableCell align='center'>
          <Tooltip title="Copy URL">
            <IconButton aria-label="edit" color="success" onClick={() => copyToClipboard(props.row._id)}>
              < ContentCopyIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Actions handleOpenEdit={() => handleOpenEdit(props.row.surveyConfig)} handleRemoveSurvey={() => handleRemoveSurvey(props.row._id)} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <SurveyResults row={props.row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}


function SurveyResults({ row }: any) {
  const [isPending, setIsPending] = React.useState(false);
  const [surveyResult, setSurveyResult] = React.useState<any>();

  const fetchSurveResults = async () => {
    setIsPending(true)
    const surveyRs = await surveyService.getSurveyResults(row._id);
    if (surveyRs?.data) {
      setSurveyResult(surveyRs?.data);
    } else toast.error(surveyRs?.message);

    setIsPending(false)
  }

  React.useEffect(() => {
    fetchSurveResults();
  }, []);


  // return (
  //   <div className='rounded-xl border '>
  //     {isPending && <LinearProgress color='secondary' />}
  //     <Table sx={{ minWidth: '800px' }}>
  //       <TableHead>
  //         <TableRow>
  //           <TableCell align='center'>User Name</TableCell>
  //           <TableCell align='center'>Action</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {
  //           surveyResult?.map((survey: any, index: number) => {
  //             return (
  //               <TableRow key={index}>
  //                 <TableCell align='center'>{survey.userName}</TableCell>
  //                 <TableCell align='center'>{survey.answer}</TableCell>
  //               </TableRow>
  //             )
  //           })
  //         }

  //       </TableBody> 
  //     </Table> 
  //     <TablePagination
  //       component="div"
  //       count={0}
  //       onPageChange={() => { }}
  //       onRowsPerPageChange={() => { }}
  //       page={1}
  //       rowsPerPage={10}
  //       rowsPerPageOptions={[5, 10, 25]}
  //     />
  //   </div>
  // )

  return (
    <div>
        {isPending && <LinearProgress color='secondary' />}
      <p className='text-md font-bold mb-2'>Survey Results ({surveyResult?.length})</p>
      <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 overflow-y-scroll max-h-[400px]'>
        {surveyResult?.map((survey: any, index: number) => {
          return (
            <div key={index}
              className='px-3 py-2 border rounded-lg text-center'>
              <p className='text-md font-bold'>{survey.userName}</p>
              <Tooltip title="View">
                <Link to={paths.survey.surveyResultPath + survey._id} target="_blank" className='text-md font-bold' >
                  <IconButton aria-label="edit" color="success" >
                    <RemoveRedEyeIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Actions = ({ handleOpenEdit, handleRemoveSurvey }: any) => {
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
        actionFunc={handleRemoveSurvey}
        anchorRef={anchorRef}
      />
    </>
  )
}


