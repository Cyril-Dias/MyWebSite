'use client'

import { useEffect } from 'react';
import { inter } from '../../fonts'
export default function OverLappedTitle({ title }) {
  // UseEffect to select the overlap Css class
  useEffect(() => {
    const overlapEls = document.querySelectorAll(".overlap");
    // console.log('document', document.querySelectorAll("overlap"));
    // Setting all letters as individual span to set specific settings
    overlapEls.forEach((el) => {
      const chars = [...el.textContent];
      el.innerHTML = "";
      chars.forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.setProperty("--index", index);
        el.append(span);
      });
    });
  });

  return (
    <>
      <h1 className={`${inter.className} lg:mt-20 uppercase text-center text-2xl font-bold overlap overlap-front z-10`}>
        {title}
      </h1>
    </>
  );
}
