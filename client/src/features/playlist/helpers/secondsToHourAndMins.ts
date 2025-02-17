const secondsToHourAndMins = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  let str = '';

  if (mins > 60) {
    str += Math.floor(mins / 60) + ' hr ';
  }

  str += (mins % 60) + ' min';

  return str;
};

export default secondsToHourAndMins;