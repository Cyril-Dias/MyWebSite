"use client";

import "../../globals.css";
import Image from "next/image";
import profilPicture from "../../../../public/profilPicture.jpg";

export default function FirstLine({ name, job, text, textLg }) {
  return (
    <>
      <div className="flex w-[90vw] lg:w-[80%] md:h-[40vh] rounded-2xl bg-slate-200/20 hover:bg-slate-100/90 hover:text-slate-700 ease-in-out duration-500 h-full overflow-hidden">
        <div className="w-full h-max flex flex-col m-8">
          <p className="w-full text-[1.75rem] md:text-6xl mb-4">{name}</p>
          <p
            className="text-[1.5rem] lg:hidden"
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
          <p className="w-max text-[1.5rem] hidden lg:flex">{textLg}</p>
          <p className="text-base md:text-xl">{job}</p>
        </div>
        {/* Image container */}
        <div className="slideFromRight w-max min-h-full rounded-l-full">
          <Image
            className="h-full object-cover"
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
