import React from "react";
import AnimeCard from "./AnimeCard";
import { ImageList } from "@material-ui/core";

interface Props {}

const AnimeList = (props) => {
  console.log("AnimeListProps: ", props);
  return (
    <ImageList>
      {props.data.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </ImageList>
  );
};

export default AnimeList;
