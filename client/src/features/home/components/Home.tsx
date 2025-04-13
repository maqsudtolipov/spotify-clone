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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [topRes, newestRes, recommendedArtistsRes] = await Promise.all([
          axios.get('songs/top'),
          axios.get('songs/newest'),
          axios.get('artists/recommended'),
        ]);

        setTopSongs(topRes.data.songs);
        setNewestSongs(newestRes.data.songs);
        setRecommendedArtists(recommendedArtistsRes.data.artists);
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
        <div className="flex flex-col gap-8">
          <Welcome />

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
          <CardsList
            title="Your Favourite Artists"
            shrink={true}
            items={recommendedArtists}
            type="artist"
          />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Home;
