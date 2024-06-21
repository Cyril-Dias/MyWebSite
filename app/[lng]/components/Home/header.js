"use client";

import "../../globals.css";
import Image from "next/image";
import profilPicture from "../../../../public/profilPicture.jpg";

export default function FirstLine({ name, job, text, textLg, cv, contact }) {
  return (
    <>
      {/* main component container */}
      <div className="relative flex w-[100vw] md:w-[80%] lg:w-[75%] xl:w-[60%] max-h-[40vh] md:max-h-[40vh] md:rounded-2xl md:bg-slate-200/20 md:hover:bg-slate-100/90 md:hover:text-slate-700 md:ease-in-out md:duration-500 h-full overflow-hidden">
      {/* Small screen display */}
      <div className="w-full max-h-full flex flex-col md:hidden mt-0 ml-4 mr-2 md:m-8">
          <p className="w-full text-[1.75rem] mb-4">{name}</p>
          <p
            className="w-full text-[1.125rem] mb-2 fadeIn"
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
          <p className="text-base md:text-xl fadeIn">{job}</p>
          <div className="flex lg:hidden justify-start items-center self-end gap-4 w-full slideFromBottom">
            <a
              className="hover:underline hover:scale-110 transition ease-in-out"
              href="https://1drv.ms/b/s!AoYvc5okKxZ-hbtvckt37yq12wg38g?e=JzY1jk"
              target="_blank"
              rel="noreferrer noopener"
              download="Cyril Dias Curriculum Vitae"
            >
              {cv}
            </a>
            <span> / </span>
            <a
              className="hover:underline hover:scale-110 transition ease-in-out"
              href="mailto:cyril.dias-senden@hotmail.fr"
              target="_blank"
              rel="noreferrer noopener"
            >
              {contact}
            </a>
          </div>
        </div>
      {/* Larger Screen display */}
      <div className="w-full h-max hidden md:flex flex-col m-8">
          <p className="w-full md:text-3xl lg:text-6xl mb-4">{name}</p>
      {/* Md text display */}
      <p
            className="w-full text-[1.5rem] lg:hidden mb-2"
            dangerouslySetInnerHTML={{ __html: text }}
          ></p>
      {/* Lg text display */}
      <p className="w-max text-[1.5rem] hidden lg:flex mb-2">{textLg}</p>
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
