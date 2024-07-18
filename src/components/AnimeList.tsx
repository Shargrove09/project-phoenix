import React from "react";
import AnimeCard from "./AnimeCard";
import { ImageList } from "@mui/material";
import { SimpleGrid } from "@mantine/core";
import { Anime } from "../common/Anime";

interface Props {
  animeListData: Anime[];
}

const AnimeList = (props: any) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
      {props.data.map((anime: Anime) => (
        <AnimeCard anime={anime} key={anime.mal_id} />
      ))}
    </SimpleGrid>
  );
};

export default AnimeList;
