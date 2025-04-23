"use client";

import "../../globals.css";
import SkillsChart from "./skillsChart";
import LangChart from "./langChart";
import ValuesSection from "./valeurs"

export default function SecondLine({ lng, skills, title, services,  langTitle, langSkills, langStack }) {
  const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";
  
  return (
    <>
    <div className="w-full h-full screen pt-0">
      <h2 
        className="font-bold mb-6 text-center text-[1.5rem] uppercase"
        style={{
          backgroundImage: accentColor,
          WebkitBackgroundClip: "text", // Applique le dégradé sur le texte
          color: "transparent", // Rend le texte transparent pour laisser apparaître le dégradé
        }}
        >
          {services}
      </h2>
      <SkillsChart lng={lng} skills={skills} title={title} />
      <h2 
        className="font-bold my-6 text-center text-[1.5rem] uppercase"
        style={{
          backgroundImage: accentColor,
          WebkitBackgroundClip: "text", // Applique le dégradé sur le texte
          color: "transparent", // Rend le texte transparent pour laisser apparaître le dégradé
        }}
        >
          {langStack}
      </h2>
      <LangChart lng={lng} langSkills={langSkills} langTitle={langTitle} />
      <ValuesSection lng={lng} />
    </div>
    </>
  );
}
