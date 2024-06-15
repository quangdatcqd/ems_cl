import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate, useParams } from "react-router-dom";
import eventParticipantService from "../../services/client/eventParticipant.service";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import dayjs from "dayjs";
import FoodMenu from "../../components/dashboard/event_food_registration/FoodMenu";
import { paths } from "../../paths";
import { setRedirectUrl } from "../../helpers/common.helper";
import eventFoodRegisService from "../../services/admin/eventFoodRegisService.service";
import { FoodDataType } from "../../types/food";
import FoodItem from "../../components/dashboard/event_food_registration/food-item";
export default function EventRegistration() {
    const [registrationInfo, setRegistrationInfo] = React.useState<any>(null);
    const [orders, setOrders] = React.useState<any>([]);
    const params = useParams();
    const navigator = useNavigate()
    const handleJoinEvent = async () => {
        if (params.eventId) {
            const eventPartRs = await eventParticipantService.createEventParticipant({ eventId: params.eventId })
            if (eventPartRs?.data) {
                console.log(eventPartRs?.data);
                
                setRegistrationInfo(eventPartRs?.data)
            }
            else if (eventPartRs?.statusCode === 401) {
                setRedirectUrl(paths.WEB_URL + paths.website.joinEventPath + params.eventId)
                navigator("/auth/sign-in", { state: { from: paths.WEB_URL + paths.website.joinEventPath + params.eventId } })
            }
            else navigator(-1)
        }
    }



    const getEventFoodRegis = async () => {
        const eventFoodRes = await eventFoodRegisService.getEventFoodRegis(params.eventId)
        if (eventFoodRes?.data) {
            setOrders(eventFoodRes?.data)
        }
    }
    React.useEffect(() => {
        handleJoinEvent();
        getEventFoodRegis();
    }, [])

    if (registrationInfo)
        return (<div>
            <div className="m-w-[1200px] mx-auto  mt-5 px-5 ">
                <div className="flex flex-col justify-center items-center ">
                    <div className="bg-green-500 w-16 h-16 rounded-full flex justify-center items-center">
                        <CheckIcon sx={{ color: 'white', fontSize: 50 }} />
                    </div>
                    <h1 className="text-2xl font-bold mt-2 text-slate-500">Thank you</h1>
                    <h1 className="text-2xl font-500 text-slate-500">You have successfully registered to participate in the event</h1>
                    <p className="text-slate-500 italic mt-2"><WatchLaterIcon sx={{ fontSize: 20, color: "gray", marginTop: "-4px" }} /> Joined at: {dayjs(registrationInfo?.createdAt).format('YYYY-MM-DD,  hh:mm')} </p>
                </div>
                <div className="border-b-2 my-10 relative">
                    <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] p-5 bg-white "><VerifiedIcon sx={{ fontSize: 30, color: "green" }} /></div>
                </div>
            </div>

            <div className={`w-100  px-5  ${orders?.length > 0 && "hidden"}`}>
                <div className="mt-10">
                    <p className="text-slate-500 text-lg font-bold ">The following selection of dishes will be served at our event:</p>
                </div>
                <FoodMenu eventId={params.eventId} userId={null} />
            </div>
            <div className={`w-100  px-5  ${orders?.length <= 0 && "hidden"}`}>
                <div className="mt-10 mb-5">
                    <p className="text-slate-500 text-lg font-bold ">Your ordered dishes:</p>
                </div>
                <div className='grid xs:grid-cols-1 grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                    {
                        orders?.map((item: FoodDataType, index: number) => {
                            return <FoodItem key={index} item={item}  orders={orders} />
                        })
                    }
                </div>
            </div>

        </div>)
}
