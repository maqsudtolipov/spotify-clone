import styles from './FilterOption.module.scss';

const FilterOption = ({ name }) => {
  return <div className={styles.filterOption}>{name}</div>;
};

export default FilterOption;
