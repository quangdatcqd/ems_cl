import React from "react";
import FoodItem from "./food-item";
import foodService from "../../../services/admin/foodService.service";
import { FoodDataType } from "../../../interface/food";
import { Button } from "@mui/material";
import eventFoodRegisService from "../../../services/admin/eventFoodRegisService.service";
import toast from "react-hot-toast";

export default function FoodMenu({ eventId, userId }: any) {
  const [foodData, setFoodData] = React.useState([]);
  const [loadingBtn, setLoadingBtn] = React.useState<boolean>(false);
  const [orders, setOrders] = React.useState<any>([]);
  const fetchFood = async () => {
    const foods = await foodService.getAllFood(eventId, userId);
    setFoodData(foods.data);

  }
  const getEventFoodRegis = async () => {
    const eventFoodRes = await eventFoodRegisService.getEventFoodRegis(eventId, userId)
    if (eventFoodRes?.data) {
      setOrders(eventFoodRes?.data)
    }
  }

  const onRequestOrder = async () => {
    setLoadingBtn(true)
    const formData = {
      eventId,
      userId,
      eventFoodIds: orders.map((order: any) => order._id)
    }
    const orderRes = await eventFoodRegisService.createEventFoodRegis(formData)
    if (orderRes?.data) {
      toast.success('You have successfully requested orders', { position: "top-center" })
    }
    setLoadingBtn(false)
  }

  React.useEffect(() => {
    fetchFood();
    getEventFoodRegis();
  }, [])

  
  return (
    <div className="flex gap-10 mb-56 items-start justify-between w-100">
      <div className=' mt-5 w-100 '>
        <div className='grid   grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {
            foodData?.map((item: FoodDataType, index: number) => {
              return <FoodItem key={index} item={item} setOrders={setOrders} orders={orders} />
            })
          }
        </div>
      </div>
      <div className={`min-w-[350px]   shadow-xl rounded-xl p-5 py-10`}>
        <p className="text-slate-500 font-bold">Your ordered here:</p>
        <div className="border-t-2 my-2 "></div>
        {
          orders?.map((order: any, index: number) => {
            return (
              <div className="flex justify-between  font-500 px-2 mt-1 " key={index}>
                <span className="text-slate-500 font-bold text-sm mt-1 w-52 text-nowrap overflow-hidden">{order?.name}</span>
                <span className="text-slate-500  ">${order?.price}</span>
              </div>
            )
          })
        }
        {
          orders?.length === 0 && <p className="text-slate-500">No orders</p>
        }
        <div className="border-t-2 my-2"></div>
        <div>
          <p className="text-slate-500   text-end mb-2 text-lg flex justify-between">Total: <span className="font-bold">${orders?.reduce((a: any, b: any) => a + Number(b.price), 0)}</span></p>
          <Button variant="contained" color="success" disabled={loadingBtn} fullWidth onClick={onRequestOrder}>Update</Button>
        </div>
      </div>
    </div>
  )
}


 