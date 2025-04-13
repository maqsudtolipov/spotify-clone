import spinnerSvg from '../../assets/icons/spinner.svg';

const LoadingScreen = () => {
  return (
    <div className="h-full flex items-center justify-center text-3xl">
      <img
        src={spinnerSvg}
        alt="Loading spinner"
        className="size-16 bg-transparent"
      />
    </div>
  );
};

export default LoadingScreen;
