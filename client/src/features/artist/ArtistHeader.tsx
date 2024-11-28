import styles from './Artist.module.scss';

const ArtistHeader = () => {
  const randomHexColor =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '7f';

  return (
    <div
      className={styles.artistHeader}
      style={{
        background: `linear-gradient(${randomHexColor}, ${randomHexColor}), linear-gradient(#171717, #171717)`,
      }}
    >
      red
    </div>
  );
};

export default ArtistHeader;
