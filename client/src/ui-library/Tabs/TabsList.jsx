import styles from './Tabs.module.scss';
import ArrowButton from './ArrowButton.jsx';
import { useEffect, useRef, useState } from 'react';

const TabsList = ({ children, ...rest }) => {
  const [showRightArrow, setshowRightArrow] = useState();
  const [showLeftArrow, setShowLeftArrow] = useState();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    const eventListener = () => {
      const differenceRight =
        el.scrollWidth - el.getBoundingClientRect().width - el.scrollLeft;
      console.log(
        el.scrollWidth,
        el.getBoundingClientRect().width,
        el.scrollLeft,
      );

      if (differenceRight >= 10) {
        setshowRightArrow(true);
      } else {
        setshowRightArrow(false);
      }

      if (el.scrollLeft >= 10) {
        setShowLeftArrow(true);
      } else {
        setShowLeftArrow(false);
      }
    };

    el.addEventListener('scroll', eventListener);
    return () => {
      el.removeEventListener('scroll', eventListener);
    };
  }, []);

  return (
    <div className="relative" {...rest}>
      <div className={styles.tabsList} ref={ref}>
        {children}
      </div>

      {showLeftArrow && <ArrowButton position="left" />}
      {showRightArrow && <ArrowButton position="right" />}
    </div>
  );
};

export default TabsList;
