"use client";

import React, { useState, useEffect, useRef } from "react";

const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";
const normalColor = "linear-gradient(to right, #1e177d, #8b22e7)";

export default function SkillsChart({ lng, skills, title }) {
  const chartRef = useRef(null);
  const [animatedBars, setAnimatedBars] = useState(new Array(skills.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;

        if (isVisible) {
          skills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedBars((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            }, index * 100);
          });
        } else {
          setAnimatedBars(new Array(skills.length).fill(false));
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
  }, [skills.length]);

  return (
    <div ref={chartRef} className="flex justify-center w-full py-10">
      <div className="w-full max-w-3xl space-y-4">
        <h2 className="font-bold mb-6 text-center text-[1.75rem] text-accent uppercase">
          {title}
        </h2>
        {skills.map((item, index) => {
          const isHighLevel = item.level > 70;
          const barColor = isHighLevel ? accentColor : normalColor;
          const fontWeight = isHighLevel ? "font-extrabold" : "font-semibold";
          const fontSize = isHighLevel ? "text-xl" : "text-md";

          return (
            <div
              key={item.skill}
              className="flex flex-col sm:flex-row sm:items-center w-full gap-2 sm:gap-x-4"
            >
              <div className="w-full md:w-[30%] font-semibold md:text-lg text-light">
                {item.skill}
              </div>
              <div
                className="relative w-full h-12 flex items-center p-1 rounded-lg"
                style={{ border: "1px solid white" }}
              >
                <div
                  className="h-full rounded-md bg-opacity-80"
                  style={{
                    width: animatedBars[index] ? `${item.level}%` : "0%",
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
                  {item.level}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
