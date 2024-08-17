import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import Dialog from '@mui/material/Dialog';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import CreateSurvey from '../../../components/dashboard/surveys_manager/survey-creator';
import surveyService from '../../../services/admin/survey.service';
import toast from 'react-hot-toast';
import { SurveyManagerFilter } from '../../../components/dashboard/surveys_manager/suvey-manager-filter';
import { SurveyManagerTable } from '../../../components/dashboard/surveys_manager/survey-manager-table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import LoadingButton from '@mui/lab/LoadingButton';
interface surveyType {
  data: any;
  metadata: {
    count: number,
    page: number,
    last: number,
    limit: number,
    sort: {
      createdAt: string
    }
  }
}
export default function SurveyManager(): React.JSX.Element {
  const initialValues = {
    data: [],
    metadata: {
      count: 0,
      page: 1,
      last: 1,
      limit: 10,
      sort: {
        createdAt: "desc"
      }
    }
  }
  const [surveyData, setsurveyData] = React.useState<surveyType>(initialValues);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [openDlg, setOpenDlg] = React.useState<any>({ open: false, survey: null });
  const [sort, setSort] = React.useState<any>();
  const fetchSurveys = async () => {
    setIsPending(true)
    const Surveys = await surveyService.getSurvey(sort);
    setsurveyData(Surveys)
    setIsPending(false)
  }
  React.useEffect(() => {
    fetchSurveys();
  }, [sort])

  const handleCloseDlg = () => {
    fetchSurveys();
    setOpenDlg({
      open: false,
      survey: null,
      surveyId: null
    })
  }

  const handleOpenDlg = () => {
    setOpenDlg({
      open: true,
      survey: null
    })
  }
  const handleClearSurvey = () => {
    setOpenDlg({ open: true, survey: false })
  }

  const handleCreateOrUpdateSurvey = async () => {
    const data = localStorage.getItem("survey-json") || "{}";
    const JSONdata = JSON.parse(data);
    const survey = await surveyService.createOrUpdateSurvey({
      surveyConfig: data,
      title: JSONdata?.title || "",
      _id: openDlg?.surveyId || null
    })
    if (!survey?.data) {
      toast.error(survey?.message, { position: "top-center" })
      return;
    }
    if (openDlg?.surveyId) toast.success("Updated successfully", { position: "top-center" })
    else {
      toast.success("Created successfully", { position: "top-center" })
      handleCloseDlg();
    }
  }

  return (
    <Stack spacing={2}>
      <div className='flex justify-start gap-10'>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} onClick={handleOpenDlg} variant="contained">
          Add
        </Button>
      </div>
      <Dialog
        open={openDlg.open}
        onClose={handleCloseDlg}
        fullScreen={true}
      >
        <DialogActions sx={{ justifyContent: "start", gap: "10px", padding: "10px 15px" }}>
          <Button
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<ArrowBackIcon />}
            onClick={handleCloseDlg}
          >
            Home
          </Button>
          <LoadingButton
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            color='error'
            startIcon={<ClearAllIcon />}
            onClick={handleClearSurvey}
          >
            Clear section
          </LoadingButton>

          <Button onClick={handleCreateOrUpdateSurvey} variant='contained' color='success'>Save</Button>
        </DialogActions>
        <DialogContent sx={{ padding: "0px 15px" }}>
          <CreateSurvey survey={openDlg.survey} />
        </DialogContent>
      </Dialog>
      <SurveyManagerFilter setSort={setSort} />
      <SurveyManagerTable
        setOpenDlg={setOpenDlg}
        fetchSurveys={fetchSurveys}
        count={surveyData?.metadata?.count}
        page={surveyData?.metadata?.page - 1}
        rows={surveyData?.data}
        rowsPerPage={surveyData?.metadata?.limit}
        isPending={isPending}
        setSort={setSort}
      />
    </Stack>
  );
} 