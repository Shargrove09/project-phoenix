import React, { useEffect } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import "./SingleAnime.scss";

const SingleAnime = (props) => {
  const { images, rating, airing, score, url, episodes } =
    props.info?.data ?? "Null";

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
              Score: {score}
            </Typography>
          </Grid>
        </Paper>
        <Paper>
          <Grid item className="singleAnime__rating singleAnime__info">
            <Typography variant="h5" component="h2">
              Rating: {rating}
            </Typography>
          </Grid>
        </Paper>
        <Paper>
          <Grid item className="singleAnime__episodes singleAnime__info">
            <Typography variant="h5" component="h2">
              Episodes: {episodes || "Unknown"}
            </Typography>
          </Grid>
        </Paper>
        <Grid item xs={9} className="singleAnime__synopsis">
          <Typography>{synopsis}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleAnime;
