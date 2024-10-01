export const secondsToHumanReadable = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let humanReadable = "";

  if (hours > 0) {
    humanReadable += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    humanReadable += `${minutes}m `;
  }
  if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
    humanReadable += `${remainingSeconds}s`;
  }

  return humanReadable.trim();
};
