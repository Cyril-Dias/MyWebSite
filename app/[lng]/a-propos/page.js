export async function generateMetadata({ params }) {
  // read route params
  const {lng} = await params 
  const meta = {
    fr: {
      title: "Cyril Dias Dev Full stack| A propos de moi",
      metadescription:
        "Une bibliothèque intégrée de certaines de mes créations",
    },
    en: {
      title: "Cyril Dias | About me",
      metadescription:
        "Some of my dev projects",
    },
  };

  const canonical = {
    fr: "https://www.localhost:3000/fr/a-propos/",
    en: "https://www.localhost:3000/en/a-propos/"
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
    <div><h1>{lng}</h1></div>
  )
}