import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({artistId, artistData, songData}) => 
{
  const [details, setDetails] = useState('')
  let id = ''
  const artistDetailsPath = artistData?.data[0].attributes

  useEffect(()=>{
    let obj = songData?.resources["shazam-songs"]
    for(const key in obj){
      id= obj[key].id
      console.log(id);
      setDetails(obj[key].attributes)
    }
  },[songData])

  return(
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
      <div className="absolute inset-0 flex items-center">
        <img alt="art" 
          src={artistId? artistDetailsPath?.artwork?.url.replace('{w}','500').replace('{h}','500')
          : details && details.images.coverArt}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{artistId ? artistDetailsPath?.name : details?.title}</p>
          {
            !artistData && (
              <Link to={`/artists/${id}`}>
                <p className="text-base text-gray-400 mt-2">{details?.artist}</p>
              </Link>
            )
          }
          <p className="text-base text-gray-400 mt-2">{details?.genres?.primary}</p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24"/>
    </div>
  </div>
)
}

export default DetailsHeader;
