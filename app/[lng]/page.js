import { getTranslations } from "../i18n";
import OverLappedTitle from "./components/Titles/overlapped";
import FirstLine from "./components/Home/header";
import SecondLine from "./components/Home/competences";

export async function generateMetadata({ params }) {
  // read route params
  const { lng } = await params
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
  const { lng } = await params
  const { t } = await getTranslations(lng, "homepage");
  return (
    <main className="min-h-screen w-screen">
      <div className="flex flex-col items-center justify-start md:justify-around screen">
        {/* Title Animation */}
        <div className="w-full slideFromTop">
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
            job3={t("job3")}
            text={t("text")}
            textLg={t("textLg")}
            portfolio={t("portfolio")}
            contact={t("contact")}
          />
        </div>
      </div>
      <div className="h-auto w-screen bg-competences">
          <SecondLine
            lng={lng}
            title={t("chart.title")}
            skills={t("chart.skills", { returnObjects: true })}
            services={t("chart.services")}
            langTitle={t("langChart.title")}
            langSkills={t("langChart.langSkills", { returnObjects: true })}
            langStack={t("langChart.services")}
          />
        </div>
    </main>
  );
}
