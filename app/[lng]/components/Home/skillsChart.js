"use client";

import React, { useState, useEffect, useRef } from "react";

// Définir les couleurs et dégradés
const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";
const normalColor = "linear-gradient(to right, #1e177d, #8b22e7)";

const data = [
  { skill: "Performance Web", level: 90 },
  { skill: "Accessibilité", level: 60 },
  { skill: "SEO", level: 70 },
  { skill: "UX/UI", level: 80 },
  { skill: "Clean Code", level: 75 },
  { skill: "Tests / CI-CD", level: 65 },
  { skill: "React / JS", level: 98 },
];

export default function SkillsChart() {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(new Array(data.length).fill(false)); // Suivre l'animation de chaque barre
  const chartRef = useRef(null);

  // Détecte quand le composant devient visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Si le composant devient visible
        if (entries[0].isIntersecting) {
          setAnimationStarted(true); // Lance l'animation
        }
      },
      { threshold: 0.5 } // Déclenche lorsque 50% de l'élément est visible
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current); // Observer sur le composant de chart
    }
    
    // Cleanup de l'observer
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  // Fonction pour ajouter un délai entre les animations des barres
  const handleAnimation = (index) => {
    setTimeout(() => {
      setAnimatedBars((prev) => {
        const newBars = [...prev];
        newBars[index] = true;
        return newBars;
      });
    }, 100 * index); // Délai entre chaque barre de 100ms
  };

  return (
    <div ref={chartRef} className="flex justify-center w-full py-10">
      <div className="w-full max-w-3xl space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Mes Compétences</h2>
        {data.map((item, index) => {
          // Déterminer les styles conditionnellement en fonction du level
          const isHighLevel = item.level > 70;
          const barColor = isHighLevel ? accentColor : normalColor;
          const fontWeight = isHighLevel ? "font-extrabold" : "font-semibold"; // Texte plus gros et en gras si level > 70
          const fontSize = isHighLevel ? "text-xl" : "text-md"; // Plus grand pourcentage si level > 70
          
          // Lancer l'animation quand l'élément devient visible
          if (animationStarted && !animatedBars[index]) {
            handleAnimation(index);
          }

          return (
            <div key={item.skill} className="flex items-center">
              <div className="w-[140px] font-semibold text-lg text-light">
                {item.skill}
              </div>
              <div
                className="relative w-full h-12 flex items-center p-1 rounded-lg"
                style={{
                  border: "1px solid white", // Ligne blanche autour de la barre parente
                }}
              >
                {/* Barre interne alignée à gauche */}
                <div
                  className="h-full rounded-md bg-opacity-80"
                  style={{
                    width: animatedBars[index] ? `${item.level}%` : 0, // Animation de la largeur de la barre
                    backgroundImage: barColor, // Applique la couleur conditionnelle
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", // Bordure floue optionnelle autour de la barre interne
                    transition: "width 1s ease-in-out", // Animation de la largeur
                  }}
                ></div>

                {/* Le pourcentage aligné après sa barre, centré verticalement */}
                <div
                  className={`flex items-center justify-center ml-2 w-12 h-full ${fontWeight} ${fontSize}`}
                  style={{
                    backgroundImage: isHighLevel ? accentColor : normalColor, // Applique le dégradé conditionnel
                    WebkitBackgroundClip: "text", // Applique le dégradé sur le texte
                    color: "transparent", // Rend le texte transparent pour laisser apparaître le dégradé
                    fontWeight: fontWeight, // Applique explicitement fontWeight
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
