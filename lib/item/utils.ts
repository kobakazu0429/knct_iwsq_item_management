import { match } from "ts-pattern";
import { customAlphabet } from "nanoid";
import {
  parseISO,
  getYear,
  lastDayOfMonth,
  isAfter,
  closestTo,
  set,
} from "date-fns";
import { format } from "date-fns-tz";
import { type ItemSchema } from "./index";

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

export const formatDate = (isoDate: string) => {
  return format(parseISO(isoDate), "yyyy/MM/dd HH:mm:ss", {
    timeZone: "Asia/Tokyo",
  });
};

export const formatStatus = (status: ItemSchema["status"]): string => {
  return match(status)
    .with("verifying", () => "確認待ち")
    .with("keeping", () => "保管中")
    .with("removed", () => "撤去済み")
    .with("removing", () => "撤去待ち")
    .exhaustive();
};

export const formatChiefEmailVerified = (
  verified: ItemSchema["chief_email_verified"]
): string => {
  return match(verified)
    .with(true, () => "確認済み")
    .with(false, () => "確認中")
    .exhaustive();
};
