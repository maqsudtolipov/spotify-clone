import styles from '../../../../ui/ImageHeader/ImageHeader.module.scss';
import { User } from '../../../user/userTypes.ts';

interface UserHeaderProps {
  data: User;
  bgColor: string;
  textColor: string;
}

const UserHeader = ({ data, bgColor, textColor }: UserHeaderProps) => {
  const gradient = {
    background: `linear-gradient(${bgColor}, ${bgColor}), linear-gradient(#171717, #171717)`,
  };

  const statistics = [
    { name: 'Followers', value: data.followersCount },
    { name: 'Following', value: data.followingsCount },
  ];

  return (
    <header className={styles.header} style={gradient}>
      <img
        className={`${styles.img} ${styles.imgRounded}`}
        src={data.img.url}
        alt={data.name}
      />

      <div>
        <span className={styles.type}>User</span>
        <h1 className={styles.name} style={{ color: textColor }}>
          {data.name}
        </h1>

        <div className={styles.statistics}>
          {statistics && (
            <span>
              {`${statistics
                .map((data) => `${data.value} ${data.name}`)
                .join(' • ')}`}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
