import { LinearProgress, TextField } from "@mui/material"; 
import React from "react";
import { useDebouncedCallback } from 'use-debounce';
import { useParams } from 'react-router-dom';
import rewardService from "../../services/admin/rewardService.service";
import { paths } from "../../paths";
export default function InputGiftDropdown({ selectGift }: any) {
    const [resultList, setResultList] = React.useState([]);
    const [isPending, setIsPending] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState("block");
    const params = useParams();
    const inputRef = React.useRef<any>(null);
    const dropdownRef = React.useRef<any>(null);

    const fetchData = useDebouncedCallback(async (e) => {
        if (params?.eventId  ) {
            setIsPending(true)
            const userData = await rewardService.getAvailableReward(params?.eventId, e?.target?.value || "all");
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
            <TextField ref={inputRef} label={"Type Gift Name"} onChange={fetchData} onFocus={() =>{
                 fetchData("all");
                setIsDropdownOpen("block")}} sx={{ backgroundColor: 'white', borderRadius: '10px' }} fullWidth variant="filled" color="success" />
            <div ref={dropdownRef} className={`${isDropdownOpen} bg-[#f0f0f0] w-full mt-1  p-1 rounded-md overflow-y-scroll max-h-[calc(100vh-220px)] custom-scroll`} >
                {isPending && <LinearProgress />}
                {
                    resultList?.length > 0 ? resultList.map((item: any, index) => (
                        <div className='' key={index} onClick={(e) => {
                            e.preventDefault();
                            selectGift(item)
                        }}>
                            <div className='hover:bg-[#00000010] cursor-pointer p-3 rounded-md grid gap-5 grid-cols-10 '>
                                <div className=" overflow-hidden col-span-3   h-[100px] "><img src={paths.imagePath + item.imageId} className="w-[100px] h-[100px] object-cover rounded-2xl" alt="" /></div>
                                <div className="col-span-7">
                                    <p className='font-[500] text-sm'>{item.name}</p>
                                    <p className='font-[500] text-sm text-slate-700 mt-1 flex justify-between'>
                                        <span> ${item.price} </span>
                                        <span> Qty: {item.quantity}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className='text-center p-2 font-bold text-slate-500'>No data</div>
                }

            </div>
        </div>
    )
} 