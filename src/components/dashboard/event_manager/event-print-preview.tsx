import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { EventDataType } from '../../../interface/event';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import eventParticipantService from '../../../services/client/eventParticipant.service';

interface Props {
    openDlgPrint: {
        open: boolean,
        eventData: EventDataType
    },
    handleClosePrint: any,
}
function EventPrintPreview({ openDlgPrint, handleClosePrint }: Props) {

    const componentRef = useRef<any>();
    const [eventParticipant, setEventParticipant] = useState<EventDataType[]|null>(null);
    const { open, eventData } = openDlgPrint;
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        
    });

    useEffect(() => {
        eventParticipantService.getUserParticipants(eventData?._id).then((res) => {
            if (res?.data) {
                setEventParticipant(res.data);
            }
        })
    }, [open])
    return (
        <Dialog
            open={open}
            onClose={handleClosePrint}
            fullWidth={true}
            maxWidth={"lg"}
            fullScreen
        >
            <DialogTitle>Event Print Preview</DialogTitle>
            <DialogContent sx={{ paddingBottom: 0 }}>

                <div className='w-full bg-slate-100 p-5'>
                    <div ref={componentRef} className="w-[210mm] min-h-[297mm] p-[10mm] m-auto font-sans text-[12pt] leading-[1.5] bg-white">

                        <header className=" mb-2">
                            <h1 className='text-center text-2xl font-bold text-[#5b362f] font-[DINNeuzeitGrotesk] mb-5'>{eventData?.name}</h1>
                            <div className=''>
                                <p className='  italic '>Event Time: {dayjs(eventData?.startTime).format('YYYY/MM/DD')} - {dayjs(eventData?.endTime).format('YYYY/MM/DD')}</p>
                                <p className=' first-line: italic mt-0'>Location: {eventData?.location}</p>
                            </div>
                        </header>
                        <h1 className='text-md font-bold'>List of subscribers</h1>
                        <table className="w-full border-collapse border  ">
                            <thead>
                                <tr>
                                    <th className="text-center border border-slate-300 w-[5rem]" >Index</th>
                                    <th className="text-center border border-slate-300 w-[16rem]">Name</th>
                                    <th className="text-center border border-slate-300 w-[10rem]">Birthday</th>
                                    <th className="text-center border border-slate-300 w-[4rem]">Seat</th>
                                    <th className="text-center border border-slate-300">Sign</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    eventParticipant?.map((participant: any, index: number) => {
                                        return (<tr key={index}>
                                            <td className="text-center border border-slate-300">{index}</td>
                                            <td className="text-center border border-slate-300">{participant.user.name}</td>
                                            <td className="text-center border border-slate-300">{dayjs(participant.birthday).format('YYYY/MM/DD')}</td>
                                            <td className="text-center border border-slate-300">{participant.seat}</td>
                                            <td className="text-center border border-slate-300"></td>
                                        </tr>)
                                    })
                                }

                            </tbody>
                        </table>

                        <footer className="mt-5 text-center ">
                            <p>Thank you for your business!</p>
                        </footer>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handlePrint} variant='contained'>Print Now</Button>
                <Button onClick={handleClosePrint}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventPrintPreview;