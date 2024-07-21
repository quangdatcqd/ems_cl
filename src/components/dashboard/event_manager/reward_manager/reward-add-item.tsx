import { Button } from "@mui/material";
import DefaultImage from "../../../../assets/default.webp";
import toast from "react-hot-toast";
import rewardService from "../../../../services/admin/rewardService.service";
import { z as zod } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = zod.object({
    image: zod.any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    name: zod.string().min(1, { message: 'Name is required' }),
    price: zod.string().min(1, { message: 'Price is required' }),
    quantity: zod.number(),
    description: zod.string().min(1, { message: 'Description required' }),
})
type Values = zod.infer<typeof schema>;

const defaultValues = {
    image: null,
    name: "",
    price: "2.1",
    quantity: 1,
    description: ""
} satisfies Values;
export function RewardAddItem({ eventId, reloadData,onCancelAdd }: any) {
    const {   handleSubmit, setError, formState: { errors }, setValue } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

    const [image, setImage] = useState<any>(null)
    const [isPending, setIsPending] = useState<boolean>(false) 

    const onSubmit = React.useCallback(async (values: Values, _: any): Promise<void> => {
        setIsPending(true);
        const createdData = await rewardService.createReward({ ...values, eventId: eventId });
        if (createdData.data) {
            toast.success("Created successfully!");
            reloadData();
        } else {
            toast.error("Created failed!");
        }
        setIsPending(false);
    },
        [setError]
    );

    return (
        <div className="group  overflow-hidden shadow-lg rounded-xl cursor-pointer relative user-select-none   ">
            <div className=" h-[120px] relative group ">
                <img
                    className="object-cover h-[120px] w-full"
                    src={image ? URL.createObjectURL(image) : DefaultImage}
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
                    <input type="text" required onChange={e => setValue("name", e.target.value)} placeholder="Name" className="border-b-2 outline-none focus:border-blue-400 mb-2" />
                    <input type="number" step={0.01} required onChange={e => setValue("price", e.target.value)} placeholder="Price" className="border-b-2 outline-none focus:border-blue-400 mb-3 " />
                    <input type="number" step={1} required onChange={e => setValue("quantity", Number(e.target.value))} placeholder="Quantity" className="border-b-2 outline-none focus:border-blue-400 mb-3 " />
                    <input type="text" required onChange={e => setValue("description", e.target.value)} placeholder="Description" className="border-b-2 outline-none focus:border-blue-400 mb-2" />
                    
                    <div className="flex justify-between gap-2">
                        <Button size="small" variant="contained" fullWidth disabled={isPending} color="success" type="submit">Create</Button>
                        <Button size="small" variant="outlined"   color="error" onClick={() => onCancelAdd()}>Cancel</Button>
                    </div>
                </div>

            </form>
        </div>
    )
}