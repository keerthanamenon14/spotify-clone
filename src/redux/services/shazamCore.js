import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamAPI = createApi({
    reducerPath: 'shazamApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) =>{
            headers.set('X-RapidAPI-Key','e9e92a2e84msh344656f31d0586ep141a11jsn1f41397af6eb')
            return headers;
        }
    }),
    endpoints : (builder) =>({
        getTopCharts : builder.query({query:() => '/charts/track'}),
        getSongDetails: builder.query({query:(songid) => `shazam-songs/get-details?id=${songid}`})
    }),
})

export const {useGetTopChartsQuery, useGetSongDetailsQuery} = shazamAPI