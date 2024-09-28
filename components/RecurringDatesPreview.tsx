import React from "react";
import { format } from "date-fns";

interface RecurringDatesPreviewProps {
  dates: Date[];
}

export const RecurringDatesPreview: React.FC<RecurringDatesPreviewProps> = ({
  dates,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Recurring Dates</h3>
      <ul className="max-h-40 overflow-y-auto">
        {dates.map((date, index) => (
          <li key={index}>{format(date, "MMMM d, yyyy")}</li>
        ))}
      </ul>
    </div>
  );
};
