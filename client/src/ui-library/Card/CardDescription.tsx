import styles from './Card.module.scss';

interface CardDescriptionProps {
  name: string;
  description: string;
}

const CardDescription = ({ name, description }: CardDescriptionProps) => {
  return (
    <div>
      <span className={styles.name}>{name}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

export default CardDescription;
