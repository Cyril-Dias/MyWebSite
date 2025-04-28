import Carousels from './carousels/page'
import Maintenance from "./../components/Maintenance/maintenance";
import { getTranslations } from "../../i18n";

export async function generateMetadata({ params }) {
  // read route params
  const { lng } = await params
  const meta = {
    fr: {
      title: "Mes projets dev",
      metadescription:
        "Une bibliothèque de mes créations",
    },
    en: {
      title: "My dev projects",
      metadescription:
        "Some of my dev projects",
    },
  };

  const canonical = {
    fr: "https://www.localhost:3000/fr/projets",
    en: "https://www.localhost:3000/en/projects"
  };

  return {
    title: meta[lng].title,
    description: meta[lng].metadescription,
    alternates: {
      canonical: canonical[lng],
    },
  };
}


export default async function Projets({ params }) {
  const { lng } = await params;
  const { t } = await getTranslations(lng, "projets");
  const accentColor = "linear-gradient(to right, #e78b22, #8b22e7)";

  return (
    <Maintenance isActive={false} message={t("maintenance")} description={t("maintenanceDesc")}>
      {/* Contenu réel de la page */}
      <div className='screen'>
        {/* First bloc container */}
        <div className="my-8 flex justify-center">
          <div className="relative flex flex-col h-[100%] w-[100vw] md:w-[80%] xl:w-[65%] md:rounded-2xl md:bg-light/20 md:ease-in-out md:duration-500 overflow-hidden slideFromTop">
            {/* Text elements */}
            <div className='ml-4 md:m-8 fadeIn duration-500  delay-700'>
              <h1
                className="font-bold mb-6 text-center text-[1.75rem] uppercase"
                style={{
                  backgroundImage: accentColor,
                  WebkitBackgroundClip: "text", // Applique le dégradé sur le texte
                  color: "transparent", // Rend le texte transparent pour laisser apparaître le dégradé
                }}
              >
                {t("title")}
              </h1>
              <p className='text-[1rem] md:text-xl tracking-tight leading-[1.75rem]'>{t("text")}</p>
            </div>
          </div>
        </div>
        <Carousels lng={lng} />
      </div>
    </Maintenance>
  );
}