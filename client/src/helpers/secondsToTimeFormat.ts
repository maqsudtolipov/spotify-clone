const secondsToTimeFormat = (seconds: number) => {
  if (seconds < 0) {
    console.log('Seconds must be a positive number');
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default secondsToTimeFormat;
