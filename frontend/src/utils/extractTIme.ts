export function extractTime(dateString: string) {
  const date = new Date(dateString);
  const hours = padZero(date.getUTCHours());
  const minutes = padZero(date.getUTCMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number) {
  return number.toString().padStart(2, "0");
}
