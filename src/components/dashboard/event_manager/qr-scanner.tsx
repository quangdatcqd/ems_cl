import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import TransgenderIcon from '@mui/icons-material/Transgender';
import CheckIcon from '@mui/icons-material/Check';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import eventParticipantService from '../../../services/client/eventParticipant.service';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import dayjs from 'dayjs';
import { EventDataType } from '../../../interface/event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ErrorIcon from '@mui/icons-material/Error';

interface EventCreateFormProps {

    openDlg: {
        open: boolean,
        eventData: EventDataType
    },
    handleCloseDlg: any
}
interface CheckedInData {
    userName: string,
    eventName: string,
    gender: string,
    seat: string,
    birthday: string
}

function QRScanner({ openDlg, handleCloseDlg }: EventCreateFormProps) {
    const [cameras, setCameras] = useState<any>([]);
    const [selectedCamera, setSelectedCamera] = useState('');

    const [checkedInData, setCheckedInData] = useState<CheckedInData | any>()
    const matchSM = useMediaQuery('(max-width:600px)');
    const handleCheckin = async (result: any, error: any) => {
        if (error) return
        if (!result && !result.includes('EMS-')) return;
        eventParticipantService.checkinByTicketCode(openDlg.eventData._id, result).then((res: any) => {
            res?.data ? setCheckedInData(res.data) : setCheckedInData("404")
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {

        })

    }
    const handleConfirmCheckin = () => {
        setCheckedInData(null)
    }

    const closeDlg = () => {
        setCheckedInData(null)
        handleCloseDlg()
    }
    useEffect(() => {
        // request permission
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    const videoDevices = devices.filter(device => device.kind === 'videoinput');
                    if (videoDevices.length <= 1 && !videoDevices[0]?.deviceId) return
                    setCameras(videoDevices);
                    const lastDevice = videoDevices[videoDevices.length - 1];
                    setSelectedCamera(lastDevice?.deviceId || '');
                })
                .catch(error => console.error('Error getting media devices:', error))
            )
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            })

        return () => setCheckedInData(null)
    }, [openDlg])
    const handleCameraChange = (event: any) => {
        setSelectedCamera(event.target.value);
    };
    return (
        <Dialog
            open={openDlg.open}
            onClose={closeDlg}
            maxWidth={"sm"}
            fullScreen={matchSM}
            fullWidth={true}
        >
            <DialogTitle>Scan QR check in</DialogTitle>
            <DialogContent sx={{ paddingBottom: 0 }}>
                <div className="flex w-full justify-center items-center ">
                    <EmojiEventsIcon sx={{ color: 'orange', fontSize: 40, borderRadius: '50%', border: '3px solid orange' }} />
                </div>
                <p className="text-xl uppercase text-[orange] text-center w-[100%] mb-3 ">{openDlg.eventData?.name}</p>
                {
                    cameras?.length <= 0 && <p className=" text-center  font-bold  text-red-500  ">No cameras found  </p>
                }
                {
                    (!checkedInData && !(checkedInData === "404")) &&
                    < >
                        <div className='mx-auto w-100 sm:mb-0 mb-3'>
                            <label htmlFor="camera-select">Camera:</label>
                            <select id="camera-select" className='font-bold' value={selectedCamera} onChange={handleCameraChange}>
                                <option value="">None</option>
                                {cameras?.map((camera: any) => (
                                    <option key={camera.deviceId} value={camera.deviceId}  >
                                        {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='relative  mx-auto  sm:w-[400px]  w-100   '>
                            <p className=" absolute  text-slate-300 text-center left-[50%] -translate-x-[50%] top-14 font-bold z-50 w-[100%] ">Point the camera at the QR code  </p>
                            <QrReader
                                key={selectedCamera}
                                containerStyle={{ width: "100%" }}
                                constraints={{ deviceId: selectedCamera }}
                                onResult={handleCheckin}
                            />
                        </div>
                    </>
                }
                {
                    (checkedInData && checkedInData !== "404") && <div className="text-center mt-5 ">
                        <div className="bg-green-500 w-10 h-10 rounded-full m-auto flex justify-center items-center">
                            <CheckIcon sx={{ color: 'white', fontSize: 35 }} />
                        </div>
                        <p className="text-md font-bold mt-0  ">Successfully.</p>
                        <p className="text-sm font-500 text-slate-500 mt-0 ">You have checked in the event</p>
                        <p className=" italic text-slate-500 text-sm">
                            <ContactEmergencyIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                            Name:  <span className='text-green-500'>{checkedInData?.userName}</span>
                        </p>
                        <p className=" italic text-slate-500 text-sm">
                            <TransgenderIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                            Birthday:  <span className='text-green-500'>{dayjs(checkedInData?.birthday).format('DD-MM-YYYY')}</span>
                        </p>
                        <p className=" italic text-slate-500 text-sm">
                            <TransgenderIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                            Gender:  <span className='text-green-500'>{checkedInData?.gender}</span>
                        </p>
                        <p className={`  italic text-slate-500 text-sm`}>
                            <ChairAltIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                            Your seat:  <span className='text-green-500'>{checkedInData?.seat}</span>
                        </p>
                        <Button variant='contained' color='success' onClick={handleConfirmCheckin} style={{ marginTop: "20px" }}>Continue</Button>
                    </div>
                }
                {
                    (checkedInData === "404") &&
                    <div className='text-center mt-5'>
                        <ErrorIcon sx={{ color: 'red', fontSize: 35 }} />
                        <p className="text-md font-bold mt-0 text-[red]  ">Your ticket not found for this event.</p>
                        <Button variant='contained' color='success' onClick={handleConfirmCheckin} style={{ marginTop: "20px" }}>Continue</Button>
                    </div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDlg}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default QRScanner;