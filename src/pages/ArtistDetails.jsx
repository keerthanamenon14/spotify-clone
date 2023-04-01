import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader,RelatedSongs } from "../components"
import { useGetArtistDetailsQuery} from "../redux/services/shazamCore"
import { useEffect, useState } from "react";

const ArtistDetails = () => 
{
    const {id:artistId} = useParams();
    const {activeSong, isPlaying} = useSelector((state)=>state.player)
    const {data: artistData, isFetching: isFetchingArtistsDetails, error} = useGetArtistDetailsQuery(artistId) 
    const [lyrics, setLyrics] = useState("")

    console.log(artistData)
    console.log(artistId);
    
    if(isFetchingArtistsDetails){
        return <Loader title="Loading Artist details"></Loader>
    }

    if(error) return <Error/>


    return(
        <div className="flex flex-col">
            <DetailsHeader artistId= {artistId} artistData={artistData}/>
            {/* <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            /> */}
        </div>
    )
}
export default ArtistDetails;
