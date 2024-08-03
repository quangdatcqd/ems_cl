import React from "react";
import CarouselGift from "../components/get-reward/carousel-gift";
import CarouselName from "../components/get-reward/carousel-name";
import FooterGift from "../components/get-reward/images/footer-gifts.svg";
import NavReward from "../components/get-reward/nav-reward"; 
function GetReward() {
    const [rewardInfo, setRewardInfo] = React.useState({ type: "gift", userId: "", eventId: "", userName: "", giftId: "", giftName: "", inputLabel: "Type Ticket, Name or Seat" });
    
    return (
        <div className="flex flex-col w-full min-h-screen pb-5 bg-[linear-gradient(102deg,#1de5e2,#b588f7)]">
            <div className='text-center text-4xl font-bold  pt-14 w-full   text-white'>
                {(rewardInfo.userName && rewardInfo.type === "gift") && "Gift for " + rewardInfo.userName}
                {(rewardInfo.giftName && rewardInfo.type === "user") && rewardInfo.giftName}

            </div>
            <NavReward setRewardInfo={setRewardInfo} rewardInfo={rewardInfo} />
            <div className="min-h-[500px] mt-20">
                {
                    (rewardInfo.type === "user" && rewardInfo.giftId) && <CarouselName rewardInfo={rewardInfo} />
                }
                {
                    (rewardInfo.type === "gift" && rewardInfo.userId) && <CarouselGift rewardInfo={rewardInfo}/>
                }

            </div>
            <img src={FooterGift} className=" " alt="" />
        </div>
    );
}

export default GetReward;