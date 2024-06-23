import { useTranslation } from "../i18n";
import OverLappedTitle from "./components/Titles/overlapped";
import FirstLine from "./components/Home/header";
// import Nature from './projets/carousels/nature'

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
  const { t } = await useTranslation(lng, "homepage");
  return (
    <main className="flex min-h-screen flex-col items-center justify-start md:justify-around gap-y-12">
      <div className="slideFromTop">
      <OverLappedTitle lng={lng} title={t("title")} /></div>
      <FirstLine
        lng={lng}
        title={t("title")}
        name={t("name")}
        job={t("job")}
        text={t("text")}
        textLg={t("textLg")}
        cv={t("cv")}
        contact={t("contact")}
      />
      {/*  <Nature />*/}
    </main>
  );
}
