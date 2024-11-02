import styles from './FilterOption.module.scss';

const FilterOption = ({ name }) => {
  return <button className={styles.filterOption}>{name}</button>;
};

export default FilterOption;
