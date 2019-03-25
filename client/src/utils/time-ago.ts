export default function timeAgo(date: Date): String {
  const today = new Date();
  const seconds = Math.round((today.valueOf() - date.valueOf()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (minutes < 60) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}h`;
  }

  return `${days}d`;
}
