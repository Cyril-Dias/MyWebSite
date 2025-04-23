"use client";

import Link from "next/link";
import LanguageSwitcher from "./langSwitcher";
import LanguageHoverSwitcher from "./langHoverSwitcher";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "../../../i18n/client";
import { languages } from "../../../i18n/settings";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaFileCode, FaRegFileCode } from "react-icons/fa6";
import { IoLocation, IoLocationOutline } from "react-icons/io5";

export default function Navbar({ lng }) {
  const pathname = usePathname(); // Récupération de l'URL actuelle
  const { t } = useTranslation(lng, "navbar");
  const [lngActive, setLngActive] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null); // Stocke le lien actuellement survolé
  const menuItems = t("menu", { returnObjects: true });

  // Fonction pour vérifier si le lien est actif
  const isActive = (link) => {
    if (link === "/") {
      // Si le lien est "/" (accueil), il est actif si le pathname est juste "/fr" ou "/en"
      return pathname === `/${lng}`;
    }
    // Pour les autres liens, vérifier s'ils sont actifs
    return pathname === `/${lng}${link}` || pathname.startsWith(`/${lng}${link}/`);
  };

  return (
    <>
      {/* Sm and Md screen Component */}
      <div 
      className="flex lg:hidden w-screen min-h-28 backdrop-blur-lg bg-indigo-950/20"
      style={{ height: "var(--nav-height, 7rem)" }}>
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
            <LanguageSwitcher lng={lng} t={t} />
          </li>
        </ul>
      </div>

      {/* Larger screen Component */}
      <div className="hidden lg:flex w-screen h-max fixed top-0 p-10 backdrop-blur-lg bg-indigo-950/20 z-50">
        <div className="relative w-full h-full">
          <ol className="grid grid-cols-4 justify-items-center">
            {menuItems.map((item) => {
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
              <LanguageHoverSwitcher lng={lng} t={t} />
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
