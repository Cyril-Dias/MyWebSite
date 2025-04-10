"use client";

import "../../globals.css";
import { useEffect } from "react";
import gsap from "gsap";

export default function Logo() {
  useEffect(() => {
    const lineUp = document.querySelector("#lineUp");
    const lineDown = document.querySelector("#lineDown");

    if (!lineUp || !lineDown) return;

    const lengthUp = lineUp.getTotalLength();
    const lengthDown = lineDown.getTotalLength();

    // Montrer les lignes initialement
    gsap.set(lineUp, {
      strokeDasharray: lengthUp,
      strokeDashoffset: 0,
    });

    gsap.set(lineDown, {
      strokeDasharray: lengthDown,
      strokeDashoffset: 0,
    });
    // Cache les chevrons initialement
    gsap.set(['#chevronIn', '#chevronOut'], {
      autoAlpha: 0,
    });

    let isAnimating = false; // Indicateur de l'état d'animation (animée ou non)

    function erase() {
      var tl = gsap.timeline();
      // Montre les chevrons avant animation
      tl.set(['#chevronIn', '#chevronOut'], { autoAlpha: 1 })
      // Effacer les lignes en même temps: lineUp (droite → gauche)
      tl.to(lineUp, {
        strokeDashoffset: -lengthUp,
        duration: 1.5,
        ease: "power2.inOut",
      })
        // Efface lineDown (gauche → droite)
        .to(lineDown, {
          strokeDashoffset: lengthDown,
          duration: 1.5,
          ease: "power2.inOut",
        }, "<");
      return tl;
    }

    function drow() {
      var tl = gsap.timeline();
      // Redessiner les lignes en même temps: lineUp (droite → gauche)
      tl.set(lineUp, { strokeDashoffset: lengthUp })
        .set(lineDown, { strokeDashoffset: -lengthDown })
        .to(lineUp, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        })
        // Redessine lineDown (gauche → droite)
        .to(lineDown, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        }, "<")
        // Cache les chevrons pour le reste de l'animation
        .set(['#chevronIn', '#chevronOut'], {
          autoAlpha: 0,
        });
      return tl;
    }

    function blink() {
      const tl = gsap.timeline({ repeat: 1, yoyo: true });

      const lineUp = document.querySelector("#lineUp");
      const originalD = lineUp.getAttribute("d");
      const downD = document.querySelector("#lineDown").getAttribute("d");

      tl.set(["#chevronIn", "#chevronOut"], { opacity: 0 });
      tl.to(
        lineUp,
        {
          attr: { d: downD },
          duration: 0.7,
          ease: "power1.inOut",
        },
        0 // démarre en même temps que l'animation de disparition de texte
      )
        .to(
          "#cdText",
          {
            // Utiliser le clip-path pour masquer le texte
            clipPath: "inset(100% 0% 0% 0%)", // 100% cache tout le texte du haut vers le bas
            duration: 0.6,
            ease: "power2.in",
          },
          "-=0.8" // synchronisation manuelle avec le mouvement de lineUp
        )
        .to(
          lineUp,
          {
            attr: { d: originalD },
            duration: 0.4,
            ease: "power1.inOut",
          },
          "+=0.3" // petit délai pour l'effet de clin d'oeil
        )
        .to(
          "#cdText",
          {
            fill: "#e78b22",
            clipPath: "inset(0% 0% 0% 0%)", // réaffiche le texte
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3" // démarrage au même moment que le retour de lineUp
        );
      return tl;
    }

    // Animation principale
    var master = gsap.timeline({ duration: 5 });
    master
      .add(erase())
      .add(drow(), "+=1") //with a gap of 4 seconds
      .add(blink())
      .add(erase())
      .play()
      .eventCallback("onComplete", () => {
        isAnimating = false; // L'animation principale est terminée
      })
      .eventCallback("onStart", () => {
        isAnimating = true; // L'animation commence
      })
      .play();

    // Gestion du hover (ne fonctionne que si l'animation est terminée)
    const handleMouseOver = () => {
      if (!isAnimating) { // Si aucune animation n'est en cours
        isAnimating = true; // On marque qu'une animation commence
        const hoverTimeline = gsap.timeline();
        
        // On redémarre l'animation blink uniquement si possible
        hoverTimeline
          .add(drow()) 
          .add(blink()) 
          .add(erase())
          .call(() => {
            // Une fois l'animation terminée, on peut réactiver le hover
            isAnimating = false;
          });
      }
    };

    const handleMouseLeave = () => {
      if (!isAnimating) { // Ne permet de redémarrer l'animation que si rien n'est en cours
        master.restart();
        isAnimating = true; // Animation principale redémarrée
      }
    };

    logo.addEventListener("mouseover", handleMouseOver);
    logo.addEventListener("mouseleave", handleMouseLeave);

    // Nettoyer les événements lors de la destruction du composant
    return () => {
      logo.removeEventListener("mouseover", handleMouseOver);
      logo.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="w-[90px] absolute top-8 right-4 md:left-14 z-50">
        {/* SVG Logo small */}
        <svg
          width="89"
          height="50"
          viewBox="0 0 89 50"
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs2" />
          <path
            style={{
              display: "inline",
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: "3.41884",
              strokeOpacity: 1,
            }}
            d="m 14.415242,14.698824 c -3.97442,3.143055 -7.652714,6.64906 -11.0885237,10.370028 3.4357961,3.720975 7.1141107,7.226974 11.0885237,10.370035"
            id="chevronIn"
            className="chevronIn"
          />
          <path
            d="M 73.680009,35.914318 C 77.579633,32.894403 81.479228,29.293443 85.378844,25.068852 81.479228,20.844262 77.579633,17.243309 73.680009,14.223393"
            style={{
              display: "inline",
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: "3.41884",
              strokeOpacity: 1,
            }}
            id="chevronOut"
            className="chevronOut"
          />
          <path
            d="m 34.217799,34.497373 q -2.216906,0 -4.099941,-0.654393 -1.869673,-0.654387 -3.218515,-1.949804 -1.348833,-1.295419 -2.096704,-3.23187 -0.734518,-1.93645 -0.734518,-4.473872 0,-2.363805 0.707802,-4.286901 0.707809,-1.923097 2.056651,-3.298647 1.295419,-1.322126 3.205161,-2.043289 1.923096,-0.721163 4.193417,-0.721163 1.255357,0 2.256967,0.146907 1.014971,0.133547 1.869681,0.360579 0.894772,0.253739 1.615934,0.574255 0.734517,0.307162 1.282065,0.574263 v 4.821095 H 40.668182 Q 40.294251,19.994017 39.719988,19.553308 39.159087,19.1126 38.437924,18.685244 37.703407,18.25789 36.848697,17.964082 q -0.854709,-0.293808 -1.829612,-0.293808 -1.081741,0 -2.056643,0.347224 -0.974902,0.333877 -1.802904,1.121809 -0.787933,0.761226 -1.282065,2.016581 -0.48077,1.255357 -0.48077,3.044901 0,1.86968 0.520839,3.12503 0.534194,1.255356 1.33548,1.97652 0.814648,0.734516 1.816259,1.055033 1.00161,0.307161 1.976519,0.307161 0.934834,0 1.842966,-0.280454 0.92148,-0.280453 1.696065,-0.761225 0.654386,-0.387293 1.215288,-0.828001 0.560902,-0.440709 0.921486,-0.761225 h 0.534194 v 4.754325 q -0.74787,0.333871 -1.428972,0.627672 -0.681094,0.293809 -1.428965,0.507486 -0.974902,0.280454 -1.829612,0.427355 -0.85471,0.146907 -2.350451,0.146907 z M 63.81212,24.187434 q 0,2.777807 -1.26871,4.981358 -1.268711,2.19019 -3.205162,3.365416 -1.455679,0.881417 -3.191807,1.228648 -1.736127,0.347224 -4.113286,0.347224 H 45.021861 V 14.224727 h 7.21161 q 2.430583,0 4.193424,0.414001 1.762836,0.400647 2.964769,1.148518 2.056651,1.255349 3.231876,3.392123 1.18858,2.12342 1.18858,5.008065 z m -5.301873,-0.04007 q 0,-1.963165 -0.721163,-3.352069 -0.707802,-1.402257 -2.256967,-2.19019 -0.787933,-0.387293 -1.615934,-0.52084 -0.814642,-0.146901 -2.470645,-0.146901 H 50.15012 v 12.446707 h 1.295418 q 1.829612,0 2.684322,-0.160255 0.854709,-0.173615 1.669357,-0.614324 1.402257,-0.801294 2.056643,-2.136774 0.654387,-1.348842 0.654387,-3.325354 z"
            id="cdText"
            className="logoText"
            style={{
              fontWeight: "bold",
              fontSize: "40px",
              display: "inline",
              fill: "#ffffff",
              fillOpacity: 1,
              strokeWidth: "0.683768",
            }}
            aria-label="CD"
          />
          <path
            d="m 3.3267183,25.068852 c 27.3506807,29.629905 54.7014447,29.629905 82.0521257,0"
            style={{
              display: "inline",
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: "3.41884",
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              strokeOpacity: 1,
            }}
            id="lineDown"
            className="lineDown"
          />
          <path
            d="m 3.3315047,25.06384 c 27.3474943,-29.7995172 54.6950583,-29.7995172 82.0425543,0"
            style={{
              display: "inline",
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: "3.42841",
              strokeLinecap: "round",
              strokeLinejoin: "miter",
              strokeOpacity: 1,
            }}
            id="lineUp"
            className="lineUp"
          />
        </svg>
      </div>
    </>
  );
}
