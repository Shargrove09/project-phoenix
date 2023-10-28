import React, { useEffect, useState } from "react";
import AnimeList from "../../components/AnimeList";
import { useSearchContext } from "../../context/useSearchContext"; //Wrap imports in curly braces when they aren't default exports
import { Box, Typography } from "@material-ui/core";
import { Switch } from "@mui/base/Switch";
import UseResultsSwitch from "../../components/ToggleSwitch/ToggleSwitch";

import "./Results.scss";
import ListView from "../../components/ListView/ListView";

const Results = () => {
  const { animeData, setAnimeData } = useSearchContext();

  const [resultsExists, setResultsExists] = useState(true);

  // Default view format for results is grid format
  const [showDetailedView, setShowDetailedView] = useState(false);

  useEffect(() => {
    if (animeData === undefined || animeData.length === 0) {
      try {
        setAnimeData(JSON.parse(localStorage.getItem("animeSearchResultData")));
        setResultsExists(true);
      } catch (error) {
        console.log("Error occured in Results", error);
        setResultsExists(false);
      }
    }
  }, []);

  console.log("Show Detailed", showDetailedView);

  return (
    <Box className="results__content" mt={2}>
      <div className="results__viewpill">
        <UseResultsSwitch setShowDetailedView={setShowDetailedView} />
      </div>
      {(resultsExists && !showDetailedView && (
        <AnimeList data={animeData} />
      )) || <ListView animeList={animeData} />}
    </Box>
  );
};

export default Results;
