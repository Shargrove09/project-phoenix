import React, { useEffect, useContext, useState } from "react";
import AnimeList from "../components/AnimeList";
import { SearchContext } from "../context/search"; //Wrap imports in curly braces when they aren't default exports
import { Box, Typography } from "@material-ui/core";

const Results = () => {
  const search = useContext(SearchContext);
  const [dataExists, setDataExists] = useState(true);

  console.log("animeData from context", search.animeData);

  useEffect(() => {
    if (search.animeData === undefined || search.animeData.length === 0) {
      try {
        search.setData(JSON.parse(localStorage.getItem("myData")));
        setDataExists(true);
      } catch (error) {
        console.log(error);
        setDataExists(false);
      }
    }
  }, [search]);

  return (
    <Box mt={2}>
      {(dataExists && <AnimeList data={search.animeData} />) || (
        <Typography variant="h4">Data does not exist</Typography>
      )}
    </Box>
  );
};

export default Results;
