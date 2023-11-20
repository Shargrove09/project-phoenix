import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import { Grid, Switch } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { styled } from "@mui/material/styles";

interface Props {
  setShowDetailedView: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailedView: boolean;
}

const CustomGridIcon = styled(GridViewIcon)(({ theme }) => ({
  width: 32,
  height: 32,
  marginTop: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 30,
  padding: 5,
}));

const CustomListicon = styled(ListIcon)(({ theme }) => ({
  width: 32,
  height: 32,
  marginTop: 0,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 30,
  padding: 5,
}));

const MaterialUISwitch2 = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        content: "''",
        position: "absolute",
        width: 34, // Adjust the width
        height: 34, // Adjust the height
        left: 0,
        top: 0,
        borderRadius: "50%", // Makes it a circle
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 64,
    height: 64,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url${GridViewIcon}`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function ResultsViewSwitch(props: Props) {
  const { setShowDetailedView, showDetailedView } = props;

  const toggleView = () => {
    setShowDetailedView((showDetailedView) => !showDetailedView);
  };

  return (
    <div>
      <MaterialUISwitch2
        checked={showDetailedView}
        onChange={toggleView}
        color="primary"
        icon={<CustomGridIcon />}
        checkedIcon={<CustomListicon />}
      />
    </div>
  );
}
