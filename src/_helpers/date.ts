export function toISOString(ukrainianDateString: string): string | null {
  const [day, month, year] = ukrainianDateString.split('.').map(Number);
  try {
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const isoString = date.toISOString();
    return isoString;
  } catch {
    return null;
  }
}
