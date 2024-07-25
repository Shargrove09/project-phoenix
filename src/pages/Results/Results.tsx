import { useEffect, useState } from "react";
import AnimeList from "../../components/AnimeList";
import { useSearchContext } from "../../context/useSearchContext"; //Wrap imports in curly braces when they aren't default exports
import { Avatar, Box, HoverCard, Text } from "@mantine/core";
import ResultsViewSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import ListView from "../../components/ListView/ListView";

import classes from "./Results.module.scss";
import { IconInfoCircle } from "@tabler/icons-react";

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
      <Box className={classes.results__searchResultsHeader} py={40}>
        <Text fw={700} size="lg">
          Results for: '{searchTerm}'
        </Text>
        <Box
          className={classes.results__viewpillContainer}
          mb={20}
          top={"3rem"}
          pos={"absolute"}
          right={{ md: "5rem" }}
        >
          <ResultsViewSwitch
            setShowDetailedView={setShowDetailedView}
            showDetailedView={showDetailedView}
          />
          <HoverCard>
            <HoverCard.Target>
              <Avatar size={"sm"} ml={10}>
                <IconInfoCircle />
              </Avatar>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Box>
                <Text> Toggle between list and grid view</Text>
              </Box>
            </HoverCard.Dropdown>
          </HoverCard>
        </Box>
      </Box>

      {(resultsExists && !showDetailedView && (
        <AnimeList data={animeData} />
      )) || <ListView animeList={animeData} />}
    </Box>
  );
};

export default Results;
