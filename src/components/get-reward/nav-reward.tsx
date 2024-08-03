import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import InputUserDropdown from './input-user-dropdown';
import InputGiftDropdown from './input-gift-dropdown';
function NavReward({ rewardInfo, setRewardInfo }: any) {
    const [openNav, setOpenNav] = React.useState({
        type: "fixed",
        navClass: "absolute",
        boxHoverClass: "hidden"
    });

    const onHover = () => {
        if (openNav.type === "flexible")
            setOpenNav({
                ...openNav,
                navClass: "absolute",
                boxHoverClass: "hidden"
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
        })
    }


    const selectType = (e: any) => {
        setRewardInfo({
            ...rewardInfo,
            type: e.target.value,
            inputLabel: e.target.value === "user" ? "Type Gift Name" : "Type Ticket, Name or Seat",
            userId: "",
            userName: "",
            giftId: "",
            giftName: ""
        })
    }

    const selectUser = (user: any) => {
        setRewardInfo({
            ...rewardInfo,
            userId: user._id,
            userName: user.userName
        })
        onCloseNav();
    }

    const selectGift = (data: any) => {
        setRewardInfo({
            ...rewardInfo,
            userId: "",
            userName: "", 
            giftId: data._id,
            giftName: data.name  
        })
        onCloseNav();
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
                {
                    rewardInfo.type === "gift" ? <InputUserDropdown selectUser={selectUser} /> : <InputGiftDropdown selectGift={selectGift} />
                }
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



