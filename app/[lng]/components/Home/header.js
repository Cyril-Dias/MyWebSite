"use client";

import "../../globals.css";
import { useState } from "react";

export default function FirstLine({ name, job, job2, job3, text, textLg, portfolio, contact, lng }) {

  const [hoverActive, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  const motsColorésParLangue = {
    fr: ['conçois', 'cadrage', 'développement full-stack', 'React', 'Next.js', 'Node.js', 'PHP', 'UX/UI', 'bases de données','API', 'sécurité', 'fluide', 'robustesse', 'scalabilité '],
    en: ['design', 'develop', 'strategic planning', 'full-stack', 'React', 'Next.js', 'Node.js', 'PHP', 'database', 'API', 'security', 'smooth', 'robustness', 'scalability']
  };

  const motsColorés = motsColorésParLangue[lng] || ['fr']; //fallback fr

  const coloriserMotsJSX = (texte, mots, isHovered) => {
    const regex = new RegExp(`\\b(${mots.join('|')})\\b`, 'gi');
    const morceaux = [];
    let lastIndex = 0;

    texte.replace(regex, (match, _groupe, index) => {
      if (lastIndex !== index) {
        morceaux.push(texte.slice(lastIndex, index));
      }

      morceaux.push(
        <span
          key={index}
          className={`mot-coloré transition-colors duration-600 ${
            isHovered ? 'text-accent font-semibold text-[1.20rem]' : ''
          }`}
        >
          {match}
        </span>
      );

      lastIndex = index + match.length;
      return match;
    });

    if (lastIndex < texte.length) {
      morceaux.push(texte.slice(lastIndex));
    }

    return morceaux;
  };

  return (
    <>
      {/* main component container */}
      <div className="flex justify-center">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col h-[100%] w-[100vw] pb-20 md:w-[80%] xl:w-[65%] md:rounded-2xl md:bg-light/20 md:ease-in-out md:duration-500 overflow-hidden">
          {/* Flex-row container for the first flex-col items: text & image */}
          <div className="flex flex-row relative">
            {/* Small screen display */}
            <div className="flex flex-col md:hidden ml-4 mr-2 md:m-8 fadeIn">
              <p className="w-full text-[1.75rem] mb-4 font-bold">{name}</p>
              <p
                className="w-full text-[1.125rem] mb-4 font-semibold text-accent"
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
              <p className="h-full text-base md:text-md"> {coloriserMotsJSX(job, motsColorés, hoverActive)}</p>
              <p className="h-full text-base md:text-md">{job2}</p>
              <p className="h-full text-base md:text-md">{job3}</p>
            </div>
            {/* Larger Screen text display */}
            <div className="w-full h-max hidden md:flex flex-col m-8 fadeIn">
              <p className="w-full md:text-3xl lg:text-6xl mb-4 lg:mb-8 font-bold">{name}</p>
              {/* Md text display */}
              <p
                className="w-full text-[1.5rem] lg:hidden mb-2 text-accent font-semibold"
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
              {/* Lg text display */}
              <p className="w-full text-[1.5rem] hidden lg:flex mb-6 text-accent font-semibold">{textLg}</p>
              <p className="w-full text-[1rem] md:text-xl tracking-tight fadeIn">
                {coloriserMotsJSX(job, motsColorés, hoverActive)}
              </p>
              <p className="w-full text-[1rem] md:text-xl tracking-tight fadeIn">
                {coloriserMotsJSX(job2, motsColorés, hoverActive)}
              </p>
              <p className="w-full text-[1rem] md:text-xl tracking-tight fadeIn">
                {coloriserMotsJSX(job3, motsColorés, hoverActive)}
              </p>
            </div>
          </div>
          {/* Second row for the Links display */}
          <div className="absolute bottom-0 flex justify-evenly items-center mb-6 md:m-4 w-full slideFromBottom md:text-lg lg:text-xl">
            {hoverActive ? (
              <a
                className="btn-primary-active"
                href="/projets"
                target="_blank"
                rel="noreferrer noopener"
                download="Cyril Dias Curriculum Vitae"
              >
                {portfolio}
              </a>) : (
              <a
                className="btn-primary"
                href="https://1drv.ms/b/s!AoYvc5okKxZ-hbtvckt37yq12wg38g?e=JzY1jk"
                target="_blank"
                rel="noreferrer noopener"
                download="Cyril Dias Curriculum Vitae"
              >
                {portfolio}
              </a>
            )}
            {hoverActive ? (
              <a
                className="btn-primary-active"
                href="mailto:cyril.dias-senden@hotmail.fr"
                target="_blank"
                rel="noreferrer noopener"
              >
                {contact}
              </a>) : (
              <a
                className="btn-primary"
                href="mailto:cyril.dias-senden@hotmail.fr"
                target="_blank"
                rel="noreferrer noopener"
              >
                {contact}
              </a>
            )}
          </div>
          {/* Bottom container's border for small screen only*/}
          <span className="absolute bottom-0 justify-center w-full border-b border-white/65 borderScale md:hidden"></span>
        </div>
      </div>
    </>
  );
}
