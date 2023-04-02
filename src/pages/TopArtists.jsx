import React from 'react';
import { useSelector } from 'react-redux';

import { ArtistCard, Loader, Error } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;
  
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((track, i) => (
          <ArtistCard
            key={track.key}
            track={track}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;