import Maintenance from "./../components/Maintenance/maintenance";
import { getTranslations } from "../../i18n";

export async function generateMetadata({ params }) {
  // read route params
  const { lng } = await params
  const meta = {
    fr: {
      title: "Mes projets dev",
      metadescription:
        "Une bibliothèque intégrée de certaines de mes créations",
    },
    en: {
      title: "My dev projects",
      metadescription:
        "Some of my dev projects",
    },
  };

  const canonical = {
    fr: "https://www.localhost:3000/fr/life-map/",
    en: "https://www.localhost:3000/en/life-map/"
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
  const { t } = await getTranslations(lng, "map");

  return (
    <Maintenance isActive={true} message={t("maintenance")} description={t("maintenanceDesc")}>
      {/* Contenu réel de la page */}
      <div className="screen">
        {/* Inserer component map */}
      </div>
    </Maintenance>
  )
}