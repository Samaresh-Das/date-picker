import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RecurrenceType, DayOfWeek } from "./DatePicker";

interface RecurrenceOptionsProps {
  recurrenceType: RecurrenceType;
  recurrenceInterval: number;
  selectedDays: DayOfWeek[];
  monthlyOption: "dayOfMonth" | "dayOfWeek";
  selectedDayOfMonth: number;
  selectedWeekOfMonth: number;
  onRecurrenceTypeChange: (type: RecurrenceType) => void;
  onRecurrenceIntervalChange: (interval: number) => void;
  onSelectedDaysChange: (days: DayOfWeek[]) => void;
  onMonthlyOptionChange: (option: "dayOfMonth" | "dayOfWeek") => void;
  onSelectedDayOfMonthChange: (day: number) => void;
  onSelectedWeekOfMonthChange: (week: number) => void;
}

export const RecurrenceOptions: React.FC<RecurrenceOptionsProps> = ({
  recurrenceType,
  recurrenceInterval,
  selectedDays,
  monthlyOption,
  selectedDayOfMonth,
  selectedWeekOfMonth,
  onRecurrenceTypeChange,
  onRecurrenceIntervalChange,
  onSelectedDaysChange,
  onMonthlyOptionChange,
  onSelectedDayOfMonthChange,
  onSelectedWeekOfMonthChange,
}) => {
  const handleDaySelection = (day: DayOfWeek) => {
    onSelectedDaysChange(
      selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day]
    );
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recurrence
        </label>
        <Select
          onValueChange={(value) =>
            onRecurrenceTypeChange(value as RecurrenceType)
          }
          value={recurrenceType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a recurrence type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {recurrenceType !== "none" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Every
          </label>
          <div className="flex items-center mt-1">
            <Input
              type="number"
              min="1"
              value={recurrenceInterval}
              onChange={(e) =>
                onRecurrenceIntervalChange(parseInt(e.target.value, 10))
              }
              className="w-20 mr-2"
            />
            <span>{recurrenceType === "daily" ? "days" : recurrenceType}</span>
          </div>
        </div>
      )}
      {recurrenceType === "weekly" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">On</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {(
              ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as DayOfWeek[]
            ).map((day) => (
              <Button
                key={day}
                onClick={() => handleDaySelection(day)}
                variant={selectedDays.includes(day) ? "default" : "outline"}
                className="w-12"
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}
      {recurrenceType === "monthly" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Repeat on
          </label>
          <Select
            onValueChange={(value) =>
              onMonthlyOptionChange(value as "dayOfMonth" | "dayOfWeek")
            }
            value={monthlyOption}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a monthly option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dayOfMonth">Day of the month</SelectItem>
              <SelectItem value="dayOfWeek">Day of the week</SelectItem>
            </SelectContent>
          </Select>
          {monthlyOption === "dayOfMonth" && (
            <Input
              type="number"
              min="1"
              max="31"
              value={selectedDayOfMonth}
              onChange={(e) =>
                onSelectedDayOfMonthChange(parseInt(e.target.value, 10))
              }
              className="mt-2"
            />
          )}
          {monthlyOption === "dayOfWeek" && (
            <div className="mt-2 space-y-2">
              <Select
                onValueChange={(value) =>
                  onSelectedWeekOfMonthChange(parseInt(value, 10))
                }
                value={selectedWeekOfMonth.toString()}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select week of month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First</SelectItem>
                  <SelectItem value="2">Second</SelectItem>
                  <SelectItem value="3">Third</SelectItem>
                  <SelectItem value="4">Fourth</SelectItem>
                  <SelectItem value="5">Last</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ] as DayOfWeek[]
                ).map((day) => (
                  <Button
                    key={day}
                    onClick={() => handleDaySelection(day)}
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    className="w-12"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
