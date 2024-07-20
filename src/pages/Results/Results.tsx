import { useEffect, useState } from "react";
import AnimeList from "../../components/AnimeList";
import { useSearchContext } from "../../context/useSearchContext"; //Wrap imports in curly braces when they aren't default exports
import { Box, Text } from "@mantine/core";
import ResultsViewSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import ListView from "../../components/ListView/ListView";

import classes from "./Results.module.scss";

const Results = () => {
  const { animeData, setAnimeData, setSearchTerm, searchTerm } =
    useSearchContext();

  const [resultsExists, setResultsExists] = useState(true);

  // Default view format for results is grid format
  const [showDetailedView, setShowDetailedView] = useState(false);

  useEffect(() => {
    if (animeData === undefined || animeData.length === 0) {
      try {
        const storedData = localStorage.getItem("animeSearchResultData");
        const lastSearchTerm = localStorage.getItem("lastSearchTerm");
        const parsedData = storedData ? JSON.parse(storedData) : [];
        const parsedSearchTerm = lastSearchTerm
          ? JSON.parse(lastSearchTerm)
          : "Oops";
        setAnimeData(parsedData);
        setSearchTerm(parsedSearchTerm);
        setResultsExists(true);
      } catch (error) {
        console.error("Error occured in Results", error);
        setResultsExists(false);
      }
    }
  }, []);

  console.log("Search Term: ", searchTerm);

  return (
    <Box className={classes.results__content}>
      <Box className={classes.results__searchResults_header} py={40}>
        <Text component={"h2"} variant="h5">
          Search Results for: '{searchTerm}'
        </Text>
        <ResultsViewSwitch
          setShowDetailedView={setShowDetailedView}
          showDetailedView={showDetailedView}
        />
      </Box>

      {(resultsExists && !showDetailedView && (
        <AnimeList data={animeData} />
      )) || <ListView animeList={animeData} />}
    </Box>
  );
};

export default Results;
