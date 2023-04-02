import {useState, useEffect} from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Loader, Error, SongCard } from '../components';

const AroundYou = () => {
    const [country,setCountry] = useState('')
    const [loading,setLoading] = useState(true)
    const {isActiveSong, isPlaying} = useSelector((state) => state.player)
    console.log(country);
    useEffect(()=>{
        axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=065c3f5c7a6e42f8abc64cfb9a918aec`)
        .then(
            (res) => setCountry(res?.data.country.name)
        ).catch(
            (error) => console.log(error)
        ).finally(
            () => setLoading(false)
        )
    },[country])

    return(
        <div>

        </div>
    )
}

export default AroundYou;
