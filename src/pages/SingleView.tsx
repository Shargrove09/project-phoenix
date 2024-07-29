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
        const localStorageSingleData = localStorage.getItem("singleData");
        console.log("LocaslStorageSingleData", localStorageSingleData);
        const parsedLocalStorageSingleData: Anime = localStorageSingleData
          ? JSON.parse(localStorageSingleData)
          : {};
        console.log("Single ata:", parsedLocalStorageSingleData);
        setSingle(parsedLocalStorageSingleData);
      } catch (error) {
        console.error("Error Occured in Single View: ", error);
      }
    }
  }, []);

  useEffect(() => {
    console.log("Single Data:", singleData);
    setDataExists(singleData && Object.keys(singleData).length > 0);
  }, [singleData]);

  console.log("Single Data:", singleData);

  return (
    <div>
      {(dataExists && Object.keys(singleData).length > 0 && (
        <SingleAnime anime={singleData} />
      )) || (
        <Typography variant="h4" component="h2">
          No Data Exists
        </Typography>
      )}
    </div>
  );
};

export default SingleView;
