import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader,RelatedSongs } from "../components"
import { setActiveSong,playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongsRelatedQuery } from "../redux/services/shazamCore";
import { logo } from "../assets";
import { useEffect, useState } from "react";

const SongDetails = () => 
{
    const {songid} = useParams();
    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state)=>state.player)
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery(songid) 
    const {data, isFetching : isFetchingRelatedSongs, error} = useGetSongsRelatedQuery(songid)
    const [lyrics, setLyrics] = useState("")

    console.log(songData)
    useEffect(()=>{
        let musicObj 
        songData ? musicObj =  songData?.resources?.lyrics : setLyrics("No Lyrics found")
        if(musicObj){
        for(const key in musicObj){
            setLyrics(musicObj[key].attributes?.text)
        }}
    },[songData])

    
    if(isFetchingRelatedSongs || isFetchingSongDetails){
        return <Loader title="Seaching song details"></Loader>
    }

    if(error) return <Error/>

    const handlePauseClick = () =>{
        dispatch(playPause(false))
    }
    
    const handlePlayClick = (song, i) =>{
        dispatch(setActiveSong({song, data , i}))
        dispatch(playPause(true))
    }

    return(
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData}/>
            {activeSong && <div className="mb-10"> 
                <h2 className="text-white text-3xl font-bold">
                    Lyrics:
                </h2>
                <div className="mt-5">
                    <p className="text-base my-1 text-white">{lyrics}</p>
                </div>
            </div>}
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
export default SongDetails;
