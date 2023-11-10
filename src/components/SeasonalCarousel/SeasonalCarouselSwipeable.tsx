import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";

import "./SeasonalCarouselSwipeable.scss";
import { Anime } from "../../common/Anime";
import { ButtonBase } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface Props {
  shows: Anime[];
}

const SwipeableTextMobileStepper = ({ shows }: Props) => {
  const theme = useTheme();
  const { setSingle } = useSearchContext();
  const navigate = useNavigate();

  console.log("Shows: ", shows);

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = shows ? shows.length : 0;

  const handleNext = () => {
    // Loop back to begining of carousel
    if (activeStep === maxSteps - 1) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      // Loop back to end of carousel
      setActiveStep(maxSteps - 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleSeasonalShowClick = (show: Anime) => {
    console.log("Handling seasonal show-click");
    setSingle(show);
    localStorage.setItem("singleData", JSON.stringify(show));
    navigate("/single-view");
  };

  return (
    <Box sx={{ maxWidth: 300, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          cursor: "pointer",
        }}
      >
        <ButtonBase
          sx={{ cursor: "pointer" }}
          onClick={() => handleSeasonalShowClick(shows[activeStep])}
        >
          <Typography className="scarousel__show_title">
            {shows[activeStep].title ? shows[activeStep].title : "No Title"}
          </Typography>
        </ButtonBase>
      </Paper>

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {shows.map((step, index) => (
          <div key={step.title ?? 0}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "auto",
                  display: "block",
                  maxWidth: 300,
                  overflow: "hidden",
                  width: "100%",
                }}
                src={step.images.jpg.large_image_url}
                alt={step.title ?? "Seasonal Show #" + index}
              />
            ) : undefined}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        variant="progress"
        nextButton={
          <Button size="small" onClick={handleNext} disabled={false}>
            {/* Next */}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft fontSize="large" />
            ) : (
              <KeyboardArrowRight fontSize="large" />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={false}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight fontSize="large" />
            ) : (
              <KeyboardArrowLeft fontSize="large" />
            )}
            {/* Back */}
          </Button>
        }
      />
    </Box>
  );
};

export default SwipeableTextMobileStepper;
