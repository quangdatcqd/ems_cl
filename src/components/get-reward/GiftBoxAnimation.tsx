 
import React from "react";
import rewardService from "../../services/admin/rewardService.service";
import { useParams } from "react-router-dom";
import { paths } from "../../paths"; 
import Carousel from "./Carousel"; 

const GiftBoxAnimation = () => {
  const params = useParams();
  const [rewardData, setRewardData] = React.useState([]);
   
  const fetchReward = async () => {
    if (params.eventId) {
      const eventRewards = await rewardService.getAvailableReward(params?.eventId);
      if (eventRewards?.data) {
         
        setRewardData(eventRewards.data)
      }
    }
  }
  React.useEffect(() => {
    fetchReward();

  }, [])
  return (
    <div className=" w-full h-auto  mt-[10rem]">
     <Carousel data={rewardData} activeSlide={2} />
      
    </div>
  );
};

export default GiftBoxAnimation;




