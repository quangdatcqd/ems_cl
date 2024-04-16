import Lottie from "lottie-react";

import LoadingPage from "../assets/animated/Loading.json";

const Loading = () => {
  return (
    <div className="h-screen">
      <Lottie
        animationData={LoadingPage}
        style={{ height: 200 }}
        loop
        autoplay
      />
    </div>
  );
};

export default Loading;
