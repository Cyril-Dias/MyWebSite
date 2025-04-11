"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "../../../i18n/client";
import { languages } from "../../../i18n/settings";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaFileCode, FaRegFileCode } from "react-icons/fa6";
import {
  IoLocation,
  IoLocationOutline,
  IoGlobe,
  IoGlobeOutline,
} from "react-icons/io5";

export default function Navbar({ lng }) {
  const pathname = usePathname(); // Récupération de l'URL actuelle
  const { t } = useTranslation(lng, "navbar");
  const [lngActive, setLngActive] = useState(false);
  const [lngHovered, setLngHovered] = useState(true);
  const [hoveredLink, setHoveredLink] = useState(null); // Stocke le lien actuellement survolé

  // Fonction pour vérifier si le lien est actif
  const isActive = (link) => {
    if (link === "/") {
      // Si le lien est "/" (accueil), il est actif si le pathname est juste "/fr" ou "/en"
      return pathname === `/${lng}`; 
    }
    // Pour les autres liens, vérifier s'ils sont actifs
    return pathname === `/${lng}${link}` || pathname.startsWith(`/${lng}${link}/`);
  };

  const handleMouseLng = () => setLngHovered(!lngHovered);
  const handleLngActive = (e) => {
    e.stopPropagation();
    setLngActive(!lngActive);
  };

  return (
    <>
      {/* Sm and Md screen Component */}
      <div className="flex lg:hidden w-screen min-h-28 backdrop-blur-lg bg-indigo-950/20">
        <ul className="grid grid-cols-4 w-full justify-items-center items-center border-t border-slate-50/[0.06] p-6">
          <li>
            <Link href={`/${lng}/`}>
              {isActive(`/`) && !lngActive ? (
                <GoHomeFill color={"#fff"} style={{ fontSize: 26 }} />
              ) : (
                <GoHome color={"#fff"} style={{ fontSize: 26 }} />
              )}
            </Link>
          </li>
          <li>
            <Link href={`/${lng}/projets`}>
              {isActive(`/projets`) ? (
                <FaFileCode color={"#fff"} style={{ fontSize: 24 }} />
              ) : (
                <FaRegFileCode color={"#fff"} style={{ fontSize: 24 }} />
              )}
            </Link>
          </li>
          <li>
            <Link href={`/${lng}/map`}>
              {isActive(`/map`) ? (
                <IoLocation color={"#fff"} style={{ fontSize: 25 }} />
              ) : (
                <IoLocationOutline color={"#fff"} style={{ fontSize: 25 }} />
              )}
            </Link>
          </li>
          {/* LANGUAGE */}
          <li className="flex justify-center items-center w-full h-full">
            {lngActive ? (
              <>
                <div className="relative flex justify-center items-center h-full w-full">
                  <div className="absolute flex justify-center top-5 z-10">
                    <IoGlobe
                      color={"#fff"}
                      style={{ fontSize: 25, cursor: "pointer" }}
                      onClick={handleLngActive}
                    />
                  </div>
                  <div className="absolute -top-10 w-[30px] h-[90px] bg-white/30 rounded-lg">
                    <div className="flex flex-col h-full text-center mt-2">
                      {languages
                        .filter((l) => lng !== l)
                        .map((l, index) => {
                          return (
                            <div key={l} className="space-y-2 justify-items-center">
                              <span className="text-sm">
                                {index > 0 && " or "}
                                <Link href={`/${l}`}>{t(l)}</Link>
                              </span>
                            </div>
                          );
                        })}
                      <span
                        onClick={handleLngActive}
                        className="font-bold text-sm cursor-pointer"
                      >
                        {t(lng)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <IoGlobeOutline
                color={"#fff"}
                style={{ fontSize: 25, cursor: "pointer" }}
                onClick={handleLngActive}
              />
            )}
          </li>
        </ul>
      </div>

      {/* Larger screen Component */}
      <div className="hidden lg:flex w-screen h-max fixed top-0 p-10 backdrop-blur-lg bg-indigo-950/20 z-50">
        <div className="relative w-full h-full">
          <ol className="grid grid-cols-4 justify-items-center">
            {t("menu", { returnObjects: true }).map((item) => {
              const isLinkActive = isActive(`/${item.href}`);
              const isHovered = hoveredLink === item.href;
              return (
                <li
                  className="flex justify-center h-full w-full"
                  key={item.href} // Utilise une clé unique
                >
                  <Link
                    href={`/${lng}/${item.href || '#'}`}
                    className={`text-center text-lg font-semibold cursor-pointer transition ease-in duration-300 
                      ${isHovered ? "text-light" : isLinkActive ? "text-light" : "text-slate-400"}`
                    }
                    onMouseEnter={() => setHoveredLink(item.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {item.name || "Lien indisponible"}
                  </Link>
                </li>
              );
            })}
            <li className="flex justify-center h-full w-full">
              <div className="flex justify-items-center space-x-2">
                <IoGlobeOutline color={"#fff"} style={{ fontSize: 25, cursor: "pointer" }} />
                {lngHovered ? (
                  <span className="font-bold text-light hover:cursor-pointer">
                    {t(lng)}
                  </span>
                ) : (
                  <span className="font-bold hover:cursor-pointer text-slate-400 transition ease-in duration-300">
                    {t(lng)}
                  </span>
                )}
                {languages
                  .filter((l) => lng !== l)
                  .map((l, index) => {
                    return (
                      <div key={l} className="space-x-2 items-center">
                        <span className="text-white">/</span>
                        <span
                          onMouseEnter={handleMouseLng}
                          onMouseLeave={handleMouseLng}
                          className="text-slate-400 hover:text-light transition ease-in duration-300"
                        >
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
      </div>
    </>
  );
}
