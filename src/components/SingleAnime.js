import React, { useEffect } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import "./SingleAnime.scss";

const SingleAnime = (props) => {
  console.log("props.info", props.info);
  console.log("props.info.data", props.info.data);
  const { title, images, rating, airing, broadcast, score, url, episodes } =
    props.info?.data || "nothing";

  const image_url = images?.jpg.image_url;
  useEffect(() => {
    console.log("Title", title);
  }, [title]);
  return (
    <Grid
      container
      className="singleAnime__container"
      spacing={10}
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item>
        <img src={image_url} alt={title} className="singleAnime__image" />
      </Grid>
      <Grid item>
        <Paper elevation={3} className="singleAnime__description">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="h5" component="h2">
            Airing: {airing ? "Currently Airing" : "Not Airing"}
          </Typography>
          <Typography variant="h5" component="h2">
            Score: {score}
          </Typography>
          <Typography variant="h5" component="h2">
            Broadcast: {broadcast.string}
          </Typography>
          <Typography variant="h5" component="h2">
            Rating: {rating}
          </Typography>
          <Typography variant="h5" component="h2">
            Episodes: {episodes || "Unknown"}
          </Typography>
          <Typography variant="h5" component="h2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {" "}
              MAL{" "}
            </a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SingleAnime;
