import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Grid, Typography, Paper } from "@mui/material";
import { Button } from "@mui/material";

import "./SingleAnime.scss";

const SingleAnime = (props) => {
  console.log("SingleAnime, ", props);
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
  } = props.info?.data ?? "Null";

  const title = props.info?.data?.title ?? "title Didn't load";
  const broadcast = props.info?.data?.broadcast;
  const image_url = images?.jpg.image_url;
  const synopsis = props.info?.data.synopsis;

  useEffect(() => {}, []);
  return (
    <Grid
      container
      className="singleAnime__container"
      spacing={0} // Was 5 previously
      direction="row"
      //justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid className="singleAnime__titleContainer" item xs={12}>
        <Typography
          className="singleAnime__title"
          font-size={"3rem"}
          variant="h4"
          component="h2"
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <img src={image_url} alt={title} className="singleAnime__image" />
      </Grid>
      {/* INFO GRID*/}
      <Grid item container xs={9} className="singleAnime__infoContainer">
        <Paper>
          <Grid item className="singleAnime__score singleAnime__info">
            <Typography variant="h5" component="h2">
              Score: <b>{score}</b>
            </Typography>
          </Grid>
        </Paper>
        <Paper>
          <Grid item className="singleAnime__ranking singleAnime__info">
            <Typography variant="h5" component="h2">
              Rank: <b>{rank}</b>
            </Typography>
          </Grid>
        </Paper>
        <Paper>
          <Grid item className="singleAnime__popularity singleAnime__info">
            <Typography variant="h5" component="h2">
              Popularity: <b>#{popularity}</b>
            </Typography>
          </Grid>
        </Paper>
        <Paper>
          <Grid item className="singleAnime__members singleAnime__info">
            <Typography variant="h5" component="h2">
              Members: <b>{members}</b>
            </Typography>
          </Grid>
        </Paper>
        <Grid item xs={9} className="singleAnime__synopsisContainer">
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
      <Grid
        container
        item
        xs={3}
        className="singleAnime__additonalInfoContainer"
      >
        <Grid item xs={12} className="singleAnime__episodesContainer">
          <Typography
            variant="body2"
            className=" singleAnime__episodes singleAnime__additionalInfo"
          >
            Episodes: <i>{episodes}</i>
          </Typography>
        </Grid>

        <Grid item xs={12} className="singleAnime__airingContainer">
          <Typography
            variant="body2"
            className=" singleAnime__airing singleAnime__additionalInfo"
          >
            Airing: <i>{airing ? "Currently Airing" : "Not Airing"}</i>
          </Typography>
        </Grid>

        <Grid item xs={12} className="singleAnime__linkContainer">
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
      </Grid>
    </Grid>
  );
};

export default SingleAnime;
