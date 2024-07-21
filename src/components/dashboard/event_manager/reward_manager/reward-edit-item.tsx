import { Button } from "@mui/material"; 
import { z as zod } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { RewardDataType } from "../../../../interface/reward";
import { paths } from "../../../../paths";
 

const schema = zod.object({
    _id: zod.string(),
    imageId: zod.any(),
    image: zod.any() ,
    name: zod.string().min(1, { message: 'Name is required' }),
    price: zod.string().min(1, { message: 'Price is required' }),
    quantity: zod.number(),
    description: zod.string().min(1, { message: 'Description required' }),
})
type Values = zod.infer<typeof schema>;





interface TypeProps {
    item: RewardDataType
    onCancelEdit: Function
    onUpdateItem: Function
}
export function RewardEditItem({ item, onCancelEdit, onUpdateItem }: TypeProps) {

    const defaultValues = {
        _id: item._id,
        imageId: item.imageId,
        image: null,
        name: item.name,
        price: item.price.toString(),
        quantity: item.quantity,
        description: item.description
    } satisfies Values;
    const { handleSubmit, setError, formState: { errors }, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) }); 
    
    const [image, setImage] = useState<any>(null) 
    const onSubmit = React.useCallback(async (values: Values, _: any): Promise<void> => {

        onUpdateItem(values)
    }, [setError]);

    return (
        <div className="group  overflow-hidden shadow-lg rounded-xl cursor-pointer relative user-select-none   ">
            <div className=" h-[120px] relative group ">
                <img
                    className="object-cover h-[120px] w-full"
                    src={image ? URL.createObjectURL(image) : paths.imagePath + item.imageId}
                    title="green iguana"
                />
                <div className="absolute w-[100%] h-[120px]  top-0 left-0 text-center flex items-center justify-center py-1 px-4 bg-[#00000029] rounded-lg hidden group-hover:flex">
                    <label htmlFor="image" className="bg-slate-500 text-white rounded-xl px-4 pt-1 py-1 hover:bg-slate-600 shadow-xl ">Change</label>
                    <input id="image" accept="image/*" className="absolute opacity-0" type="file" onChange={(e) => {
                        setValue("image", e?.target?.files?.[0])
                        setImage(e?.target?.files?.[0])
                    }} />
                </div>

            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-3  pb-5 flex flex-col">
                    <input type="text" required onChange={e => setValue("name", e.target.value)} defaultValue={item.name} placeholder="Name" className="border-b-2 outline-none focus:border-blue-400 mb-2" />
                    <input type="number" step={0.01} required onChange={e => setValue("price", e.target.value)} defaultValue={item.price} placeholder="Price" className="border-b-2 outline-none focus:border-blue-400 mb-3 " />
                    <input type="number" step={1} required onChange={e => setValue("quantity", Number(e.target.value))} defaultValue={item.quantity} placeholder="Quantity" className="border-b-2 outline-none focus:border-blue-400 mb-3 " />
                    <input type="text" required onChange={e => setValue("description", e.target.value)} defaultValue={item.description} placeholder="Description" className="border-b-2 outline-none focus:border-blue-400 mb-2" />
                    <div className="flex justify-start gap-2">
                        <Button size="small" variant="contained" color="success" type="submit">Update</Button>
                        <Button size="small" variant="outlined" color="error" onClick={() => onCancelEdit()}>Close</Button>
                    </div>
                </div>

            </form>
        </div>
    )
}