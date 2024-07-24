import * as React from "react";
import CheckIcon from '@mui/icons-material/Check';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate, useParams } from "react-router-dom";
import eventParticipantService from "../../services/client/eventParticipant.service";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import dayjs from "dayjs";
import FoodMenu from "../../components/dashboard/event_food_registration/FoodMenu";
import { paths } from "../../paths";
import { getDate, setRedirectUrl } from "../../helpers/common.helper";
import eventFoodRegisService from "../../services/admin/eventFoodRegisService.service";
import { FoodDataType } from "../../interface/food";
import FoodItem from "../../components/dashboard/event_food_registration/food-item";
import eventService from "../../services/admin/eventService.service";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {   FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { z as zod } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventDataType } from "../../interface/event";
import { DatePicker } from "rsuite";
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TransgenderIcon from '@mui/icons-material/Transgender';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";


export default function EventRegistration() {
    const [registrationInfo, setRegistrationInfo] = React.useState<any>(null);
    const [orders, setOrders] = React.useState<any>([]);
    const [eventData, setEventData] = React.useState<EventDataType | null>(null);
    const params = useParams();
    const navigator = useNavigate()
    const now = getDate();
    const registrationClosed = dayjs(now).isAfter(dayjs(eventData?.registrationDeadline), 'day')
    var allowedJoin = React.useMemo(() => {
        let temp = false
        // // if not registered
        if (!registrationInfo?.joined && eventData) {
            //if not full  
            if (eventData?.participant_count < eventData?.capacityLimit) temp = true
            // if allow waitlist
            else if (eventData?.allowWaitlist === true) temp = true
            // if registration is closed
            if (registrationClosed) temp = false
        }
        return temp
    }, [eventData, registrationInfo])

    const checkEventParticipant = async () => {
        if (params.eventId) {
            const eventPartRs = await eventParticipantService.checkEventParticipant(params.eventId)
            if (eventPartRs?.data) {
                setRegistrationInfo(eventPartRs?.data)
                return eventPartRs?.data
            }
            // else if (eventPartRs?.statusCode === 401) {
            //     setRedirectUrl(import.meta.env.VITE_WEB_URL + paths.website.joinEventPath + params.eventId)
            //     navigator(paths.client.auth.signIn)
            // }
        }
    }

    const getEventFoodRegis = async () => {
        const eventFoodRes = await eventFoodRegisService.getEventFoodRegis(params.eventId)
        if (eventFoodRes?.data) {
            setOrders(eventFoodRes?.data)
        }
    }

    const getEventInfo = async () => {
        const event = await eventService.getEventByID(params.eventId, true) // request from client true
        if (event?.data) {
            setEventData(event?.data)

        }
    }
    React.useEffect(() => {
        checkEventParticipant();
        getEventFoodRegis();
        getEventInfo()
    }, [])

    return (<div>
        <div className="m-w-[1200px] mx-auto  mt-5 px-5 ">
            <div className="mt-5 flex flex-col justify-center items-start md:max-w-[600px] m-auto  font-bold  ">
                <div className="flex w-full justify-center items-center">
                    <EmojiEventsIcon sx={{ color: 'orange', fontSize: 40, borderRadius: '50%', border: '3px solid orange' }} />
                </div>

                <p className="text-xl uppercase text-[orange] text-center w-[100%]">{eventData?.name}</p>
                <p className=" italic text-slate-500 text-sm">
                    <PeopleAltIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                    Event Scale:  <span className='text-green-500'>{eventData?.participant_count + "/" + eventData?.capacityLimit}</span>
                </p>
                <p className=" italic text-slate-500 text-sm">
                    <TransgenderIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                    Gender:  <span className='text-green-500'>{eventData?.allowGender}</span>
                </p>
                <p className={`${registrationInfo?.seat ? "block" : "hidden"} italic text-slate-500 text-sm`}>
                    <ChairAltIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                    Your seat:  <span className='text-green-500'>{registrationInfo?.seat}</span>
                </p>
                <p className=" italic text-slate-500 text-sm mt-1">
                    <TimelapseIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                    Registration:  {registrationClosed ? <span className='text-red-600'>Closed</span> : <span className='text-green-600'>Open</span>}
                </p>
                <p className=" italic text-slate-500 text-sm mt-1">
                    <WatchLaterIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />
                    Event Time: <span className="text-green-600">{dayjs(eventData?.startTime).format('YYYY-MM-DD')}  - {dayjs(eventData?.endTime).format('YYYY-MM-DD')}</span>
                </p>
                <p className="italic text-slate-500 text-sm mt-1">
                    <FmdGoodIcon sx={{ fontSize: 20, color: "gray", marginTop: "-4px", marginLeft: "-2px", marginRight: "4px" }} />
                    Location: <span className="text-green-600">{eventData?.location}</span>
                </p>
            </div>
            {registrationInfo?.joined &&
                <div className="text-center mt-5 ">
                    <div className="bg-green-500 w-10 h-10 rounded-full m-auto flex justify-center items-center">
                        <CheckIcon sx={{ color: 'white', fontSize: 35 }} />
                    </div>
                    <p className="text-md font-bold mt-0  ">Thank you</p>
                    <p className="text-sm   text-slate-500 mt-0 ">You have successfully registered to participate in the event</p>
                    <p className="text-sm  text-slate-500 mt-0 ">We sent a ticket, please check your email!</p>
                </div>
            }
            {
                allowedJoin && <FormRegistration eventData={eventData} checkEventParticipant={checkEventParticipant} seatsSelected={registrationInfo?.seatsSelected} />
            }
            <div className="border-b-2 my-10 relative">
                <div className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] p-5 bg-white "><VerifiedIcon sx={{ fontSize: 30, color: "green" }} /></div>
            </div>
        </div>

        <div className={`${(!eventData?.useFood || !registrationInfo?.joined) && "hidden"}`}>
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
                            return <FoodItem key={index} item={item} orders={orders} />
                        })
                    }
                </div>
            </div>
        </div>

    </div>)
}




function FormRegistration({ checkEventParticipant, eventData, seatsSelected }: { checkEventParticipant: any, eventData: EventDataType | null, seatsSelected: string[] }) {
    const [loadingButton, setLoadingButton] = React.useState(false)
    const navigator = useNavigate()
    const schema = zod.object({
        birthday: zod.string().min(1, { message: 'Gender is required' }),
        gender: zod.string().min(1, { message: 'Gender is required' }),
        seat: zod.string().min(1, { message: 'Seat is required' }),
        email: zod.string().email().min(1, { message: 'Email is required' }),
    })

    type Values = zod.infer<typeof schema>;

    const defaultValues = { birthday: "", gender: "Male", seat: "", email: "" } satisfies Values;
    const { handleSubmit, setError, formState: { errors }, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    const handleJoinEvent = React.useCallback(async (values: Values, _: any): Promise<void> => {
        setLoadingButton(true)
        if (!eventData?._id) return

        if (eventData.allowGender !== "All" && values.gender !== eventData.allowGender) {
            setError("birthday", { type: "manual", message: `Gender must be ${eventData.allowGender}` })
            return
        }
        const eventPartRs = await eventParticipantService.createEventParticipant({ eventId: eventData._id, ...values })
        setLoadingButton(false)
        if (eventPartRs?.data) {
            checkEventParticipant();
        } else if (eventPartRs?.statusCode === 401) {
            setRedirectUrl(import.meta.env.VITE_WEB_URL + paths.website.joinEventPath + eventData._id)
            navigator(paths.client.auth.signIn)
        } else {
            toast.error(eventPartRs?.message, { position: "top-right" });
        }
    },
        [setError, eventData]
    );
    return (<div>
        <div className="grid sm:grid-cols-2 gap-8 justify-start items-start mt-5 max-w-[800px] m-auto">
            <div>
                <SeatSlection setValue={setValue} seatsSelected={seatsSelected} />
                {errors.seat && <p className="text-red-500 text-sm mt-2">{errors.seat.message}</p>}
            </div>
            <form onSubmit={handleSubmit(handleJoinEvent)} >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth={true} error={Boolean(errors.birthday)} >
                            <label className='text-slate-500 text-sm mb-1'>Your birthday</label>
                            <DatePicker name='registrationDeadline'
                                defaultValue={new Date(defaultValues.birthday)}
                                size='lg'
                                onChange={(value: any) => setValue("birthday", value?.toISOString() || "")} />

                            {errors.birthday && <FormHelperText>{errors.birthday.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid xs={12} md={12} item={true}>
                        <FormControl fullWidth={true} error={Boolean(errors.gender)}>
                            <InputLabel id="demo-simple-select-helper-label">Chose your gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                sx={{ padding: 0, margin: 0 }}
                                fullWidth={true}
                                defaultValue="Male"
                                onChange={(e: SelectChangeEvent) => setValue("gender", e.target.value)}
                                label={"Chose your gender"}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                            {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                        </FormControl>

                    </Grid>
                    <Grid xs={12} md={12} item={true}>
                        <FormControl fullWidth={true} error={Boolean(errors.email)}>
                            {/* email to receive ticket */}
                            <TextField id="standard-basic"  onChange={(e: any) => setValue("email", e.target.value)} label="Email to receive ticket" variant="outlined" />
                            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>

                    </Grid>
                </Grid>
                <div className="mt-5">
                    <LoadingButton
                        loading={loadingButton}
                        loadingIndicator="Joining..."
                        variant="contained"
                        fullWidth
                        color="warning"
                        type="submit"
                    >
                        Join Now
                    </LoadingButton>

                </div>
                {
                    eventData && (eventData.participant_count >= eventData.capacityLimit) &&
                    <span className="text-red-500 text-sm ">The number of participants is sufficient, you will be considered for inclusion</span>
                }
            </form>
        </div>
    </div>)
}

const listSeats = [
    [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
        "A10",
        "A11",
        "A12",
        "A13",
        "A14",
        "A15",
        "A16",
        "A17",
        "A18",
        "A19",
        "A20",
        "A21",
        "A22",
        "A23",
        "A24",
        "A25"
    ],
    [
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "B11",
        "B12",
        "B13",
        "B14",
        "B15",
        "B16",
        "B17",
        "B18",
        "B19",
        "B20",
        "B21",
        "B22",
        "B23",
        "B24",
        "B25"
    ]
]
function SeatSlection({ setValue, seatsSelected }: { setValue: any, seatsSelected: string[] }) {
    const [selected, setSelected] = React.useState<string>("")
    const handleClick = (seat: string, disabled: string) => {
        if (disabled === "seat_unavailable") return
        setValue("seat", seat ? seat : "")
        setSelected(seat === selected ? "" : seat)
    }
    return (
        <div>
            <p className='text-slate-500 text-sm mb-1'>Chose your seat:</p>
            <div className="grid grid-cols-3 text-[12px]">
                <div className="flex items-center gap-1 mb-2">
                    <div className="w-[15px] h-[15px] border border-orange-400 rounded-sm"> </div> <span className="text-slate-400 font-bold">Available</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <div className="w-[15px] h-[15px] bg-slate-300 rounded-sm"></div> <span className="text-slate-400 font-bold">Unavailable</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <div className="w-[15px] h-[15px] bg-[orange] rounded-sm"></div> <span className="text-slate-400 font-bold">Your choice</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:gap-8">
                {listSeats.map((seats, index) => {
                    return (<div className="grid grid-cols-5 gap-2" key={index}>
                        {
                            seats.map((seat: string, index) => {
                                const active = selected === seat ? "seat_selected" : ""
                                const disabled = seatsSelected?.includes(seat) ? "seat_unavailable" : "seat_available"
                                return (
                                    <div key={index} onClick={() => handleClick(seat, disabled)}
                                        className={`${disabled} ${active}  border w-[30px]  h-[30px] rounded-md cursor-pointer    flex justify-center items-center font-bold text-[10px] text-slate-500`}>
                                        {seat}
                                    </div>
                                )
                            })
                        }
                    </div>)
                })}
            </div>
        </div>
    )
}