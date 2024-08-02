import React, { useState, useEffect } from "react";
import "./test.css";
import { Button } from "@mui/material";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { useParams } from "react-router-dom";
import eventParticipantService from "../../services/client/eventParticipant.service";
export default function CarouselName() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [count, setCount] = useState(0);
  const params = useParams();
  const [rewardItems, setRewardItems] = React.useState([]);

  useEffect(() => {
    let randomInterval: any;
    if (isRandomizing) {
      randomInterval = setInterval(() => {
        let countF = count;
        if (count >= rewardItems.length * 2) {
          countF = 0;
        }
        setActiveSlide(countF);
        setCount(countF + 1);
        if (count >= rewardItems.length * 2) {
          setActiveSlide(Math.floor(Math.random() * rewardItems.length));
          clearInterval(randomInterval);
          setIsRandomizing(false);
          setCount(0);
        }
      }, 200);
    }
    return () => clearInterval(randomInterval);
  }, [isRandomizing, count, rewardItems.length]);
  console.log(activeSlide);
  const randomCard = () => {
    setIsRandomizing(true);
    setCount(0);
  };


  const fetchReward = async () => {
    if (params.eventId) {
      const eventRewards = await eventParticipantService.getUserParticipants(params.eventId)
      if (eventRewards?.data) {
        setRewardItems(eventRewards.data)
      }
    }
  }
  React.useEffect(() => {
    fetchReward();
  }, [])

  const getStyles = (index: number) => {
    const distance = index - activeSlide;
    if (distance === 0)
      return {
        opacity: 1,
        transform: "translateY(-50%) translateZ(0px) rotateX(0deg)",
        zIndex: 10,
        top: "50%"
      };
    else if (distance === 1 || distance === -rewardItems.length + 1)
      return {
        opacity: 0.7,
        transform: "translateY(calc(-50% + 120px)) translateZ(-100px) rotateX(-25deg)",
        zIndex: 9,
        top: "50%"
      };
    else if (distance === -1 || distance === rewardItems.length - 1)
      return {
        opacity: 0.7,
        transform: "translateY(calc(-50% - 120px)) translateZ(-100px) rotateX(25deg)",
        zIndex: 9,
        top: "50%"
      };
    else if (distance === 2 || distance === -rewardItems.length + 2)
      return {
        opacity: 0.6,
        transform: "translateY(calc(-50% + 235px)) translateZ(-290px) rotateX(-45deg)",
        zIndex: 8,
        top: "50%"
      };
    else if (distance === -2 || distance === rewardItems.length - 2)
      return {
        opacity: 0.6,
        transform: "translateY(calc(-50% - 235px)) translateZ(-290px) rotateX(45deg)",
        zIndex: 8,
        top: "50%"
      };
    else if (distance === 3 || distance === rewardItems.length + 3)
      return {
        opacity: 0.5,
        transform: "translateY(calc(-50% + 340px)) translateZ(-520px) rotateX(-55deg)",
        zIndex: 7,
        top: "50%"
      };
    else if (distance === -3 || distance === rewardItems.length - 3)
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

  return (
    <>
      <div className="slideC md:w-[600px] h-[500px] w-full  ">
        {rewardItems.map((item: any, i: number) => (
          <React.Fragment key={item._id}>
            <div
              className="slide md:w-[600px] w-full"
              style={{
                ...getStyles(i),
              }}
            >
              <SliderContent item={item} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          variant="contained"
          size="large"
          sx={{ width: "330px" }}
          onClick={randomCard}
          disabled={isRandomizing}
        >
          Get Reward
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



