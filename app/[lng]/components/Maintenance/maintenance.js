"use client";
import { BsGear } from "react-icons/bs";

export default function Maintenance({ status, text }) {
  return (
    <>
      {/* Main container */}
      <div className="screen w-full flex-col items-center h-screen flex gap-16">
        <p className="text-lg">{status}</p>    
        <BsGear color={"#fff"} style={{ fontSize: 120 }} className="maintenanceAnimation"/>
        <p className="">{text}</p>    
      </div>
    </>
  );
}
