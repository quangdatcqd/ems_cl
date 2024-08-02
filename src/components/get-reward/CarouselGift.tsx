import React, { useState, useEffect } from "react";
import "./test.css";
import { Button } from "@mui/material";
import { paths } from "../../paths";
import rewardService from "../../services/admin/rewardService.service";
import { useParams } from "react-router-dom";
import SadImage from './images/4419047.jpg'

export default function CarouselGift() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [count, setCount] = useState(0);
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
  const reduceRewardQty = async (index: number) => {
    const giftId = rewardItems[index]._id;
    await rewardService.reduceRewardQty(giftId);
    fetchReward();
  }

  React.useEffect(() => {
    fetchReward();
  }, [])
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
          const randomGiftIndex = Math.floor(Math.random() * rewardItems.length);
          setActiveSlide(randomGiftIndex);
          reduceRewardQty(randomGiftIndex);
          clearInterval(randomInterval);
          setIsRandomizing(false);
          setCount(0);
        }
      }, 200);
    }
    return () => clearInterval(randomInterval);
  }, [isRandomizing, count, rewardItems.length]);

  const randomCard = () => {
    setIsRandomizing(true);
    setCount(0);
  };


  const getStyles = (index: number) => {
    const distance = index - activeSlide;
    if (distance === 0)
      return {
        opacity: 1,
        transform: "translateX(-50%) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
        left: "50%",
      };
    else if (distance === 1 || distance === -rewardItems.length + 1)
      return {
        opacity: 0.7,
        transform: "translateX(calc(50% + 30px )) translateZ(-200px) rotateY(25deg)",
        zIndex: 9,
        left: "50%",
      };
    else if (distance === -1 || distance === rewardItems.length - 1)
      return {
        opacity: 0.7,
        transform: "translateX(calc(-50% - 360px )) translateZ(-200px) rotateY(-25deg)",
        zIndex: 9,
        left: "50%",
      };
    else if (distance === 2 || distance === -rewardItems.length + 2)
      return {
        opacity: 0.6,
        transform: "translateX(calc(50% + 390px)) translateZ(-550px) rotateY(40deg)",
        zIndex: 8,
        left: "50%",
      };
    else if (distance === -2 || distance === rewardItems.length - 2)
      return {
        opacity: 0.6,
        transform: "translateX(calc(-50% - 720px)) translateZ(-550px) rotateY(-40deg)",
        zIndex: 8,
        left: "50%",
      };
    else if (distance > 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
        left: "50%",
      };
    else if (distance < -2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
        left: "50%",
      };
  };

  return (
    <>
      {
        rewardItems?.length > 0 ? (<>
          <div className="slideC w-full overflow-hidden h-[400px]  ">
            {rewardItems.map((item: any, i: number) => (
              <React.Fragment key={item._id}>
                <div
                  className="slide w-[330px] h-[400px]"
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
        </>) : (
          <div className="mt-10 flex flex-col items-center gap-10 justify-center w-full   text-yellow-200 font-bold text-4xl">
            The reward is out of stock!
            <img src={SadImage} className="w-[500px] rounded-full" alt="" />
          </div>
        )
      }

    </>
  );
}

const SliderContent = ({ item }: any) => {
  return (
    <div className="w-full">
      <div className="bg-white hover:bg-slate-100 rounded-2xl pb-2 w-[330px] cursor-pointer shadow-2xl" >
        <img src={paths.imagePath + item.imageId} className="rounded-2xl object-cover w-full h-[250px]" draggable="false" alt="" />
        <div className="p-3 ">
          <p className="font-bold text-slate-600 text-md  mt-0 uppercase">{item.name}</p>
          <p className="font-bold text-slate-500 text-2xl  mt-2">${item.price}</p>
        </div>
      </div>
    </div>
  );
};



