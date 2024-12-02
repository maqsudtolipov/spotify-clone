import styles from './Footer.module.scss';
import { RiGithubFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>Made w️ith ❤️ by Maqsud. *For learning purposes only.</span>
      <div className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/artist">Artist</Link>
        <Link to="/playlist">Playlist</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <a href="https://github.com/maqsudtolipov/spotify-clone/" target="_blank">
        <RiGithubFill />
      </a>
    </footer>
  );
};

export default Footer;
