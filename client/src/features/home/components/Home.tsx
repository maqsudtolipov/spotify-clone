import styles from './Home.module.scss';
import { useEffect, useState } from 'react';
import GradientBackground from '../../../ui/GradientBackground/GradientBackground.tsx';
import CardsList from '../../../ui/CardsList/CardsList.tsx';
import Welcome from './Welcome.tsx';
import axios from '../../../axios/axios';

const Home = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [newestSongs, setNewestSongs] = useState();
  const [recommendedArtists, setRecommendedArtists] = useState();
  const [recommendedPlaylists, setRecommendedPlaylists] = useState();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          topRes,
          newestRes,
          recommendedArtistsRes,
          recommendedPlaylistsRes,
        ] = await Promise.all([
          axios.get('songs/top'),
          axios.get('songs/newest'),
          axios.get('artists/recommended'),
          axios.get('playlists/recommended'),
        ]);

        setTopSongs(topRes.data.songs);
        setNewestSongs(newestRes.data.songs);
        setRecommendedArtists(recommendedArtistsRes.data.artists);
        setRecommendedPlaylists(recommendedPlaylistsRes.data.playlists);
      } catch (err) {
        console.error('Failed to fetch home screen data:', err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="min-h-full">
      <GradientBackground className={styles.home} color={'#485133'}>
        {/*<History handleNewColor={handleNewColor} />*/}
        <div className="flex flex-col gap-4">
          {/*<Welcome />*/}

          <CardsList
            title="Recommended Artists"
            shrink={true}
            items={recommendedArtists}
            type="artist"
          />
          <CardsList
            title="Top Picks for you"
            items={recommendedPlaylists}
            type="playlist"
            shrink={true}
          />
          <CardsList
            title="Most Popular"
            shrink={true}
            items={topSongs}
            type="song"
          />
          <CardsList
            title="New Releases"
            shrink={true}
            items={newestSongs}
            type="song"
          />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Home;
