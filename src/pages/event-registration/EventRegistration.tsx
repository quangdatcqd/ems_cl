import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import VerifiedIcon from '@mui/icons-material/Verified'; 
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import eventParticipantService from "../../services/client/eventParticipant.service"; 
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import dayjs from "dayjs";
import toast from "react-hot-toast";
import eventFoodRegisServiceService from "../../services/admin/eventFoodRegisService.service";
import FoodMenu from "../../components/dashboard/event_food_registration/FoodMenu";
export default function EventRegistration() {
    const [registrationInfo, setRegistrationInfo] = React.useState<any>(null);
    const [orders, setOrders] = React.useState<any>([]);
    const [loadingBtn, setLoadingBtn] = React.useState<boolean>(false);


    const params = useParams();
    const navigator = useNavigate()


    const getEventFoodRegis = async () => {
        const eventFoodRes = await eventFoodRegisServiceService.getEventFoodRegis(params.eventId)
        if (eventFoodRes?.data) {
            setOrders(eventFoodRes?.data)
        }
    }

    const handleJoinEvent = async () => {
        if (params.eventId) {
            setLoadingBtn(true)
            const eventPartRs = await eventParticipantService.createEventParticipant({eventId:params.eventId})
            if (eventPartRs?.data) { 
                setRegistrationInfo(eventPartRs?.data)
                getEventFoodRegis();
            }
            else if (eventPartRs?.statusCode === 401) {
                navigator("/auth/sign-in")
            }
            else navigator(-1)  
        }
        setLoadingBtn(false)
    }
    React.useEffect(() => {
        handleJoinEvent();
    }, []) 
    
    const onRequestOrder =  async() =>{
        const formData = {
            eventId: params.eventId,
            eventFoodIds: orders.map((order: any) => order._id)
        }
        const orderRes = await eventFoodRegisServiceService.createEventFoodRegis(formData)
        if(orderRes?.data) {
            toast.success('You have successfully requested orders', { position: "top-center" }) 
        }
    }

    if (registrationInfo)
        return (<div>
            <div className="m-w-[1200px] mx-auto  mt-5 px-5 ">
                <div className="flex flex-col justify-center items-center ">
                    <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center">
                        <CheckIcon sx={{ color: 'white', fontSize: 50 }} />
                    </div>
                    <h1 className="text-2xl font-bold mt-2 text-slate-500">Thank you</h1>
                    <h1 className="text-2xl font-500 text-slate-500">You have successfully registered to participate in the event</h1>
                    <p className="text-slate-500 italic mt-2"><WatchLaterIcon sx={{ fontSize: 20, color: "gray" , marginTop: "-4px" }} /> Joined at: {dayjs(registrationInfo?.createdAt).format('YYYY-MM-DD,  hh:mm')} </p>
                </div>
                <div className="border-b-2 my-10 relative">
                    <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] p-5 bg-white "><VerifiedIcon sx={{ fontSize: 30, color: "green" }} /></div>
                </div>
            </div>

            <div className="w-100  px-5">
                <div className="mt-10">
                    <p className="text-slate-500 text-lg font-bold ">The following selection of dishes will be served at our event:</p>
                </div>
                <div className="flex gap-10 mb-56 items-start justify-between w-100">
                    <FoodMenu eventId={params?.eventId} setOrders={setOrders} orders={orders} />
                    <div className={`w-[500px]   shadow-xl rounded-xl p-5 py-10`}>
                        <p className="text-slate-500 font-bold">Your ordered here:</p>
                        <div className="border-t-2 my-2 "></div>
                        {
                            orders?.map((order: any, index: number) => {
                                return (
                                    <div className="flex justify-between  font-500 px-2 mt-1 " key={index}>
                                        <span className="text-slate-500 font-bold text-sm mt-1 w-52 text-nowrap overflow-hidden">{order?.name}</span>
                                        <span className="text-slate-500  ">${order?.price}</span>
                                    </div>
                                )
                            }) 
                        } 
                        {
                             orders?.length === 0 && <p className="text-slate-500">No orders</p>
                        }
                        <div className="border-t-2 my-2"></div>
                        <div>
                            <p className="text-slate-500   text-end mb-2 text-lg flex justify-between">Total: <span className="font-bold">${orders?.reduce((a: any, b: any) => a + Number(b.price), 0)}</span></p>
                            <Button variant="contained" color="success" disabled={loadingBtn} fullWidth onClick={onRequestOrder}>Update</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}