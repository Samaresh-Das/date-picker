"use client";

import React, { useState, useEffect } from "react";
import { DateInput } from "./DateInput";
import { generateRecurringDates } from "./dateUtils";
import { RecurringDatesPreview } from "./RecurringDatesPreview";
import { RecurrenceOptions } from "./RecurrenceOptions";

export type RecurrenceType = "none" | "daily" | "weekly" | "monthly" | "yearly";
export type DayOfWeek = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

const DatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>("none");
  const [recurrenceInterval, setRecurrenceInterval] = useState<number>(1);
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [monthlyOption, setMonthlyOption] = useState<
    "dayOfMonth" | "dayOfWeek"
  >("dayOfMonth");
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState<number>(1);
  const [selectedWeekOfMonth, setSelectedWeekOfMonth] = useState<number>(1);
  const [recurringDates, setRecurringDates] = useState<Date[]>([]);

  useEffect(() => {
    const dates = generateRecurringDates({
      startDate,
      endDate,
      recurrenceType,
      recurrenceInterval,
      selectedDays,
      monthlyOption,
      selectedDayOfMonth,
      selectedWeekOfMonth,
    });
    setRecurringDates(dates);
  }, [
    startDate,
    endDate,
    recurrenceType,
    recurrenceInterval,
    selectedDays,
    monthlyOption,
    selectedDayOfMonth,
    selectedWeekOfMonth,
  ]);

  return (
    <div className="p-4 border rounded-lg shadow-md w-6/12 mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Date Picker</h2>
      <div className="space-y-4">
        <DateInput
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <RecurrenceOptions
          recurrenceType={recurrenceType}
          recurrenceInterval={recurrenceInterval}
          selectedDays={selectedDays}
          monthlyOption={monthlyOption}
          selectedDayOfMonth={selectedDayOfMonth}
          selectedWeekOfMonth={selectedWeekOfMonth}
          onRecurrenceTypeChange={setRecurrenceType}
          onRecurrenceIntervalChange={setRecurrenceInterval}
          onSelectedDaysChange={setSelectedDays}
          onMonthlyOptionChange={setMonthlyOption}
          onSelectedDayOfMonthChange={setSelectedDayOfMonth}
          onSelectedWeekOfMonthChange={setSelectedWeekOfMonth}
        />
        <RecurringDatesPreview dates={recurringDates} />
      </div>
    </div>
  );
};

export default DatePicker;
