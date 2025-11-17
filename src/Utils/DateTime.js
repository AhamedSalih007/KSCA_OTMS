export const parseDotNetDate = dotNetDateString => {
  // Extract the numeric timestamp
  const timestamp = parseInt(
    dotNetDateString?.replace(/\/Date\((\d+)\)\//, '$1'),
    10,
  );

  // Create a Date object
  const date = new Date(timestamp);

  // Format as desired
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
  const dateString = date.toLocaleDateString(); // e.g., "11/12/2025"

  return {dateString, timeString};
};
