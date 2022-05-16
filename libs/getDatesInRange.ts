export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const start = new Date(new Date(startDate).setHours(0, 0, 0, 0));
  const end = new Date(new Date(endDate).setHours(0, 0, 0, 0));

  const date = new Date(start.getTime());
  const dates = [];

  while (date <= end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
