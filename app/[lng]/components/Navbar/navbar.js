"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "../../../i18n/client";
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
  const backPosition = { x: -20, y: -20 };

  return (
    <>
      {/* Small screen Component */}
      <div className="fixed bottom-0 flex md:hidden w-screen backdrop-blur bg-slate-900/75">
        <ul className="grid grid-cols-5 w-full justify-items-center border-t border-slate-50/[0.06] p-6">
          <li className="flex h-full">
            <Link href={`/${lng}/`}>
              {/* Conditional rendering Icons depending on the pathname  */}
              {pathname === `/${lng}` && !lngActive ? (
                <GoHomeFill color={"#fff"} style={{ fontSize: 26 }} />
              ) : (
                <GoHome color={"#fff"} style={{ fontSize: 26 }} />
              )}
            </Link>
          </li>
          <li className="cursor-pointer hover:scale-110 transition-all duration-75">
            <Link href={`/${lng}/projets`}>
              {pathname === `/${lng}/projets` ? (
                <FaFileCode color={"#fff"} style={{ fontSize: 24 }} />
              ) : (
                <FaRegFileCode color={"#fff"} style={{ fontSize: 24 }} />
              )}
            </Link>
          </li>
          <li className="cursor-pointer hover:scale-110 transition-all duration-75">
            <Link href={`/${lng}/a-propos`}>
              {pathname === `/${lng}/a-propos` ? (
                <IoPerson color={"#fff"} style={{ fontSize: 25 }} />
              ) : (
                <IoPersonOutline color={"#fff"} style={{ fontSize: 25 }} />
              )}
            </Link>
          </li>
          <li className="cursor-pointer hover:scale-110 transition-all duration-75">
            <Link href={`/${lng}/map`}>
              {pathname === `/${lng}/map` ? (
                <IoLocation color={"#fff"} style={{ fontSize: 25 }} />
              ) : (
                <IoLocationOutline color={"#fff"} style={{ fontSize: 25 }} />
              )}
            </Link>
          </li>
          <li className="cursor-pointer">
            {lngActive ? (
              <IoGlobe
                color={"#fff"}
                style={{ fontSize: 25 }}
                onClick={(e) => handleLngActive(e)}
              />
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

      {/* Larger screen Component */}
      <div
        className="hidden md:flex w-screen h-max fixed top-0 p-10 backdrop-blur bg-slate-900/75"
        onPointerMove={(e) => {
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        {menuActive ? (
          <div className="w-full h-full">
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
            <ol className="grid grid-cols-5 justify-between justify-items-center">
              {t("menu", { returnObjects: true }).map((item, index) => (
                <li className="flex h-full w-full" key={index}>
                  <p className="text-lg cursor-pointer hover:underline">
                    {item.name}
                  </p>
                </li>
              ))}

              <li className="cursor-pointer">
                {lngActive ? (
                  <IoGlobe
                    color={"#fff"}
                    style={{ fontSize: 25 }}
                    onClick={(e) => handleLngActive(e)}
                  />
                ) : (
                  <IoGlobeOutline
                    color={"#fff"}
                    style={{ fontSize: 25 }}
                    onClick={(e) => handleLngActive(e)}
                  />
                )}
              </li>
            </ol>
          </div>
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
