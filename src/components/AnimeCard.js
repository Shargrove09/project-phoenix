import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/search";
import {
  Typography,
  Link,
  Paper,
  ImageListItem,
  Grid,
} from "@material-ui/core";

import "./AnimeCard.scss";

const AnimeCard = (props) => {
  const navigate = useNavigate();
  const search = useContext(SearchContext);

  const onClickHandler = () => {
    fetch(`https://api.jikan.moe/v4/anime/${props.anime.mal_id}/full`)
      .then((response) => response.json())
      .then((data) => {
        search.setSingle(data);
        localStorage.setItem("singleData", JSON.stringify(data));
        navigate("/single-view");
      });
  };

  const title =
    props.anime.title.length > 15
      ? `${props.anime.title.substring(0, 15)}...`
      : props.anime.title;
  const imageUrl = props.anime.images.jpg.image_url;

  const synopsisDef = props.anime.synopsis || "No Synopsis"; // Default to No Synopsis if anime doesn't have a synopsis
  const synopsis =
    synopsisDef.length > 30
      ? `${synopsisDef.substring(0, 30)}...`
      : synopsisDef;

  // container item takes up only as much space as it needs and no more
  return (
    <ImageListItem className="animeCard__container">
      <Grid container item xs={12}>
        <Paper className="animeCard__paper">
          <img src={imageUrl} alt={title} style={{ maxHeight: 300 }} />
          <Typography variant="h5" component="h2">
            {" "}
            {/* component uses render of h2 (in this case) with size of h5 Takes h2 but turns into h5 */}
            {title}
          </Typography>
          <Typography variant="body2" component="h2" paragraph={true}>
            {synopsis}
          </Typography>
          <Link
            component="button"
            variant="body1"
            style={{ marginBottom: 0 }}
            onClick={onClickHandler}
          >
            Learn More
          </Link>
        </Paper>
      </Grid>
    </ImageListItem>
  );
};

export default AnimeCard;
