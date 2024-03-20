import Image from "next/image";
import { useTranslation } from "../i18n";
import Nature from "./projets/carousels/nature"


export async function generateMetadata({ params: { lng } }) {
  // read route params
  const meta = {
    fr: {
      title: "Cyril Dias Developpeur Web Full-stack",
      metadescription:
        "Bienvenue sur mon site web, je suis développeur web full-stack spécialisé en Frontend",
    },
    en: {
      title: "Cyril Dias Full Stack Web Developpeur",
      metadescription:
        "Welcome on my Website, I'm a full stack developper specialized in Frondend",
    },
  };

  return {
    title: meta[lng].title,
    description: meta[lng].metadescription,
    alternates: {
      canonical: `https://www.localhost:3000/${lng}/`,
    },
  };
}

export default async function Home({ params: { lng } }) {

  const { t } = await useTranslation(lng, "homepage")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h1>{t('title')}</h1>
      </div>
      <Nature />
    </main>
  );
}
