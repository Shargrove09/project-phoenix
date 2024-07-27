import { useEffect, useState } from "react";
import { Box, Grid, Text } from "@mantine/core";

import { Paper, Divider } from "@mui/material";
import { Button } from "@mui/material";

import { Anime } from "../common/Anime";
import Example from "./VideoPlayer/VideoPlayer";

import RelatedAnimeSection from "./RelatedAnimeSection/RelatedAnimeSection";
import AnimeCarousel from "./AnimeCarousel/AnimeCarousel";

import classes from "./SingleAnime.module.scss";

interface Props {
  anime: Anime;
}

const SingleAnime = (props: Props) => {
  const { anime } = props;

  const [recommendedShows, setRecommendedShows] = useState<any[]>([]);

  useEffect(() => {
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
    <Box>
      <Grid className={classes.singleAnime__container}>
        {/* Left */}
        <Grid>
          <img src={image_url} alt={title} className="singleAnime__image" />
          <Grid className="singleAnime__additonalInfoContainer">
            <Grid>
              <Text className="singleAnime__additionalInfo">Information</Text>
              <Divider sx={{ marginLeft: "20px" }} />
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
            </Grid>

            {/* <div>
              Genres:
              {genres.map((genre) => (
                <Typography>{genre.name}</Typography>
              ))}
            </div> */}
          </Grid>
        </Grid>

        {/* Main Portion */}
        <Grid className="singleAnime__header">
          <Text className="singleAnime__title" variant="h4" component="h2">
            {title}
          </Text>

          {/* INFO GRID*/}
          <Grid>
            <Paper
              className="singleAnime__info_container"
              sx={{ backgroundColor: "#424242" }}
            >
              <Text
                className="singleAnime__score singleAnime__info"
                variant="h5"
                component="h2"
              >
                Score: <b>{score}</b>
              </Text>
              <Divider orientation="vertical" flexItem />
              <Text
                className="singleAnime__ranking singleAnime__info"
                variant="h5"
                component="h2"
              >
                Rank: <b>{rank}</b>
              </Text>
              <Divider orientation="vertical" flexItem />
              <Text
                className="singleAnime__popularity singleAnime__info"
                variant="h5"
                component="h2"
              >
                Popularity: <b>#{popularity}</b>
              </Text>
              <Divider orientation="vertical" flexItem />
              <Text
                className="singleAnime__members singleAnime__info"
                variant="h5"
                component="h2"
              >
                Members: <b>{members}</b>
              </Text>
            </Paper>

            <Grid className="singleAnime__synopsis_container singleAnime__section_header">
              Synopsis
              <Divider />
              <Text
                variant="body1"
                component="h3"
                className="singleAnime__synopsis"
              >
                <p>{synopsis}</p>
              </Text>
            </Grid>
            <Grid className="singleAnime__background_container singleAnime__section_header">
              Background
              <Divider />
              <Text
                variant="body1"
                component="h3"
                className="singleAnime__synopsis"
              >
                <p>{background}</p>
              </Text>
            </Grid>
            <Grid className="singleAnime__related_container singleAnime__section_header">
              Related Anime
              <Divider />
              <RelatedAnimeSection relations={relations} />
            </Grid>
            <Grid className="singleAnime__recommended_container singleAnime__section_header">
              Recommended Anime
              <Divider />
              <AnimeCarousel shows={recommendedShows} />
            </Grid>
          </Grid>
        </Grid>
        {/* Right */}
        <Grid className="singleAnime__right_section">
          <div className="singleAnime__trailer_container">
            PV
            <Example
              videoId={anime.trailer.youtube_id}
              height={180}
              width={320}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleAnime;
