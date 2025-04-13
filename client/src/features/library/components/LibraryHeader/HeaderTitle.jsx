import styles from './HeaderTitle.module.scss';
import { RiAddLargeFill, RiArchiveStackLine } from 'react-icons/ri';
import IconButton from '../../../../ui/IconButton/IconButton.tsx';
import { createPlaylist } from '../../../playlist/playlistThunks.ts';
import { useAppDispatch } from '../../../../redux/hooks.ts';

// INFO: Collapse hides "Your Library" text and "+" buttons
const HeaderTitle = ({ isCollapsed, onCollapse }) => {
  const dispatch = useAppDispatch();

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist());
  };

  return (
    <div
      className={`${styles.title} ${isCollapsed ? styles.titleCollapsed : ''}`}
    >
      <div className={styles.content} onClick={onCollapse}>
        <RiArchiveStackLine />
        <span>Your Library</span>
      </div>

      <IconButton onClick={handleCreatePlaylist}>
        <RiAddLargeFill />
      </IconButton>
    </div>
  );
};

export default HeaderTitle;
