import { Button } from "@mui/material";
import React from "react";
import { FoodDataType } from "../../../../types/food";
import { paths } from "../../../../paths";
import toast from "react-hot-toast";


interface TypeProps {
    item: FoodDataType
    onCancelEdit: Function
    onUpdateItem: Function
}


export function FoodEditItem({ item, onCancelEdit, onUpdateItem }: TypeProps) {
    const [form, setForm] = React.useState(item);


    const onChange = (value: any, type: string) => {
      
        if (type === "name") { 
            setForm({ ...form, name: value })
        }
        if (type === "price") { 
            setForm({ ...form, price:  value  })
        }

    }
    const onChangeImage = (e: any) => {
        setForm({ ...form, image: e.target.files[0] })
    }
    React.useEffect(() => {
        setForm(item)
    }, [item])


    const onSubmit = async () => {
        let error = "";
        if(form.name.trim().length === 0){ 
            error = "'Name' ";
        }
        if(form.price.toString().trim().length === 0){
            error += "'Price'";
        }   
        if(error){
            toast.error(error + " is required");
            return;
        }
        onUpdateItem(form)
    }

    return (
        <div className="group  overflow-hidden shadow-lg rounded-xl cursor-pointer relative user-select-none   ">
            {/* <div className="flex flex-col  gap-1 absolute top-1 right-1  hidden  group-hover:flex     ">
                <div className="rounded-full px-2 pt-1 pb-2  shadow-xl bg-white hover:bg-[#d2d2d2] "><EditOffIcon sx={{ fontSize: 22 }} color="primary" /></div>
                <div className="rounded-full px-2 pt-1 pb-2  shadow-xl bg-white hover:bg-[#d2d2d2] "><DeleteOutlineIcon sx={{ fontSize: 22 }} color="error" /></div>
            </div> */}
            <div className=" h-[120px] relative group ">
                <img
                    className="object-cover h-[120px] w-full"
                    src={form.image ? URL.createObjectURL(form.image) : paths.imagePath + form.imageId}
                    title="green iguana"
                />
                <div className="absolute w-[100%] h-[120px]  top-0 left-0 text-center flex items-center justify-center py-1 px-4 bg-[#00000029] rounded-lg hidden group-hover:flex">
                    <label htmlFor="image" className="bg-slate-500 text-white rounded-xl px-4 pt-1 py-1 hover:bg-slate-600 shadow-xl ">Change</label>
                    <input id="image" className="absolute opacity-0" type="file" accept="image/*" onChange={onChangeImage} />
                </div>

            </div>

            <div className="p-3  pb-5 flex flex-col">
                <input type="text" onChange={e => onChange(e.target.value, "name")} placeholder="Food Name" value={form.name} className="border-b-2 outline-none focus:border-blue-400 mb-2" />
                <input type="number" onChange={e => onChange(e.target.value, "price")} placeholder="Food Price" value={form.price} className="border-b-2 outline-none focus:border-blue-400 mb-3 " />
                <div className="flex justify-start gap-2">
                    <Button size="small" variant="contained" color="success" onClick={onSubmit}>Update</Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => onCancelEdit()}>Close</Button>
                </div>
            </div>
            {/* <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Remove</Button>
        </CardActions> */}
        </div>
    )
}