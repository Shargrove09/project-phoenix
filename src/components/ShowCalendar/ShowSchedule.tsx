import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

import "@mantine/dates/styles.css";

import classes from "./ShowSchedule.module.scss";

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
      <DatePickerInput
        className={classes.showSchedule}
        hideOutsideDates
        onChange={(selectedDate: Date | null) =>
          handleDateSelect(selectedDate as Date)
        }
        value={value}
        labelProps={{ ta: "center" }}
        style={{ textAlign: "center" }}
      />
    </>
  );
};

export default ShowSchedule;
