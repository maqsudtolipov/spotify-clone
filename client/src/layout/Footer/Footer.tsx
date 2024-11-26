import styles from './Footer.module.scss';
import { RiGithubFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>Made w️ith ❤️ my Maqsud. *For learning purposes only.</span>
      <a href="https://github.com/maqsudtolipov/spotify-clone/" target="_blank">
        <RiGithubFill />
      </a>
    </footer>
  );
};

export default Footer;
