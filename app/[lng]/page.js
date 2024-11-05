import { useTranslation } from "../i18n";
import OverLappedTitle from "./components/Titles/overlapped";
import FirstLine from "./components/Home/header";

// import Nature from './projets/carousels/nature'

export async function generateMetadata({ params }) {
  // read route params
  const {lng} = await params 
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

export default async function Home({ params }) {
  const {lng} = await params 
  const { t } = await useTranslation(lng, "homepage");
  return (
    <main className="flex h-screen screen flex-col items-center justify-start md:justify-around">
      {/* Title Animation */}
      <div className="slideFromTop">
      <OverLappedTitle lng={lng} title={t("title")} />
      </div>
      {/* FirstLine Container */}
      <div className="h-[100%]">
      <FirstLine
        lng={lng}
        title={t("title")}
        name={t("name")}
        job={t("job")}
        job2={t("job2")}
        frontend={t("frontend")}
        frontendDescription={t("frontendDescription")}
        backend={t("backend")}
        backendDescritpion={t("backendDescription")}
        text={t("text")}
        textLg={t("textLg")}
        cv={t("cv")}
        contact={t("contact")}
      />
      </div>
      {/*  <Nature />*/}
    </main>
  );
}
