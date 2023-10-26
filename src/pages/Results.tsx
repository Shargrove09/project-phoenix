import React, { useEffect, useContext, useState } from "react";
import AnimeList from "../components/AnimeList";
import { useSearchContext } from "../context/useSearchContext"; //Wrap imports in curly braces when they aren't default exports
import { Box, Typography } from "@material-ui/core";

const Results = () => {
  const { animeData, setData, search } = useSearchContext();
  const [dataExists, setDataExists] = useState(true);

  console.log("animeData from context", animeData);

  useEffect(() => {
    if (animeData === undefined || animeData.length === 0) {
      try {
        setData(JSON.parse(localStorage.getItem("myData")));
        setDataExists(true);
      } catch (error) {
        console.log("Error occured in Results", error);
        setDataExists(false);
      }
    }
  }, [search]);

  return (
    <Box mt={2}>
      {(dataExists && <AnimeList data={animeData} />) || (
        <Typography variant="h4">Data does not exist</Typography>
      )}
    </Box>
  );
};

export default Results;
