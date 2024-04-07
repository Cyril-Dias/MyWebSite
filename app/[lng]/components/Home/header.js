"use client";

import "../../globals.css";
import Image from "next/image";
import profilPicture from "../../../../public/profilPicture.png";

export default function FirstLine() {
  return (
    <>
      <div className="grid grid-cols-3 w-[150vw] h-full">
        <div className="flex">
          <p>Test</p>
        </div>
        <div className=" col-span-2 slideFromRight flex justify-items-center bg-white rounded-l-full overflow-hidden">
        <Image
          src={profilPicture}
          alt="Profil Picture"
          width={500}
          height={500}
        />
        </div>
      </div>
    </>
  );
}
