import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOffIcon from '@mui/icons-material/EditOff';


interface TypeProps {
    item: {
        name: string
        image: string
        price: number
    }
}

export default function FoodItem({ item }: TypeProps) {
    return (
        <div className="group  overflow-hidden shadow-lg rounded-xl cursor-pointer relative user-select-none ">
            <div className="flex flex-col  gap-1 absolute top-1 right-1  hidden  group-hover:flex     ">
                
                <div className="rounded-full px-2 pt-1 pb-2  shadow-xl bg-white hover:bg-[#d2d2d2] "><EditOffIcon sx={{ fontSize: 22 }} color="primary" /></div>
                <div className="rounded-full px-2 pt-1 pb-2  shadow-xl bg-white hover:bg-[#d2d2d2] "><DeleteOutlineIcon sx={{ fontSize: 22 }} color="error" /></div>
            </div>
            <img
                className="object-cover h-[120px] w-full"
                src={item.image}
                title="green iguana"
            />
            <div className="p-3  pb-5">
                <p className="font-[500] text-slate-500">{item.name}</p>
                <p className="font-[500] text-green-700">${item.price}.00</p>
            </div>
            {/* <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Remove</Button>
        </CardActions> */}
        </div>
    )
}