
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOffIcon from '@mui/icons-material/EditOff';
import DefaultImage from "../../../../assets/default.webp";
import React from 'react'; 
import { ConfirmPopover } from '../../../ConfirmPopover'; 
import { paths } from '../../../../paths';
import dayjs from 'dayjs';
import { RewardDataType } from '../../../../interface/reward';


interface TypeProps {
    item: RewardDataType,
    setDataEdit: any,
    onDeleteItem: Function
}

export default function RewardItem({ item, setDataEdit, onDeleteItem }: TypeProps) {


    return (
        <div>
            <div className="group  overflow-hidden shadow-lg rounded-xl cursor-pointer  relative user-select-none hover:-translate-y-1 transition-all ease-in-out duration-300 ">
                <Actions setDataEdit={setDataEdit} item={item} onDeleteItem={onDeleteItem} />
                <img
                    className="object-cover h-[120px] w-full group-hover:bg-[#adadad]"
                    src={item.imageId ?  paths.imagePath + item.imageId : DefaultImage}
                    title="green iguana"
                />
                <div className="p-3 pt-2 pb-4">
                    <p className="font-[500] text-slate-500">{item.name}</p>
                    <p className="font-[500] text-green-700 mt-1">Price: ${item.price}</p>
                    <p className="font-[500] text-green-700 mt-1">Quantity: {item.quantity}</p>
                    <div className=" text-sm mt-1 bg-slate-100 rounded-md p-1"> {item.description}</div>
                    <p className=" text-slate-500 mt-1 text-[12px] text-end italic">Created: {dayjs(item.createdAt).format('YYYY-MM-DD hh:mm')} </p>
                </div> 
            </div>
        </div>
    )
}


const Actions = ({ setDataEdit, item, onDeleteItem }: any) => {
    const [showDeleteBtn, setShowDeleteBtn] = React.useState(false)
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const onEdit = () => {
        setDataEdit({
            _id: item._id,
            name: item.name,
            imageId: item.imageId,
            price: item.price,
            description: item.description,
            quantity: item.quantity
        })
    }
    return (
        <div className="flex flex-col  items-end  gap-1 absolute top-1 right-1    group-hover:flex  hidden   ">
            <div className="rounded-full px-2 pt-1 pb-2  shadow-xl bg-white hover:bg-[#d2d2d2] " onClick={onEdit}><EditOffIcon sx={{ fontSize: 22 }} color="primary" /></div>
            <div className='relative'>
                <div className="rounded-full px-2 pt-1 pb-2  shadow-xl bg-white hover:bg-[#d2d2d2] "
                    ref={anchorRef}
                    onClick={() => setShowDeleteBtn(!showDeleteBtn)}>
                    <DeleteOutlineIcon sx={{ fontSize: 22 }} color="error" />
                </div>
                <ConfirmPopover message='Confirm!'
                    open={showDeleteBtn} setOpen={setShowDeleteBtn}
                    actionFunc={onDeleteItem}
                    anchorRef={anchorRef}
                /> 
            </div>
        </div>
    )
}