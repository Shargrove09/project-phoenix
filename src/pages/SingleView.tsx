import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleAnime from "../components/SingleAnime";
import { useSearchContext } from "../context/useSearchContext";
import { Anime } from "../common/Anime";

const SingleView = () => {
  const { singleData, setSingle, search } = useSearchContext();
  const [dataExists, setDataExists] = useState(false);

  useEffect(() => {
    if (singleData === undefined || Object.keys(singleData).length === 0) {
      try {
        const localStorageSingleData: Anime = JSON.parse(
          localStorage.getItem("singleData")
        );
        setSingle(localStorageSingleData);
        setDataExists(true);
      } catch (error) {
        console.error("Error Occured in Single View: ", error);
        setDataExists(false);
      }
    } else {
      setDataExists(true);
    }
  }, [search]);

  return (
    <div>
      {(dataExists && <SingleAnime anime={singleData} />) || (
        <Typography variant="h4" component="h2">
          No Data Exists
        </Typography>
      )}
    </div>
  );
};

export default SingleView;