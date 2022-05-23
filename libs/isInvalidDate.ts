export function isInvalidDate(date: Date): boolean {
  return Number.isNaN(date.getTime());
}
