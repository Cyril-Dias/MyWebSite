import React, { useState } from "react";
import {
  FaBalanceScale,
  FaHeadset,
  FaArrowsAlt,
  FaHandsHelping,
  FaLeaf
} from "react-icons/fa";

export default function ValuesSection({ lng }) {
  // Dégradé
  const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";

  // Définition des valeurs en français et en anglais
  const translations = {
    fr: {
      title: "Mes Valeurs",
      list: [
        { name: "Rigueur", icon: <FaBalanceScale />, description: "Méthode et précision à chaque étape." },
        { name: "Écoute", icon: <FaHeadset />, description: "Comprendre vos besoins pour mieux répondre." },
        { name: "Adaptabilité", icon: <FaArrowsAlt />, description: "Flexibilité pour m’ajuster à chaque projet." },
        { name: "Engagement Social", icon: <FaHandsHelping />, description: "Promouvoir des solutions solidaires et accessibles." },
        { name: "Engagement Écologique", icon: <FaLeaf />, description: "Minimiser l’empreinte numérique grâce à des performances optimisées." },
      ],
    },
    en: {
      title: "My Values",
      list: [
        { name: "Rigor", icon: <FaBalanceScale />, description: "Method and precision at every step." },
        { name: "Listening", icon: <FaHeadset />, description: "Understanding your needs to better deliver." },
        { name: "Adaptability", icon: <FaArrowsAlt />, description: "Flexibility to adjust to every project." },
        { name: "Social Commitment", icon: <FaHandsHelping />, description: "Promoting inclusive, community-driven solutions." },
        { name: "Ecological Commitment", icon: <FaLeaf />, description: "Minimizing digital footprint through performance optimization." },
      ],
    },
  };

  // Sélection selon la langue
  const { title: valuesTitle, list: values } = translations[lng] || translations.fr;

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-10">
      <h2 className="text-[1.75rem] font-bold mb-6 text-center text-accent uppercase">
        {valuesTitle}
      </h2>
      <div className="flex justify-center">
        <div className="w-full md:w-[80%] grid grid-cols-1 gap-6 lg:grid-cols-2">
          {values.map((val, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={val.name}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                className="p-6 rounded-lg bg-light/20 border border-light flex flex-col items-center text-center transition-all ease-in-out duration-500"
                style={{
                  background: isActive ? accentColor : undefined,
                }}
              >
                <div className="mb-4 text-4xl">
                  {val.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {val.name}
                </h3>
                <p className="text-sm text-light/80">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
