import Maintenance from '../components/Maintenance/maintenance'

export async function generateMetadata({ params }) {
  // read route params
  const {lng} = await params 
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
  const {lng} = await params 
  return (
    <Maintenance status={'Coding in progress'} text={'This page will display a map providing key stones of my journey'}/>
  )
}