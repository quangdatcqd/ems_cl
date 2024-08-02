import GiftBoxAnimation from "../components/get-reward/GiftBoxAnimation";
import FooterGift from "../components/get-reward/images/footer-gifts.svg";

import NavReward from "../components/get-reward/NavReward";
function GetReward() {
    return (
        <div className="flex flex-col w-full h-screen pb-5 bg-[linear-gradient(102deg,#1de5e2,#b588f7)]">

            <NavReward />

            <div className="relative min-h-[500px] w-full">
                <GiftBoxAnimation />
            </div>
            {/* <img src={FooterGift} className="opacity-[0.8]" alt="" /> */}
        </div>
    );
}

export default GetReward;