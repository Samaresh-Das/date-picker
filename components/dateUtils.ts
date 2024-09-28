import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
  isBefore,
  isSameDay,
  getDay,
  lastDayOfMonth,
  setDate,
} from "date-fns";
import { RecurrenceType, DayOfWeek } from "./DatePicker";

interface GenerateRecurringDatesProps {
  startDate: Date;
  endDate: Date | null;
  recurrenceType: RecurrenceType;
  recurrenceInterval: number;
  selectedDays: DayOfWeek[];
  monthlyOption: "dayOfMonth" | "dayOfWeek";
  selectedDayOfMonth: number;
  selectedWeekOfMonth: number;
}

export const generateRecurringDates = ({
  startDate,
  endDate,
  recurrenceType,
  recurrenceInterval,
  selectedDays,
  monthlyOption,
  selectedDayOfMonth,
  selectedWeekOfMonth,
}: GenerateRecurringDatesProps): Date[] => {
  if (recurrenceType === "none") {
    return [startDate];
  }

  let currentDate = new Date(startDate);
  const dates: Date[] = [currentDate];
  const dayMap: { [key in DayOfWeek]: number } = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  while ((!endDate || isBefore(currentDate, endDate)) && dates.length < 100) {
    let nextDate: Date;

    switch (recurrenceType) {
      case "daily":
        nextDate = addDays(currentDate, recurrenceInterval);
        break;
      case "weekly":
        nextDate = addWeeks(currentDate, recurrenceInterval);
        if (selectedDays.length > 0) {
          while (!selectedDays.includes(getDayOfWeek(nextDate))) {
            nextDate = addDays(nextDate, 1);
          }
        }
        break;
      case "monthly":
        if (monthlyOption === "dayOfMonth") {
          nextDate = addMonths(currentDate, recurrenceInterval);
          nextDate = setDate(nextDate, selectedDayOfMonth);
        } else {
          nextDate = addMonths(currentDate, recurrenceInterval);
          const lastDay = lastDayOfMonth(nextDate);
          let targetDay = setDate(nextDate, 1);
          while (getDay(targetDay) !== dayMap[selectedDays[0]]) {
            targetDay = addDays(targetDay, 1);
          }
          targetDay = addWeeks(targetDay, selectedWeekOfMonth - 1);
          if (isBefore(targetDay, nextDate) || isAfter(targetDay, lastDay)) {
            nextDate = addMonths(nextDate, 1);
            continue;
          }
          nextDate = targetDay;
        }
        break;
      case "yearly":
        nextDate = addYears(currentDate, recurrenceInterval);
        break;
      default:
        throw new Error("Invalid recurrence type");
    }

    if (endDate && isAfter(nextDate, endDate)) break;

    if (!dates.some((date) => isSameDay(date, nextDate))) {
      dates.push(nextDate);
    }
    currentDate = nextDate;
  }

  return dates;
};

const getDayOfWeek = (date: Date): DayOfWeek => {
  const days: DayOfWeek[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[getDay(date)];
};
