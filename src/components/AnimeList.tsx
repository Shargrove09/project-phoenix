import AnimeCard from "./AnimeCard";
import { SimpleGrid } from "@mantine/core";
import { Anime } from "../common/Anime";

interface Props {
  animeListData: Anime[];
}

const AnimeList = (props: any) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }}>
      {props.data.map((anime: Anime) => (
        <AnimeCard anime={anime} key={anime.mal_id} />
      ))}
    </SimpleGrid>
  );
};

export default AnimeList;
