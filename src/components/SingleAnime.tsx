import { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Group, Text } from "@mantine/core";
import { Anime } from "../common/Anime";
import RelatedAnimeSection from "./RelatedAnimeSection/RelatedAnimeSection";
import AnimeCarousel from "./AnimeCarousel/AnimeCarousel";
import PrevVideoPlayer from "./VideoPlayer/PrevVideoPlayer";

import classes from "./SingleAnime.module.scss";
import { useSearchContext } from "../context/useSearchContext";

interface Props {
  anime: Anime;
}

const SingleAnime = (props: Props) => {
  const { anime } = props;

  const [recommendedShows, setRecommendedShows] = useState<any[]>([]);

  useEffect(() => {
    // if (anime === undefined) {
    //   try {
    //     const storedAnimeData = localStorage.getItem("singleData");
    //     const parsedStoredAnimeData = storedAnimeData
    //       ? JSON.parse(storedAnimeData)
    //       : null;

    //     console.log("Parsed", parsedStoredAnimeData);
    //     setSingle(parsedStoredAnimeData.data);
    //   } catch (error) {
    //     console.error("Error fetching stored single anime data");
    //   }
    // }
    getRecommendedShows(anime.mal_id);
  }, [anime]);

  const {
    airing,
    images,
    rating,
    rank,
    score,
    popularity,
    url,
    episodes,
    members,
    genres,
    background,
    relations,
  } = anime;

  const title = props.anime?.title ?? "No Title Loaded :(";
  const broadcast = props.anime?.broadcast;
  const image_url = images?.jpg.image_url;
  const synopsis = props.anime?.synopsis ?? "No Synopisis Loaded";

  console.log("Anime:", props.anime);
  const trailerURL = props.anime?.trailer?.youtube_id ?? "";

  const getRecommendedShows = async (animeId: number) => {
    try {
      const recommendedResponse = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
      );
      const recommendedResult = await recommendedResponse.json();

      console.log("Recommended Shows: ", recommendedResult);
      setRecommendedShows(recommendedResult.data);
    } catch (error) {
      console.error("Error getting recommended shows: ", error);
    }
  };

  // const handleRelationEntryClick = async (malID: string) => {
  //   const relationResult = await searchById(malID);
  //   setSingle(relationResult.data);
  //   localStorage.setItem("singleData", JSON.stringify(relationResult.data));
  //   navigate("/single-view");
  // };

  return (
    <Grid className={classes.singleAnime__container}>
      <Grid.Col className={classes.singleAnime__left} span={2}>
        <img
          src={image_url}
          alt={title}
          className={classes.singleAnime__image}
        />
        <Box className={classes.singleAnime__additonalInfoContainer}>
          <Text className="singleAnime__additionalInfo">Information</Text>
          <Divider />
          <Text
            variant="body2"
            className=" singleAnime__episodes singleAnime__additionalInfo"
          >
            Episodes: <i>{episodes}</i>
          </Text>
          <Text
            variant="body2"
            className=" singleAnime__airing singleAnime__additionalInfo"
          >
            Airing: <i>{airing ? "Currently Airing" : "Not Airing"}</i>
          </Text>
          <Button
            className="singleAnime__linkButton singleAnime__additionalInfo"
            variant="contained"
          >
            <a
              href={url}
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              MAL
            </a>
          </Button>
        </Box>
        Related Anime
        <Divider />
        <RelatedAnimeSection relations={relations} />
      </Grid.Col>
      <Grid.Col span={8}>
        <Text
          className={classes.singleAnime__title}
          display={"flex"}
          fw={700}
          left={2}
          mb={10}
          size={"lg"}
        >
          {title}
        </Text>
        <Group className={classes.singleAnime__info_container}>
          <Text
            className={`${classes.singleAnime__score} ${classes.singleAnime__info} `}
            variant="h5"
            component="h2"
          >
            Score: <b>{score}</b>
          </Text>
          <Divider orientation="vertical" />
          <Text className="singleAnime__ranking singleAnime__info">
            Rank: <b>{rank}</b>
          </Text>
          <Divider orientation="vertical" />
          <Text
            className="singleAnime__popularity singleAnime__info"
            variant="h5"
            component="h2"
          >
            Popularity: <b>#{popularity}</b>
          </Text>
          <Divider orientation="vertical" />
          <Text
            className="singleAnime__members singleAnime__info"
            variant="h5"
            component="h2"
          >
            Members: <b>{members}</b>
          </Text>
        </Group>
        <Text fs={"italic"} fw={600}>
          Synopsis
        </Text>
        <Divider />
        <Text variant="body1" component="h3" className="singleAnime__synopsis">
          <p>{synopsis}</p>
        </Text>
        Recommended Anime
        <Divider />
        <AnimeCarousel shows={recommendedShows} />
      </Grid.Col>
      <Grid.Col span={2}>
        <div className={classes.singleAnime__trailerContainer}>
          PV
          <PrevVideoPlayer height={160} width={240} youtubeURL={trailerURL} />
        </div>
        <Text variant="body1" component="h3" className="singleAnime__synopsis">
          <p>{background}</p>
        </Text>
      </Grid.Col>
    </Grid>
  );
};

export default SingleAnime;
