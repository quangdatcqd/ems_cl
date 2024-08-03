import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup, TextField } from '@mui/material';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useDebouncedCallback } from 'use-debounce';
import eventParticipantService from '../../services/client/eventParticipant.service';
import { useParams } from 'react-router-dom';
function NavReward({rewardInfo,setRewardInfo}:any) {
    const [openNav, setOpenNav] = React.useState({
        type: "fixed",
        navClass: "absolute",
        boxHoverClass: "hidden",
        boxResultClass: "absolute"
    });
    const params = useParams();

    const [resultList, setResultList] = React.useState([]);
    const [isPending, setIsPending] = React.useState(false); 

    const onHover = () => {
        if (openNav.type === "flexible")
            setOpenNav({
                ...openNav,
                navClass: "absolute",
                boxHoverClass: "hidden",
                boxResultClass: "hidden"
            })
        else
            setOpenNav({
                ...openNav,
                navClass: "absolute",
                boxHoverClass: "hidden"
            })
    }
    const onCloseNav = () => {
        setOpenNav({
            type: "flexible",
            navClass: "hidden",
            boxHoverClass: "absolute",
            boxResultClass: "hidden"
        })
    }

    const onDropdown = () => { 
        setOpenNav({
            ...openNav,
            navClass: "absolute",
            boxResultClass: "block"
        })
    }

    const onCloseDropdown = () => {
        // setTimeout(() => {
            setOpenNav({
                ...openNav,
                boxResultClass: "hidden",
                navClass: "absolute",
                boxHoverClass: "hidden"
            })
        // }, 1000);
    }

    const fetchData = useDebouncedCallback(async (e) => {
        if (params?.eventId && e.target.value.trim().length > 0) {
            setIsPending(true)
            const userData = await eventParticipantService.findUserParticipant(params?.eventId, e.target.value);
            setResultList(userData.data);
            setIsPending(false)
        } else {
            setResultList([])
        }
    }, 200)

    const selectUser = (user: any) => {
        setRewardInfo({
            ...rewardInfo,
            userId: user._id,
            userName: user.userName
        })
        onCloseNav();
    } 

    const selectType = (e: any) => { 
        setRewardInfo({
            ...rewardInfo,
            type: e.target.value,
            inputLabel: e.target.value === "user" ? "Type Gift Name":"Type Ticket, Name or Seat",
            userId: "", 
        })
    }

    return (
        <div> 
            <div className={`left-1 top-1 bg-[#07070734] rounded-xl shadow-2xl w-[25rem] p-5   z-10 ${openNav.navClass}`}>
                <div className='color-white absolute -right-7 top-5 bg-[#0707072e] rounded-e-md py-3  pl-[5px] shadow-2xl cursor-pointer hover:bg-[#07070749] '
                    onClick={onCloseNav}>
                    <ArrowBackIosIcon sx={{ fontSize: 30, color: '#00d3cd', marginRight: '-7px' }} />
                </div>
                <div className='bg-white rounded-lg p-3 mb-2  select-none'>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gift giving style </FormLabel>
                        <RadioGroup
                            row
                            value={rewardInfo.type}
                            onChange={selectType}
                        >
                            <FormControlLabel value="gift" control={<Radio />} label="Random Gift" />
                            <FormControlLabel value="user" control={<Radio />} label="Random User" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='relative'> 
                    <TextField label={rewardInfo.inputLabel} onFocus={onDropdown} onBlur={onCloseDropdown} onChange={fetchData} sx={{ backgroundColor: 'white', borderRadius: '10px' }} fullWidth variant="filled" color="success" />
                    <div className={`${openNav.boxResultClass} bg-[#f0f0f0] w-full top-[3.7rem] p-1 rounded-md`}  onClick={onDropdown}>
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
            </div>
            <div className={`absolute left-0 top-0 h-[20rem] w-8   z-10 ${openNav.boxHoverClass}`} onMouseEnter={onHover}>
                <div className='color-white absolute left-0 top-2 bg-[#0707072e] rounded-e-md py-3  shadow-2xl   '
                    onClick={onHover}>
                    <ArrowForwardIosIcon sx={{ fontSize: 30, color: 'white' }} />
                </div>
            </div>
        </div >
    );
}

export default NavReward;



