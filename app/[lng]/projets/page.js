import Carousels from './carousels/page'

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
  const {lng} = await params 
  return (
  <div className='screen'>
    <Carousels lng={lng} />
  </div>
  )
}