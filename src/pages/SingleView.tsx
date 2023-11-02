import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleAnime from "../components/SingleAnime";
import { useSearchContext } from "../context/useSearchContext";

const SingleView = () => {
  const { singleData, setSingle, search } = useSearchContext();
  const [dataExists, setDataExists] = useState(true);
  useEffect(() => {
    if (singleData === undefined || Object.keys(singleData).length === 0) {
      try {
        setSingle(JSON.parse(localStorage.getItem("singleData")));
        setDataExists(true);
      } catch (error) {
        setDataExists(false);
      }
    }
  }, [search]);
  return (
    <div>
      {(dataExists && <SingleAnime info={singleData} />) || (
        <Typography variant="h4" component="h2">
          No Data Exists
        </Typography>
      )}
    </div>
  );
};

export default SingleView;
