import React, { useState, useEffect } from "react";
import "./test.css";
import { Button } from "@mui/material";
import { paths } from "../../paths";

export default function Carousel(props: any) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [randomizedCount, setRandomizedCount] = useState(0);

  useEffect(() => {
    let randomInterval: any;

    if (isRandomizing) {
      randomInterval = setInterval(() => {
        setActiveSlide(Math.floor(Math.random() * props.data.length));
        setRandomizedCount((prevCount) => prevCount + 1);

        if (randomizedCount >= 9) {
          clearInterval(randomInterval);
          setIsRandomizing(false);
          setRandomizedCount(0);
        }
      }, 200);
    }

    return () => clearInterval(randomInterval);
  }, [isRandomizing, randomizedCount, props.data.length]);

  const randomCard = () => {
    setIsRandomizing(true);
    setRandomizedCount(0);
  };


  const getStyles = (index: number) => {
    const distance = index - activeSlide;
    if (distance === 0)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (distance === 1 || distance === -props.data.length + 1)
      return {
        opacity: 0.7, 
        transform: "translateX(400px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (distance === -1 || distance === props.data.length - 1)
      return {
        opacity: 0.7,
        transform: "translateX(-400px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (distance === 2 || distance === -props.data.length + 2)
      return {
        opacity: 0.7,
        transform: "translateX(800px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (distance === -2 || distance === props.data.length - 2)
      return {
        opacity: 0.7,
        transform: "translateX(-800px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (distance > 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
    else if (distance < -2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
  };

  return (
    <>
      <div className="slideC ">
        {props.data.map((item: any, i: number) => (
          <React.Fragment key={item._id}>
            <div
              className="slide"
              style={{
                background: item.bgColor,
                boxShadow: `0 5px 20px ${item.bgColor}30`,
                ...getStyles(i),
              }}
            >
              <SliderContent item= {item} />
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

const SliderContent = ({item}: any) => { 
  return (
    <div className="sliderContent">
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



