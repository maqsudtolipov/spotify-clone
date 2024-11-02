import styles from './FilterOption.module.scss';

const FilterOption = ({ name, index }) => {
  return (
    <button
      className={`${styles.filterOption} ${index === 0 ? styles.selected : ''}`}
    >
      {name}
    </button>
  );
};

export default FilterOption;
