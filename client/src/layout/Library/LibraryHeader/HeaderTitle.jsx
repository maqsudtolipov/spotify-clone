import styles from './HeaderTitle.module.scss';
import { RiAddLargeFill, RiArchiveStackLine } from 'react-icons/ri';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon.jsx';

const HeaderTitle = ({ isCollapsed, onCollapse }) => {
  // INFO: Collapse hides "Your Library" text and "+" buttons
  return (
    <div
      className={`${styles.title} ${isCollapsed ? styles.titleCollapsed : ''}`}
    >
      <div className={styles.content} onClick={onCollapse}>
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
