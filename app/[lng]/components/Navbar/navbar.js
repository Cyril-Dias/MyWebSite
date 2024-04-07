"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "../../../i18n/client";
import { languages } from "../../../i18n/settings";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaFileCode, FaRegFileCode } from "react-icons/fa6";
import {
  IoChevronForward,
  IoChevronBack,
  IoPerson,
  IoPersonOutline,
  IoLocation,
  IoLocationOutline,
  IoGlobe,
  IoGlobeOutline,
} from "react-icons/io5";

export default function Navbar({ lng }) {
  const pathname = usePathname();
  const { t } = useTranslation(lng, "navbar");
  const [menuActive, setMenuActive] = useState(true);
  const [lngActive, setLngActive] = useState(false);
  const handleLngActive = (e) => {
    e.stopPropagation();
    setLngActive(!lngActive);
  };

  // Position of MouseGlow for large screen
  const [position, setPosition] = useState({
    x: -20,
    y: -20,
  });

  return (
    <>
      {/* Sm and Md screen Component */}
      <div className="fixed bottom-0 flex lg:hidden w-screen md:min-h-28 backdrop-blur bg-slate-900/75">
        <ul className="grid grid-cols-5 w-full justify-items-center items-center border-t border-slate-50/[0.06] p-6">
          <li>
            <Link href={`/${lng}/`}>
              {/* Conditional rendering Icons depending on the pathname  */}
              {pathname === `/${lng}` && !lngActive ? (
                <GoHomeFill color={"#fff"} style={{ fontSize: 26 }} />
              ) : (
                <GoHome color={"#fff"} style={{ fontSize: 26 }} />
              )}
            </Link>
          </li>
          <li>
            <Link href={`/${lng}/projets`}>
              {pathname === `/${lng}/projets` ? (
                <FaFileCode color={"#fff"} style={{ fontSize: 24 }} />
              ) : (
                <FaRegFileCode color={"#fff"} style={{ fontSize: 24 }} />
              )}
            </Link>
          </li>
          <li>
            <Link href={`/${lng}/a-propos`}>
              {pathname === `/${lng}/a-propos` ? (
                <IoPerson color={"#fff"} style={{ fontSize: 25 }} />
              ) : (
                <IoPersonOutline color={"#fff"} style={{ fontSize: 25 }} />
              )}
            </Link>
          </li>
          <li>
            <Link href={`/${lng}/map`}>
              {pathname === `/${lng}/map` ? (
                <IoLocation color={"#fff"} style={{ fontSize: 25 }} />
              ) : (
                <IoLocationOutline color={"#fff"} style={{ fontSize: 25 }} />
              )}
            </Link>
          </li>
          {/* LANGUAGE */}
          <li className="flex justify-center w-full h-full">
            {lngActive ? (
              <>
                <div className="relative flex justify-center w-full h-full bg-white/30 rounded-lg">
                  <div className="absolute flex flex-col h-[5rem]">
                    <IoGlobe
                      color={"#fff"}
                      style={{ fontSize: 25 }}
                      onClick={(e) => handleLngActive(e)}
                    />
                    <span className="font-bold text-sm">{t(lng)}</span>
                    {languages
                      .filter((l) => lng !== l)
                      .map((l, index) => {
                        return (
                          <div
                            key={l}
                            className="space-y-2 justify-items-center"
                          >
                            <span className="text-sm">
                              {index > 0 && " or "}
                              <Link href={`/${l}`}>{t(l)}</Link>
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : (
              <IoGlobeOutline
                color={"#fff"}
                style={{ fontSize: 25 }}
                onClick={(e) => handleLngActive(e)}
              />
            )}
          </li>
        </ul>
      </div>
      {/* LANGUAGE */}
      {/* <div className="flex items-center hover:cursor-pointer w-full justify-end mb-4 space-x-2">
        <IoGlobe
         color={"#fff"}
         style={{ fontSize: 25 }}
         onClick={(e) => handleLngActive(e)}
        />
        <span className="font-bold text-xs">{t(lng)}</span>
        {languages
          .filter((l) => lng !== l)
          .map((l, index) => {
            return (
              <div key={l} className="space-x-2 items-center">
                <span className="">/</span>
                <span className="text-xs">
                  {index > 0 && " or "}
                  <Link href={`/${l}`}>{t(l)}</Link>
                </span>
              </div>
            );
          })}
      </div> */}
      {/* Larger screen Component */}
      <div
        className="hidden lg:flex w-screen h-max fixed top-0 p-10 backdrop-blur bg-slate-900/75 z-30"
        onPointerMove={(e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        onMouseLeave={() => {
          setPosition({ x: -20, y: -20 });
        }}
      >
        {menuActive ? (
          <>
            <div className="relative w-full h-full">
              <div
                className="hidden lg:flex bg-teal-500 blur-lg -z-10"
                style={{
                  position: "absolute",
                  borderRadius: "50%",
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  left: -10,
                  top: -10,
                  width: 20,
                  height: 20,
                }}
              />
              <ol className="grid grid-cols-5 justify-items-center">
                {t("menu", { returnObjects: true }).map((item, index) => (
                  <li className="flex justify-center h-full w-full" key={index}>
                    <p className="text-center text-lg cursor-pointer hover:text-slate-400">
                      {item.name}
                    </p>
                  </li>
                ))}

                <li className="flex justify-center h-full w-full">
                  <div className="flex justify-items-center space-x-2">
                    <IoGlobeOutline color={"#fff"} style={{ fontSize: 25 }} />
                    <span className="font-bold hover:cursor-pointer hover:text-slate-400">{t(lng)}</span>
                    {languages
                      .filter((l) => lng !== l)
                      .map((l, index) => {
                        return (
                          <div key={l} className="space-x-2 items-center">
                            <span className="">/</span>
                            <span className="text-xs hover:text-slate-400">
                              {index > 0 && " or "}
                              <Link href={`/${l}`}>{t(l)}</Link>
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </li>
              </ol>
            </div>
            {/* <div className="flex items-center hover:cursor-pointer w-full justify-end mb-4 space-x-2">
              <IoGlobe style={{ fontSize: 15 }} className="text-black" />
              <span className="font-bold text-xs">{t(lng)}</span>
              {languages
                .filter((l) => lng !== l)
                .map((l, index) => {
                  return (
                    <div key={l} className="space-x-2 items-center">
                      <span className="">/</span>
                      <span className="text-xs">
                        {index > 0 && " or "}
                        <Link href={`/${l}`}>{t(l)}</Link>
                      </span>
                    </div>
                  );
                })}
            </div>{" "} */}
          </>
        ) : (
          <div>
            <IoChevronBack
              style={{ fontSize: 30, color: "black" }}
              onClick={() => setMenuActive(true)}
              className="cursor-pointer transition ease-in-out hover:scale-110 lg:hidden"
            />
          </div>
        )}
      </div>
    </>
  );
}
