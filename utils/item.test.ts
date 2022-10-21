import { parseISO } from "date-fns";
import { getNextExpiresDate } from "./item";

it("日付が7月末より前である時", () => {
  const date = parseISO("2022-04-01T00:00:00");
  const expiresDate = parseISO("2022-07-31T23:59:59");
  expect(getNextExpiresDate(date)).toEqual(expiresDate);
});

it("日付が7月末より後である時", () => {
  const date = parseISO("2022-09-01T00:00:00");
  const expiresDate = parseISO("2023-01-31T23:59:59");
  expect(getNextExpiresDate(date)).toEqual(expiresDate);
});
