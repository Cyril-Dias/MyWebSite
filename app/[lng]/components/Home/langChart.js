"use client";

import React, { useState, useEffect, useRef } from "react";

const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";
const normalColor = "linear-gradient(to right, #1e177d, #8b22e7)";

export default function LangChart({ lng, langSkills, langTitle }) {
  const chartRef = useRef(null);
  const [animatedBars, setAnimatedBars] = useState(new Array(langSkills.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;

        if (isVisible) {
          langSkills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedBars((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            }, index * 100);
          });
        } else {
          setAnimatedBars(new Array(langSkills.length).fill(false));
        }
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [langSkills.length]);

  return (
    <div ref={chartRef} className="flex justify-center w-full py-10">
      <div className="w-full max-w-[80%] space-y-4 lg:grid lg:grid-cols-2 lg:gap-x-12">
        <h2 className="flex lg:col-span-full lg:justify-center font-bold mb-6 text-center text-[1.75rem] text-accent uppercase">
          {langTitle}
        </h2>
        {langSkills.map((item, index) => {
          const isHighLevel = item.langLevel > 70;
          const barColor = isHighLevel ? accentColor : normalColor;
          const fontWeight = isHighLevel ? "font-extrabold" : "font-semibold";
          const fontSize = isHighLevel ? "text-xl" : "text-md";

          return (
            <div key={item.langSkill} className="flex items-center w-full gap-x-4">
              <div className="w-[30%] font-semibold text-lg text-light">
                {item.langSkill}
              </div>
              <div
                className="relative w-full h-12 flex items-center p-1 rounded-lg"
                style={{ border: "1px solid white" }}
              >
                <div
                  className="h-full rounded-md bg-opacity-80"
                  style={{
                    width: animatedBars[index] ? `${item.langLevel}%` : "0%",
                    backgroundImage: barColor,
                    transition: "width 1s ease-in-out",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                ></div>

                <div
                  className={`flex items-center justify-center ml-2 w-12 h-full ${fontWeight} ${fontSize}`}
                  style={{
                    backgroundImage: isHighLevel ? accentColor : normalColor,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontWeight,
                    opacity: animatedBars[index] ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
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
  );
}
