"use client";

import "../../globals.css";
import Image from "next/image";
import profilPicture from "../../../../public/profilPicture.webp";
import { useState } from "react";

export default function FirstLine({ name, job, job2, frontend, frontendDescription, backend, backendDescritpion, text, textLg, cv, contact }) {
  const [infoActive, setInfoActive] = useState(false);
  const [hoverActive, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  return (
    <>
      {/* main component container */}
      <div className="flex justify-center">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col h-[100%] w-[100vw] pb-20 md:w-[80%] xl:w-[65%] md:rounded-2xl md:bg-slate-200/20 md:hover:bg-slate-100/90 md:hover:text-slate-700 md:ease-in-out md:duration-500 overflow-hidden">
          {/* Flex-row container for the first flex-col items: text & image */}
          <div className="flex flex-row relative">
            {/* Small screen display */}
            <div className="flex flex-col md:hidden mt-6 ml-4 mr-2 md:m-8 fadeIn">
              <p className="w-full text-[1.75rem] mb-4">{name}</p>
              <p
                className="w-full text-[1.125rem] mb-4"
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
              <p className="h-full text-base md:text-md">
                {job}
                <span className="uppercase font-medium">{frontend}</span>
                <span>{frontendDescription}</span> &
                <span className="uppercase font-medium">{backend}</span>
                <span>{backendDescritpion}</span>
                {job2}
              </p>
            </div>
            {/* Larger Screen text display */}
            <div className="w-full h-max hidden md:flex flex-col m-8 fadeIn">
              <p className="w-full md:text-3xl lg:text-6xl mb-4 lg:mb-8">{name}</p>
              {/* Md text display */}
              <p
                className="w-full text-[1.5rem] lg:hidden mb-2"
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
              {/* Lg text display */}
              <p className="w-full text-[1.5rem] hidden lg:flex mb-6">{textLg}</p>
              <p className="w-full text-base md:text-xl fadeIn">
                {job}
                <span>{frontend}</span>
                <span>{frontendDescription}</span> &
                <span>{backend}</span>
                <span>{backendDescritpion}</span>
                {job2}
              </p>
            </div>
            {/* Image container */}
            <div className="hidden lg:flex absolute -top-2 -right-2 slideFromRight w-max h-[100%] rounded-l-full shadow-xl">
              <Image
                className="h-full object-cover"
                src={profilPicture}
                alt="Profil Picture"
                width={300}
                height={300}
              />
            </div>
          </div>
          {/* Second row for the Links display */}
          <div className="absolute bottom-0 flex justify-evenly items-center mb-6 md:m-4  w-full slideFromBottom md:text-lg lg:text-xl">
            {hoverActive ? (
              <a
                className="btn-primary-active"
                href="https://1drv.ms/b/s!AoYvc5okKxZ-hbtvckt37yq12wg38g?e=JzY1jk"
                target="_blank"
                rel="noreferrer noopener"
                download="Cyril Dias Curriculum Vitae"
              >
                {cv}
              </a>) : (
              <a
                className="btn-primary"
                href="https://1drv.ms/b/s!AoYvc5okKxZ-hbtvckt37yq12wg38g?e=JzY1jk"
                target="_blank"
                rel="noreferrer noopener"
                download="Cyril Dias Curriculum Vitae"
              >
                {cv}
              </a>
            )}
            {hoverActive ? (
              <a
                className="btn-primary-active"
                href="mailto:cyril.dias-senden@hotmail.fr"
                target="_blank"
                rel="noreferrer noopener"
              >
                {contact}
              </a>) : (
              <a
                className="btn-primary"
                href="mailto:cyril.dias-senden@hotmail.fr"
                target="_blank"
                rel="noreferrer noopener"
              >
                {contact}
              </a>
            )}
          </div>
          {/* Bottom container's border for small screen only*/}
          <span className="absolute bottom-0 justify-center w-full border-b border-white/65 borderScale md:hidden"></span>
        </div>
      </div>
    </>
  );
}
