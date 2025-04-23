"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IoGlobe, IoGlobeOutline } from "react-icons/io5";
import { languages } from "../../../i18n/settings";

export default function LanguageSwitcher({ lng, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={switcherRef} className="relative flex justify-center items-center h-full w-full">
      <div className="absolute top-5 z-10">
        {isOpen ? (
          <IoGlobe
            color="#fff"
            style={{ fontSize: 25, cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <IoGlobeOutline
            color="#fff"
            style={{ fontSize: 25, cursor: "pointer" }}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute -top-10 w-[30px] h-[90px] bg-white/30 rounded-lg">
          <div className="flex flex-col h-full text-center mt-2">
            {languages
              .filter((l) => lng !== l)
              .map((l, index) => (
                <div key={l} className="space-y-2 justify-items-center">
                  <span className="text-sm">
                    {index > 0 && " or "}
                    <Link href={`/${l}`} onClick={() => setIsOpen(false)}>
                      {t(l)}
                    </Link>
                  </span>
                </div>
              ))}
            <span
              className="font-bold text-sm cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {t(lng)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
