"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";
const normalColor = "linear-gradient(to right, #1e177d, #8b22e7)";

export default function LangChart({ lng, langSkills, langTitle }) {
  const refs = useRef(langSkills.map(() => React.createRef()));
  const [animatedBars, setAnimatedBars] = useState(new Array(langSkills.length).fill(false));

  const groupedSkills = langSkills.reduce((acc, skill) => {
    const globalIndex = langSkills.findIndex((s) => s === skill);
    acc[skill.type] = acc[skill.type] || [];
    acc[skill.type].push({ ...skill, globalIndex });
    return acc;
  }, {});

  const types = Object.keys(groupedSkills);
  const [openSections, setOpenSections] = useState({
    frontend: true,
    backend: false,
    other: false,
  });

  const toggleSection = (type) => {
    const newState = {
      ...openSections,
      [type]: !openSections[type],
    };
    setOpenSections(newState);
  
    const isSmallScreen = typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
    if (!isSmallScreen) return;
  
    // Met à jour les animations en même temps
    groupedSkills[type].forEach((item) => {
      setAnimatedBars((prev) => {
        const updated = [...prev];
        updated[item.globalIndex] = !openSections[type]; // on inverse l'état
        return updated;
      });
    });
  };
  
  // IntersectionObserver (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (!isLargeScreen) return;

    const observers = refs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setAnimatedBars((prev) => {
            const updated = [...prev];
            updated[index] = entry.isIntersecting;
            return updated;
          });
        },
        { threshold: 0.4 }
      );

      if (ref.current) observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (refs.current[index].current) {
          observer.unobserve(refs.current[index].current);
        }
      });
    };
  }, []);
  
  // Animation initiale pour la section ouverte par défaut sur mobile (frontend)
useEffect(() => {
  const isSmallScreen = typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
  if (!isSmallScreen || !openSections.frontend) return;

  groupedSkills.frontend.forEach((item) => {
    setAnimatedBars((prev) => {
      const updated = [...prev];
      updated[item.globalIndex] = true;
      return updated;
    });
  });
}, []);


  return (
    <div className="flex justify-center w-full py-10">
      <div className="w-full max-w-[80%] space-y-6">
        <h2 className="text-center text-[1.75rem] text-accent uppercase font-bold mb-4">
          {langTitle}
        </h2>

        {/* Mobile: sections repliables */}
        <div className="lg:hidden">
          {types.map((type) => (
            <div key={type} className="sm:border-b sm:border-white/20">
              <button
                className="w-full flex justify-between items-center px-2 py-3 md:py-6 font-semibold text-left text-lg text-white"
                onClick={() => toggleSection(type)}
              >
                <span className="capitalize uppercase">{type}</span>
                <span className="flex md:hidden">
                  {openSections[type] ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-700 ${
                  openSections[type] ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {groupedSkills[type].map((item) => {
                  const index = item.globalIndex;
                  const isAnimated = animatedBars[index];
                  const isHighLevel = item.langLevel > 70;
                  const barColor = isHighLevel ? accentColor : normalColor;
                  const fontWeight = isHighLevel ? "font-extrabold" : "font-semibold";
                  const fontSize = isHighLevel ? "text-xl" : "text-md";

                  return (
                    <div
                      key={item.langSkill}
                      className={`flex flex-col sm:flex-row sm:items-center w-full gap-2 sm:gap-x-4 transition-opacity duration-700 ease-in-out ${
                        openSections[type] ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="w-full sm:w-[30%] font-semibold text-lg text-light">
                        {item.langSkill}
                      </div>
                      <div
                        className="relative w-full h-12 flex items-center p-1 rounded-lg"
                        style={{ border: "1px solid white" }}
                      >
                        <div
                          className="h-full rounded-md bg-opacity-80 transition-all duration-700 ease-in-out"
                          style={{
                            width: isAnimated ? `${item.langLevel}%` : "0%",
                            backgroundImage: barColor,
                          }}
                        ></div>

                        <div
                          className={`flex items-center justify-center ml-2 w-12 h-full ${fontWeight} ${fontSize} transition-opacity duration-700`}
                          style={{
                            backgroundImage: barColor,
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            opacity: isAnimated ? 1 : 0,
                          }}
                        >
                          {item.langLevel}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-x-16">
          {langSkills.map((item, index) => {
            const isAnimated = animatedBars[index];
            const isHighLevel = item.langLevel > 70;
            const barColor = isHighLevel ? accentColor : normalColor;
            const fontWeight = isHighLevel ? "font-extrabold" : "font-semibold";
            const fontSize = isHighLevel ? "text-xl" : "text-md";

            return (
              <div key={item.langSkill} className="flex flex-row items-center w-full my-4">
                <div className="w-[30%] font-semibold text-lg text-light mx-6">{item.langSkill}</div>
                <div
                  className="relative w-full h-12 flex items-center p-1 rounded-lg"
                  style={{ border: "1px solid white" }}
                >
                  <div
                    ref={refs.current[index]}
                    className="h-full rounded-md bg-opacity-80 transition-all duration-1000"
                    style={{
                      width: isAnimated ? `${item.langLevel}%` : "0%",
                      backgroundImage: barColor,
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    }}
                  ></div>

                  <div
                    className={`flex items-center justify-center ml-2 w-12 h-full ${fontWeight} ${fontSize} transition-opacity duration-1000`}
                    style={{
                      backgroundImage: barColor,
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      opacity: isAnimated ? 1 : 0,
                    }}
                  >
                    {item.langLevel}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
