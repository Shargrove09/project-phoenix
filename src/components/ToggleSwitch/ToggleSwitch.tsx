import React from "react";
import {
  ActionIcon,
  Avatar,
  Box,
  HoverCard,
  rem,
  Switch,
  Text,
} from "@mantine/core";
import { IconInfoCircle, IconLayoutGrid, IconList } from "@tabler/icons-react";

import classes from "./ToggleSwitch.module.scss";

interface Props {
  setShowDetailedView: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailedView: boolean;
}

export default function ResultsViewSwitch(props: Props) {
  const { setShowDetailedView, showDetailedView } = props;

  const toggleView = () => {
    setShowDetailedView((showDetailedView) => !showDetailedView);
  };

  return (
    <>
      <Switch
        checked={showDetailedView}
        className={classes.toggleSwitch__desktop}
        onChange={toggleView}
        size={"lg"}
        thumbIcon={
          showDetailedView ? (
            <IconList
              color={"blue"}
              style={{ width: rem(18), height: rem(18) }}
            />
          ) : (
            <IconLayoutGrid
              color={"blue"}
              style={{ width: rem(18), height: rem(18) }}
            />
          )
        }
      />
      <Switch
        checked={showDetailedView}
        className={classes.toggleSwitch__mobile}
        onChange={toggleView}
        size={"sm"}
        thumbIcon={
          showDetailedView ? (
            <IconList
              color={"blue"}
              style={{ width: rem(12), height: rem(12) }}
            />
          ) : (
            <IconLayoutGrid
              color={"blue"}
              style={{ width: rem(12), height: rem(12) }}
            />
          )
        }
      />
    </>
  );
}
