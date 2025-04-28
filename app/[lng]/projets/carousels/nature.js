import Elipsed from '../../components/Carousels/elipsed'

//Get a nombre of random images from topic
async function getData(topic, nbr, apiKey) {
  try {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${topic}&per_page=${nbr}`, {
      headers: { 
        Authorization: apiKey 
      },
    });
    const response = await data.json();
    // console.log('Data', response);
    if (data.ok && response) {
    return response;
    }
  }catch(error){
    console.log('Error', error)
  };
  return null;
}

export default async function Nature() {
  const dataImg = await getData('Nature', '3',  process.env.PEXELS_API_KEY);
  return (
    <>
      {dataImg['photos'].map((photo) => (
        <div key={photo.id}>
          <Elipsed 
            img={photo.src.original} 
            photographer={photo.photographer} 
            alt={photo.alt}
          />
        </div>
      ))}
    </>  
  )
}
