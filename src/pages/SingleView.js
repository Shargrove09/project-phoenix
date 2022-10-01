import { Typography } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import SingleAnime from "../components/SingleAnime";
import { SearchContext } from "../context/search";

const SingleView = () => {
  const search = useContext(SearchContext);
  const [dataExists, setDataExists] = useState(true);
  useEffect(() => {
    if (
      search.singleData === undefined ||
      Object.keys(search.singleData).length === 0
    ) {
      try {
        search.setSingle(JSON.parse(localStorage.getItem("singleData")));
        setDataExists(true);
      } catch (error) {
        setDataExists(false);
      }
    }
  }, [search]);
  return (
    <div>
      {(dataExists && <SingleAnime info={search.singleData} />) || (
        <Typography variant="h4" component="h2">
          No Data Exists
        </Typography>
      )}
    </div>
  );
};

export default SingleView;
