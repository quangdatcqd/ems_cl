import { LinearProgress, TextField } from "@mui/material";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import React from "react";
import { useDebouncedCallback } from 'use-debounce';
import eventParticipantService from '../../services/client/eventParticipant.service';
import { useParams } from 'react-router-dom';
export default function InputUserDropdown({ selectUser }: any) {
    const [resultList, setResultList] = React.useState([]);
    const [isPending, setIsPending] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState("block");
    const params = useParams();
    const inputRef = React.useRef<any>(null);
    const dropdownRef = React.useRef<any>(null);
    const fetchData = useDebouncedCallback(async (e) => {
        if (params?.eventId  ) {
            setIsPending(true)
            const userData = await eventParticipantService.findUserParticipant(params?.eventId, e?.target?.value || "all");
            setResultList(userData.data);
            setIsPending(false)
        } else {
            setResultList([])
        }
    }, 200)



    React.useEffect(() => {
        fetchData("all");
        const handleClickOutside = (event: any) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen("hidden");
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div >
            <TextField ref={inputRef} label={"Type Name, Ticket or Seat"} onChange={fetchData} onFocus={() => setIsDropdownOpen("block")} sx={{ backgroundColor: 'white', borderRadius: '10px' }} fullWidth variant="filled" color="success" />
            <div ref={dropdownRef} className={`${isDropdownOpen} bg-[#f0f0f0] w-full mt-1 p-1 rounded-md overflow-y-scroll max-h-[calc(100vh-220px)] custom-scroll`} >
                {isPending && <LinearProgress />}
                {
                    resultList?.length > 0 ? resultList.map((item: any, index) => (
                        <div className='p-2 ' key={index} onClick={(e) => {
                            e.preventDefault();
                            selectUser(item)
                        }}>
                            <div className='hover:bg-[#00000010] cursor-pointer p-3 rounded-md'>
                                <p className='font-[500]'> <ContactEmergencyIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} />{item.userName}</p>
                                <p className='font-[500] text-sm text-slate-700 mt-1 flex justify-between'>
                                    <span><ConfirmationNumberIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "5px" }} /> {item.code} </span>
                                    <span> <ChairAltIcon sx={{ fontSize: 18, color: "gray", marginTop: "-5px", marginRight: "2px", marginLeft: "5px" }} /> {item.seat}</span>
                                </p>
                            </div>
                        </div>
                    )) :
                        <div className='text-center p-2 font-bold text-slate-500'>No data</div>
                }

            </div>
        </div>
    )
} 