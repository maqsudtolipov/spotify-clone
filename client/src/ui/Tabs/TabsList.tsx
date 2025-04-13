import styles from './TabsList.module.scss';
import ArrowButton from './ArrowButton.tsx';
import { ReactNode } from 'react';
import useScrollArrows from './hooks/useScrollArrows.ts';

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

const TabsList = ({ className, children }: TabsListProps) => {
  const {
    ref,
    showLeftArrow,
    showRightArrow,
    handleScrollRight,
    handleScrollLeft,
  } = useScrollArrows();

  return (
    <div className={styles.tabListWrapper}>
      <div className={`${styles.tabsList} ${className}`} ref={ref}>
        {children}
      </div>

      {showLeftArrow && (
        <ArrowButton position="left" onClick={handleScrollLeft} />
      )}
      {showRightArrow && (
        <ArrowButton position="right" onClick={handleScrollRight} />
      )}
    </div>
  );
};

export default TabsList;
