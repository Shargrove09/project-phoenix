import React from "react";
import AnimeCard from "./AnimeCard";
import { ImageList } from "@mui/material";
import { Anime } from "../common/Anime";

interface Props {
  animeListData: Anime[];
}

const AnimeList = (props) => {
  return (
    <ImageList style={{ margin: "auto", justifyContent: "center" }} cols={6}>
      {props.data.map((anime: Anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </ImageList>
  );
};

export default AnimeList;
