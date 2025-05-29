import styles from './Footer.module.scss';
import { RiGithubFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Shotcuts: space - play and pause, m - mute</p>
        <p>Made w️ith ❤️ by Maqsud. *For learning purposes only.</p>
      </div>

      <a href="https://github.com/maqsudtolipov/spotify-clone/" target="_blank">
        <RiGithubFill />
      </a>
    </footer>
  );
};

export default Footer;
