import React from "react";
import AnimeCard from "./AnimeCard";
import { ImageList } from "@material-ui/core";
import { Anime } from "../common/Anime";

interface Props {
  animeListData: Anime[];
}

const AnimeList = (props) => {
  console.log("AnimeListProps: ", props);
  return (
    <ImageList style={{ margin: "auto", justifyContent: "center" }}>
      {props.data.map((anime) => (
        <AnimeCard kdey={anime.mal_id} anime={anime} />
      ))}
    </ImageList>
  );
};

export default AnimeList;
