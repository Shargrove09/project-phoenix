import React, { useEffect, useState } from "react";
import AnimeList from "../../components/AnimeList";
import { useSearchContext } from "../../context/useSearchContext"; //Wrap imports in curly braces when they aren't default exports
import { Box } from "@mui/material";
import UseResultsSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import Typography from "@mui/material/Typography";
import "./Results.scss";
import ListView from "../../components/ListView/ListView";

const Results = () => {
  const { animeData, setAnimeData, searchTerm } = useSearchContext();

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

  return (
    <Box
      className="results__content"
      mt={2}
      sx={{ justifyContent: "center", display: "flex" }}
    >
      <div className="results__searchResults_header">
        <Typography variant="h5" component={"h2"}>
          Search Results for: '{searchTerm}'
        </Typography>
        <div className="results__viewpill">
          <UseResultsSwitch setShowDetailedView={setShowDetailedView} />
        </div>
      </div>

      {(resultsExists && !showDetailedView && (
        <AnimeList data={animeData} />
      )) || <ListView animeList={animeData} />}
    </Box>
  );
};

export default Results;
