import React, { useEffect } from "react";

import { Typography, Paper, Box, Divider } from "@mui/material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import "./SingleAnime.scss";
import { Anime } from "../common/Anime";
import { useSearchContext } from "../context/useSearchContext";

interface Props {
  anime: Anime;
}

const SingleAnime = (props: Props) => {
  console.log("Single Props: ", props);
  const { anime } = props;
  const { searchById } = useSearchContext();

  useEffect(() => {
    // getRelatedShows(anime.mal_id);
    // getRecommendedShows(anime.mal_id);
  });

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
  } = props.anime;

  const title = props.anime?.title ?? "No Title Loaded :(";
  const broadcast = props.anime?.broadcast;
  const image_url = images?.jpg.image_url;
  const synopsis = props.anime?.synopsis ?? "No Synopisis Loaded";

  const getRelatedShows = async (animeId: number) => {
    try {
      const relatedResponse = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/relations`
      );
      const relatedResult = await relatedResponse.json();

      console.log("Related Shows: ", relatedResult);
    } catch (error) {
      console.error("Error getting related shows: ", error);
    }
  };

  const getRecommendedShows = async (animeId: number) => {
    try {
      const recommendedResponse = await fetch(
        `https://api.jikan.moe/v4/anime/${animeId}/recommendations`
      );
      const recommendedResult = await recommendedResponse.json();

      console.log("Recommended Shows: ", recommendedResult);
    } catch (error) {
      console.error("Error getting recommended shows: ", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        className="singleAnime__container"
        spacing={3} // Was 5 previously
        //justify="center"
        alignItems="center"
        direction={"row"}
      >
        <Grid xs={3} sx={{ width: "fit-content", marginRight: "32px" }}>
          <img src={image_url} alt={title} className="singleAnime__image" />
        </Grid>
        <Grid className="singleAnime__header" xs={9}>
          <Typography
            className="singleAnime__title"
            fontSize={"2.5rem"}
            variant="h4"
            component="h2"
          >
            {title}
          </Typography>
          {/* INFO GRID*/}
          <Grid container xs={9} className="singleAnime__infoContainer">
            <Paper>
              <Typography
                className="singleAnime__score singleAnime__info"
                variant="h5"
                component="h2"
              >
                Score: <b>{score}</b>
              </Typography>
            </Paper>
            <Paper>
              <Typography
                className="singleAnime__ranking singleAnime__info"
                variant="h5"
                component="h2"
              >
                Rank: <b>{rank}</b>
              </Typography>
            </Paper>
            <Paper>
              <Typography
                className="singleAnime__popularity singleAnime__info"
                variant="h5"
                component="h2"
              >
                Popularity: <b>#{popularity}</b>
              </Typography>
            </Paper>
            <Paper>
              <Typography
                className="singleAnime__members singleAnime__info"
                variant="h5"
                component="h2"
              >
                Members: <b>{members}</b>
              </Typography>
            </Paper>
            <Grid xs={9} className="singleAnime__synopsisContainer">
              <Divider />
              <Typography
                variant="body1"
                component="h3"
                className="singleAnime__synopsis"
              >
                <p>{synopsis}</p>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={3} className="singleAnime__additonalInfoContainer">
          <Grid xs={12} className="singleAnime__episodesContainer">
            <Typography
              variant="body2"
              className=" singleAnime__episodes singleAnime__additionalInfo"
            >
              Episodes: <i>{episodes}</i>
            </Typography>
          </Grid>

          <Grid xs={12} className="singleAnime__airingContainer">
            <Typography
              variant="body2"
              className=" singleAnime__airing singleAnime__additionalInfo"
            >
              Airing: <i>{airing ? "Currently Airing" : "Not Airing"}</i>
            </Typography>
          </Grid>

          <Grid xs={12} className="singleAnime__linkContainer">
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

            {/* <div>
              Genres:
              {genres.map((genre) => (
                <Typography>{genre.name}</Typography>
              ))}
            </div> */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleAnime;
