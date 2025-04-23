"use client";

import Link from "next/link";
import { useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";
import { languages } from "../../../i18n/settings";

export default function LanguageHoverSwitcher({ lng, t }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-items-center space-x-2">
      <IoGlobeOutline color="#fff" style={{ fontSize: 25 }} />
      <span
        className={`font-bold transition duration-300 ${
          isHovered ? "text-slate-400" : "text-light"
        }`}
      >
        {t(lng)}
      </span>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => (
          <div key={l} className="space-x-2 items-center">
            <span className="text-white">/</span>
            <span
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-slate-400 hover:text-light transition ease-in duration-300"
            >
              {index > 0 && " or "}
              <Link href={`/${l}`}>{t(l)}</Link>
            </span>
          </div>
        ))}
    </div>
  );
}
