import { customAlphabet } from "nanoid";
import { getYear, lastDayOfMonth, isAfter, closestTo, set } from "date-fns";

export const itemId = customAlphabet("abcdefhkmnpqrstwxyz", 9);

export const getNextExpiresDate = (currentDate: Date): Date => {
  const year = getYear(currentDate);
  const EXPIRES_MONTH = [1, 7] as const;
  const expiresDates = EXPIRES_MONTH.map((m) => [
    lastDayOfMonth(new Date(year, m - 1, 1)),
    lastDayOfMonth(new Date(year + 1, m - 1, 1)),
  ])
    .flat()
    .map((date) =>
      set(date, {
        hours: 23,
        minutes: 59,
        seconds: 59,
      })
    );

  return closestTo(
    currentDate,
    expiresDates.filter((date) => isAfter(date, currentDate))
  )!;
};
