import { getWeekRangeFromDate, isDateBetween } from "../helpers";

describe("helpers", () => {
  describe("getWeekRangeFromDate", () => {
    it("should return the week range correctly", () => {
      const res = getWeekRangeFromDate(new Date(2024, 5, 19)); // Wednesday, June 19, 2024

      const end = new Date(2024, 5, 23);
      end.setHours(23, 59, 59, 999);

      expect(res).toEqual({
        start: new Date(2024, 5, 17), // Monday, June 17, 2024
        end: end,
      });
    });
  });

  describe("isDateBetween", () => {
    it("should return true if the date is between the start and end dates", () => {
      const date = new Date(2024, 5, 19); // Wednesday, June 19, 2024
      const start = new Date(2024, 5, 17); // Monday, June 17, 2024
      const end = new Date(2024, 5, 23); // Sunday, June 23, 2024

      expect(isDateBetween({ start, end }, date)).toBe(true);
    });

    it("should return false if the date is before the start date", () => {
      const date = new Date(2024, 5, 16); // Tuesday, June 16, 2024
      const start = new Date(2024, 5, 17); // Monday, June 17, 2024
      const end = new Date(2024, 5, 23); // Sunday, June 23, 2024

      expect(isDateBetween({ start, end }, date)).toBe(false);
    });

    it("should return false if the date is after the end date", () => {
      const date = new Date(2024, 5, 24); // Monday, June 24, 2024
      const start = new Date(2024, 5, 17); // Monday, June 17, 2024
      const end = new Date(2024, 5, 23); // Sunday, June 23, 2024

      expect(isDateBetween({ start, end }, date)).toBe(false);
    });
  });
});
