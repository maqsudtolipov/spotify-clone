import spinnerSvg from '../../assets/icons/spinner.svg';

const FullSpinner = () => {
  return (
    <div className="h-screen w-screen bg-neutral-800 flex items-center justify-center select-none">
      <img src={spinnerSvg} alt="Loading spinner" className="size-16 opacity-20" />
    </div>
  );
};

export default FullSpinner;