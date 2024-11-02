import styles from './FilterOptions.module.scss';
import FilterOption from './FilterOption.jsx';

const options = ['Artists', 'Playlists', 'Podcasts'];

const FilterOptions = () => {
  return (
    <div className={styles.filterOptions}>
      {options.map((option) => (
        <FilterOption key={option} name={option} />
      ))}
    </div>
  );
};

export default FilterOptions;
