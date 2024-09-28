import React from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface DateInputProps {
  startDate: Date;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date | null) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <Input
          type="date"
          value={format(startDate, "yyyy-MM-dd")}
          onChange={(e) => onStartDateChange(new Date(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date (Optional)
        </label>
        <Input
          type="date"
          value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
          onChange={(e) =>
            onEndDateChange(e.target.value ? new Date(e.target.value) : null)
          }
          className="mt-1"
        />
      </div>
    </>
  );
};
