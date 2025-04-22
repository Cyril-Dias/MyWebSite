import Carousels from './carousels/page'
import Maintenance from "./../components/Maintenance/maintenance";
import { useTranslation } from "../../i18n";

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
  const { t } = await useTranslation(lng, "projets");

  return (
    <Maintenance isActive={true} message={t("maintenance")} description={t("maintenanceDesc")}>
      {/* Contenu réel de la page */}
      <div className="screen">
       <Carousels lng={lng} />
      </div>
    </Maintenance>
  );
}