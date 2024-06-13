"use client";

import "../../globals.css";
import Image from "next/image";
import profilPicture from "../../../../public/profilPicture.jpg";

export default function FirstLine({ title, name, job, text }) {
  return (
    <>
    {/* Header display switch according to screen size */}
      <div className="grid grid-cols-3 md:grid-cols-5 w-[100vw] md:w-[80%] md:rounded-2xl md:bg-slate-200/20 md:hover:bg-slate-100/90 md:hover:text-slate-700 md:ease-in-out md:duration-500 h-full overflow-hidden">
        {/* Header for medium and larger screen */}
        <div className="w-full h-full col-span-4 hidden md:flex md:flex-col m-8">
            <p className="text-6xl mb-4">{name}</p>
            <p className="text-3xl">{text}</p>
          <p className="text-xl">{job}</p>
        </div>
        {/* Header for small screen */}
        <div className="h-full col-span-2 md:hidden flex flex-col">
          <p className="w-full h-full flex justify-center uppercase">{title}</p>
          <p className="w-full h-full ml-8">{name}{text}</p>
          <p className="w-full h-full ml-8">{job}</p>
        </div>
        <div className="slideFromRight w-full rounded-l-full">
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
