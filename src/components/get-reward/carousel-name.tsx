import React, { useState, useEffect } from "react";
import "./reward.css";
import { Button } from "@mui/material";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useParams } from "react-router-dom";
import eventParticipantService from "../../services/client/eventParticipant.service";
import rewardService from "../../services/admin/rewardService.service";
import toast from "react-hot-toast";
export default function CarouselName({ rewardInfo }: any) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isRandomizing, setIsRandomizing] = useState<any>(false);
  const [rewardRemaining, setRewardRemaining] = useState<any>(null);
  const [count, setCount] = useState(0);
  const params = useParams();
  const [userParticipants, setUserParticipants] = React.useState<any>([]);

  useEffect(() => {
    let randomInterval: any;
    if (isRandomizing) {
      randomInterval = setInterval(() => {
        let countF = count;
        if (count >= userParticipants.length * 2) {
          countF = 0;
        }
        setActiveSlide(countF);
        setCount(countF + 1);
        if (count >= userParticipants.length * 2) {
          const randomUserIndex = Math.floor(Math.random() * userParticipants.length);
          setActiveSlide(randomUserIndex);
          reduceRewardQty();
          updateUserHasReceivedReward(randomUserIndex) 
          clearInterval(randomInterval);
          setIsRandomizing(null);
          setCount(0); 
        }
      }, 200);
    }
    return () => clearInterval(randomInterval);
  }, [isRandomizing, count, userParticipants.length]);
  const randomCard = () => {
    if (!rewardInfo?.giftId) {
      toast.error("Please select user!");
      return;
    }
    setIsRandomizing(true);
    setCount(0);
  };

  const reduceRewardQty = async () => {
    const rewardUpdatedData = await rewardService.reduceRewardQty(rewardInfo.giftId);
    if (rewardUpdatedData?.quantity >= 0) {
      setRewardRemaining(rewardUpdatedData?.quantity);
    }
  }

  const updateUserHasReceivedReward = async (index: number) => {
    if (params.eventId) {
      const participantId = userParticipants[index]._id;
       await eventParticipantService.updateUserHasReceivedReward(participantId, rewardInfo.giftId); 
    }
  }

  const fetchUser = async () => {
    if (params.eventId) {
      const eventUsers = await eventParticipantService.getUserHasNotReceivedReward(params.eventId)
      if (eventUsers?.data) {
        setUserParticipants(eventUsers.data)
        toast.success("Reseted successfully!", { position: "top-center" })
      }
    }
    setIsRandomizing(false);
  }
  React.useEffect(() => {
    fetchUser();
  }, [])
console.log(rewardRemaining);

  return (
    <> {
      (rewardRemaining !== null) && <div className={"text-3xl mb-5 text-center font-bold text-orange-300  "}>
        Rewards Remaining: {rewardRemaining}
      </div>
    }
      <div className="slideC md:w-[600px] h-[500px] w-full  ">
        {userParticipants.map((item: any, i: number) => (
          <React.Fragment key={item._id}>
            <div
              className="slide md:w-[600px] w-full"
              style={{
                ...getStyles(i, activeSlide, userParticipants.length),
              }}
            >
              <SliderContent item={item} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <Button
          variant="contained"
          size="large"
          sx={{ width: "230px" }}
          onClick={randomCard}
          disabled={(rewardRemaining !== null && rewardRemaining <= 0 ) || isRandomizing === null}
        >
          Get Reward
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "100px" }}
          onClick={fetchUser} 
        >
          Reset
        </Button>
      </div>
    </>
  );
}

const SliderContent = ({ item }: any) => {
  return (
    <div className="  md:p-5 p-0">
      <div className="bg-white hover:bg-slate-100 rounded-2xl md:w-[600px] w-full cursor-pointer shadow-2xl" >
        <div className='hover:bg-[#00000010] cursor-pointer p-5 rounded-md'>
          <p className='font-bold text-slate-700 text-xl'> <ContactEmergencyIcon sx={{ fontSize: 28, color: "gray", marginTop: "-5px", marginRight: "10px" }} />{item.user.name}</p>
          <p className='font-bold   text-slate-700 text-xl flex justify-between mb-0'>
            <span><ConfirmationNumberIcon sx={{ fontSize: 28, color: "gray", marginTop: "-5px", marginRight: "5px" }} /> {item.code} </span>
            <span> <ChairAltIcon sx={{ fontSize: 28, color: "gray", marginTop: "-5px", marginRight: "2px", marginLeft: "5px" }} /> {item.seat}</span>
          </p>
        </div>
      </div>
    </div>
  );
};



function getStyles(index: number, activeSlide: number, itemCount: number) {
  const distance = index - activeSlide;
  if (distance === 0)
    return {
      opacity: 1,
      transform: "translateY(-50%) translateZ(0px) rotateX(0deg)",
      zIndex: 10,
      top: "50%"
    };
  else if (distance === 1 || distance === - itemCount + 1)
    return {
      opacity: 0.7,
      transform: "translateY(calc(-50% + 120px)) translateZ(-100px) rotateX(-25deg)",
      zIndex: 9,
      top: "50%"
    };
  else if (distance === -1 || distance === itemCount - 1)
    return {
      opacity: 0.7,
      transform: "translateY(calc(-50% - 120px)) translateZ(-100px) rotateX(25deg)",
      zIndex: 9,
      top: "50%"
    };
  else if (distance === 2 || distance === -itemCount + 2)
    return {
      opacity: 0.6,
      transform: "translateY(calc(-50% + 235px)) translateZ(-290px) rotateX(-45deg)",
      zIndex: 8,
      top: "50%"
    };
  else if (distance === -2 || distance === itemCount - 2)
    return {
      opacity: 0.6,
      transform: "translateY(calc(-50% - 235px)) translateZ(-290px) rotateX(45deg)",
      zIndex: 8,
      top: "50%"
    };
  else if (distance === 3 || distance === itemCount + 3)
    return {
      opacity: 0.5,
      transform: "translateY(calc(-50% + 340px)) translateZ(-520px) rotateX(-55deg)",
      zIndex: 7,
      top: "50%"
    };
  else if (distance === -3 || distance === itemCount - 3)
    return {
      opacity: 0.5,
      transform: "translateY(calc(-50% - 340px)) translateZ(-520px) rotateX(55deg)",
      zIndex: 7,
      top: "50%"
    };

  else if (distance > 3)
    return {
      opacity: 0,
      transform: "translateY(calc(-50% + 440px)) translateZ(-720px) rotateX(-65deg)",
      zIndex: 6,
      top: "50%"
    };
  else if (distance < -3)
    return {
      opacity: 0,
      transform: "translateY(calc(-50% - 440px)) translateZ(-720px) rotateX(65deg)",
      zIndex: 6,
      top: "50%"
    };
};