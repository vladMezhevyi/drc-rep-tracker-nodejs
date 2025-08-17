export type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

export const getMaxAge = (age: number, unit: TimeUnit): number => {
  const unitToMs: Record<TimeUnit, number> = {
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    weeks: 1000 * 60 * 60 * 24 * 7,
    months: 1000 * 60 * 60 * 24 * 30, // Approximate
    years: 1000 * 60 * 60 * 24 * 365 // Approximate
  };

  return age * unitToMs[unit];
};
