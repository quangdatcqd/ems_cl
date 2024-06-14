

import React from "react";
import DefaultImage from "../../../assets/default.webp";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { FoodDataType } from "../../../types/food";
import { paths } from "../../../paths";
interface TypeProps {
    item: FoodDataType
    setOrders: any
    orders: any
}

export default function FoodItem({ item ,setOrders,orders}: TypeProps) {
    const [isSelect, setIsSelect] = React.useState(false); 
    React.useEffect(()=>{setIsSelect(orders?.find((order:any)=>order._id===item._id))},[orders])
    const onSelectDish = ( ) => {  
            if(orders?.find((order:any)=>order._id===item._id)){  
                setOrders(orders.filter((order:any)=>order._id!==item._id)) 
            }
            else{
                setIsSelect(true) 
                setOrders([...orders,item]) 
            }
      
    }
    return (
        <div className=" relative " unselectable="on" onClick={onSelectDish}>
            <div className={`absolute -top-2 -right-2 z-50 bg-green-500  rounded-full ${isSelect ? "block" : "hidden"}`}>
                <DoneOutlinedIcon sx={{ color: "white" }} />
            </div>
            <div className={`${isSelect?"border-green-300":""} select-none group border rounded-xl  overflow-hidden shadow-lg  cursor-pointer  relative   hover:-translate-y-1 transition-all ease-in-out duration-300 `}>
                <img
                    className="object-cover select-none h-[120px] w-full group-hover:bg-[#adadad]"
                    src={item.imageId ? paths.imagePath + item.imageId : DefaultImage}
                    title="green iguana"
                />
                <div className="p-3 pt-2 pb-4">
                    <p className="font-bold text-slate-500 text-sm">{item.name}</p>
                    <p className="font-[500] text-green-700 mt-1 text-sm">${item.price}.00</p>
                </div>
            </div>
        </div>
    )
}
