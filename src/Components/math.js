export const convertSecondsToMinutes = seconds => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedHrs = hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : '';
  const formattedMins = mins.toString().padStart(2, '0');
  const formattedSecs = secs.toString().padStart(2, '0');

  return `${formattedHrs}${formattedMins}:${formattedSecs}`;
};
