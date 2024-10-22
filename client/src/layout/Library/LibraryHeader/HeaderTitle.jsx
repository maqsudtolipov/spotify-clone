import styles from './HeaderTitle.module.scss';
import { RiAddLargeFill, RiArchiveStackLine } from 'react-icons/ri';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon.jsx';

const HeaderTitle = () => {
  return (
    <div className={styles.title}>
      <div className={styles.content}>
        <RiArchiveStackLine />
        <span>Your Library</span>
      </div>

      <ButtonIcon>
        <RiAddLargeFill />
      </ButtonIcon>
    </div>
  );
};

export default HeaderTitle;
