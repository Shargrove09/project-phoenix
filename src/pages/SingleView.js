import { Typography } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import SingleAnime from "../components/SingleAnime";
import { SearchContext } from "../context/search";

const SingleView = () => {
  const search = useContext(SearchContext);
  const [dataExists, setDataExists] = useState(true);
  console.log(
    "Data Search Single Data",
    search.singleData,
    search.singleData.length
  );
  useEffect(() => {
    console.log("Data Use Effect ran");

    if (
      search.singleData === undefined ||
      Object.keys(search.singleData).length === 0
    ) {
      try {
        search.setSingle(JSON.parse(localStorage.getItem("singleData")));
        console.log("Data SingleView Try statement executed");
        setDataExists(true);
      } catch (error) {
        console.log("ERROR STATEMENT", error);
        setDataExists(false);
      }
    }
    console.log(search.singleData);
  }, [search]);
  console.log("dataExists", dataExists);
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
