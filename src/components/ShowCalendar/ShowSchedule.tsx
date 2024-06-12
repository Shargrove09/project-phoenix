import React, { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";

import "./ShowSchedule.scss";
import { Box } from "@mui/system";

interface Props {
  onDateSelect: (selectedDate: Date) => void;
}

const ShowSchedule = (props: Props) => {
  const { onDateSelect } = props;
  const [value, setValue] = useState<Date | null>(new Date());

  const handleDateSelect = (selectedDate: Date) => {
    setValue(selectedDate);
    // Selects shows based on date
    onDateSelect(selectedDate);
  };

  return (
    <>
      <DateInput
        className="showSchedule"
        value={value}
        onChange={(selectedDate: Date | null) => handleDateSelect(selectedDate as Date)}
        label=""
        placeholder="Select a day to view shows scheduled to air "
        hideOutsideDates
      />
    </>
  );
};

export default ShowSchedule;

