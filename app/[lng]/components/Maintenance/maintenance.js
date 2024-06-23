"use client";
import { GiFallingStar } from "react-icons/gi";

export default function Maintenance({ status }) {
  return (
    <>
      {/* Main container */}
      <div className="relative w-[100%] h-[100%] screen starTranslate">
        <p className="w-full">{status}</p>
        {/* containers for the falling stars animation */}
        <div className="absolute w-full top-[-3rem] left-[10rem]">
          <GiFallingStar color={"#fff"} style={{ fontSize: 26 }} />
        </div>
        <div className="absolute top-[10rem] left-[-5rem]">
          <GiFallingStar color={"#fff"} style={{ fontSize: 28 }} />
        </div>
        <div className="absolute top-[-3rem] left-[1rem]">
          <GiFallingStar color={"#fff"} style={{ fontSize: 30 }} />
        </div>       
      </div>
    </>
  );
}
