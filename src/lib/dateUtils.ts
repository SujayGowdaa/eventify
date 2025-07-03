export function getDatesBetween(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  while (start <= end) {
    dates.push(start.toISOString().split('T')[0]); // YYYY-MM-DD
    start.setDate(start.getDate() + 1);
  }

  return dates;
}
