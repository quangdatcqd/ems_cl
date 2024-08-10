import React from "react";
import { Button } from "@mui/material";
import "./reward.css";
import { paths } from "../../paths";
import rewardService from "../../services/admin/rewardService.service";
import { useParams } from "react-router-dom";
import eventParticipantService from "../../services/client/eventParticipant.service";

export default function CarouselGift({ rewardInfo }: any) {

  const params = useParams();
  const [rewardItems, setRewardItems] = React.useState<any>([]);

  const fetchReward = async () => {
    if (params.eventId) {
      const eventRewards = await rewardService.getAvailableReward(params?.eventId);
      if (eventRewards?.data) {
        setRewardItems(eventRewards.data)
      }
    }
  }

  const randomReward = async () => {
    if (params.eventId) {
      const eventRewards = await eventParticipantService.randomAllReward(params?.eventId);
      if (eventRewards?.data) {
        setRewardItems(eventRewards.data)
      }
    }
  }

  const getRewardRandom = async () => {
    if (params.eventId) {
      const eventRewards = await eventParticipantService.getUserReward(params?.eventId);
      if (eventRewards?.data) {
        setRewardItems(eventRewards.data)
      }
    }
  }

  React.useEffect(() => {
    fetchReward();
    getRewardRandom();

  }, [rewardInfo]) 


  return (<>
    <div className="flex justify-center mb-5 ">
      <Button
        variant="contained"
        size="large"
        sx={{ width: "330px" }}
        onClick={randomReward}

      > Get Reward </Button>
    </div>

    <div className="w-full   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-5  ">
      {rewardItems.map((item: any, i: number) => (
        <div key={i} className="bg-white hover:bg-slate-100 rounded-2xl pb-2 h-full   cursor-pointer shadow-2xl relative " >
          <div className={` ${item?.userName ? "block" : "hidden"} absolute  text-center  py-2 text-white bg-red-500 font-bold w-full text-xl rounded-t-2xl `}>
            {item?.userName} - {item?.seat}
          </div>
          <img src={paths.imagePath + item.imageId} className="rounded-2xl object-cover w-full h-[250px]" draggable="false" alt="" />
          <div className="p-3 ">
            <p className="font-bold text-slate-600 text-md  mt-0 uppercase">{item.name}</p>
            <p className="font-bold text-slate-500 text-2xl  mt-2">${item.price}</p>
            <p className={`font-bold text-red-800 text-xl  mt-2  ${item?.quantity ? "block" : "hidden"}`}>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>


  </>);
}




