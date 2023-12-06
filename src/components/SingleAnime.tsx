import React, { useEffect, useState } from "react";

import { Typography, Paper, Box, Divider } from "@mui/material";
import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import "./SingleAnime.scss";
import { Anime } from "../common/Anime";
import { useSearchContext } from "../context/useSearchContext";
import Example from "./VideoPlayer/VideoPlayer";
import RelatedAnimeSection from "./RelatedAnimeSection/RelatedAnimeSection";
import { useNavigate } from "react-router";
import AnimeCarousel from "./AnimeCarousel/AnimeCarousel";

interface Props {
  anime: Anime;
}

const SingleAnime = (props: Props) => {
  const { anime } = props;
  const { searchById, setSingle } = useSearchContext();
  const navigate = useNavigate();

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

  // Don't need since related shows are exposed already

  // const getRelatedShows = async (animeId: number) => {
  //   try {
  //     const relatedResponse = await fetch(
  //       `https://api.jikan.moe/v4/anime/${animeId}/relations`
  //     );
  //     const relatedResult = await relatedResponse.json();

  //     console.log("Related Shows: ", relatedResult);
  //   } catch (error) {
  //     console.error("Error getting related shows: ", error);
  //   }
  // };

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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        className="singleAnime__container"
        spacing={3} // Was 5 previously
        //justify="center"

        direction={"row"}
      >
        {/* Left */}
        <Grid
          container
          xs={3}
          sx={{ width: "fit-content", marginRight: "32px" }}
          direction={"column"}
        >
          <img src={image_url} alt={title} className="singleAnime__image" />
          <Grid
            container
            spacing={3}
            alignItems="center"
            direction={"row"}
            className="singleAnime__additonalInfoContainer"
          >
            <Grid sx={{ width: "100%" }}>
              <Typography className="singleAnime__additionalInfo">
                Information
              </Typography>
              <Divider sx={{ marginLeft: "20px" }} />
              <Typography
                variant="body2"
                className=" singleAnime__episodes singleAnime__additionalInfo"
              >
                Episodes: <i>{episodes}</i>
              </Typography>

              <Typography
                variant="body2"
                className=" singleAnime__airing singleAnime__additionalInfo"
              >
                Airing: <i>{airing ? "Currently Airing" : "Not Airing"}</i>
              </Typography>

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
        <Grid className="singleAnime__header" xs={7} direction={"column"}>
          <Typography
            className="singleAnime__title"
            fontSize={"2.5rem"}
            variant="h4"
            component="h2"
          >
            {title}
          </Typography>

          {/* INFO GRID*/}
          <Grid direction={"column"} container xs={12}>
            <Paper
              className="singleAnime__info_container"
              sx={{ backgroundColor: "#424242" }}
            >
              <Typography
                className="singleAnime__score singleAnime__info"
                variant="h5"
                component="h2"
              >
                Score: <b>{score}</b>
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                className="singleAnime__ranking singleAnime__info"
                variant="h5"
                component="h2"
              >
                Rank: <b>{rank}</b>
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                className="singleAnime__popularity singleAnime__info"
                variant="h5"
                component="h2"
              >
                Popularity: <b>#{popularity}</b>
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                className="singleAnime__members singleAnime__info"
                variant="h5"
                component="h2"
              >
                Members: <b>{members}</b>
              </Typography>
            </Paper>

            <Grid
              xs={12}
              className="singleAnime__synopsis_container singleAnime__section_header"
            >
              Synopsis
              <Divider />
              <Typography
                variant="body1"
                component="h3"
                className="singleAnime__synopsis"
              >
                <p>{synopsis}</p>
              </Typography>
            </Grid>
            <Grid
              xs={6}
              className="singleAnime__background_container singleAnime__section_header"
            >
              Background
              <Divider />
              <Typography
                variant="body1"
                component="h3"
                className="singleAnime__synopsis"
              >
                <p>{background}</p>
              </Typography>
            </Grid>
            <Grid className="singleAnime__related_container singleAnime__section_header">
              Related Anime
              <Divider />
              <RelatedAnimeSection relations={relations} />
            </Grid>
            <Grid
              className="singleAnime__recommended_container singleAnime__section_header"
              sx={{ mx: "auto" }}
            >
              Recommended Anime
              <Divider />
              <AnimeCarousel shows={recommendedShows} />
            </Grid>
          </Grid>
        </Grid>
        {/* Right */}
        <Grid
          className="singleAnime__right_section"
          direction={"column"}
          container
          xs={true}
          sx={{ right: 0 }}
        >
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
