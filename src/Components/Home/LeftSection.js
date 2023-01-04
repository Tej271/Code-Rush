import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/71619-coding";
import { IoPersonCircleOutline, IoAddCircleOutline } from "react-icons/io5";

const defaultOptions = {
  // loop: true,
  // autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LeftSection = () => {
  return (
    <div className="flex flex-row justify-between items-center bg-red-400 text-center w-[100%]">
      {/* <Lottie options={defaultOptions} height={500} width={500} style={{}} /> */}
      <h2 className="p-3 text-4xl font-semibold text-left">
        Code<span className="text-gray-600">Rush</span>
      </h2>
      <IoPersonCircleOutline className="w-[48px] h-[48px] m-5 text-blue-600" />
      {/* <h3 className="text-xl ">Code, Compile, Debug</h3> */}
    </div>
  );
};

export default LeftSection;
