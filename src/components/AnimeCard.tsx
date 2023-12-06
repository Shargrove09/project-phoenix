import React from "react";
import { useNavigate } from "react-router-dom";
// Old way
// import { SearchContext } from "../context/useSearchContext";
import { useSearchContext } from "../context/useSearchContext";
import { Typography, Link, Card, ImageListItem, Grid } from "@mui/material";

import "./AnimeCard.scss";

const AnimeCard = (props) => {
  const navigate = useNavigate();

  // Old Way
  // const search = useContext(SearchContext);

  const { setSingle, searchById } = useSearchContext();

  const onClickHandler = () => {
    fetch(`https://api.jikan.moe/v4/anime/${props.anime.mal_id}/full`)
      .then((response) => response.json())
      .then((data) => {
        setSingle(data);
        localStorage.setItem("singleData", JSON.stringify(data));
        navigate("/single-view");
      });
  };

  const onClickHandler2 = () => {
    console.log("Anime ID: : ", props.anime.mal_id);
    searchById(props.anime.mal_id).then((anime: any) => {
      console.log("Show Data Click Handler: ", anime.data);
      setSingle(anime.data);
      localStorage.setItem("singleData", JSON.stringify(anime.data));
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
        <Card
          style={{ backgroundColor: "#424242" }}
          className="animeCard__card"
        >
          <div className="animeCard__img_container">
            <img className="animeCard__img" src={imageUrl} alt={title} />
          </div>
          <Typography variant="h5" component="h3" className="animeCard__title">
            {" "}
            {/* component uses render of h2 (in this case) with size of h5 Takes h2 but turns into h5 */}
            {title}
          </Typography>
          <Typography
            variant="body2"
            component="h2"
            paragraph={true}
            className="animeCard__synopsis"
          >
            {synopsis}
          </Typography>
          <Link
            component="button"
            variant="body1"
            style={{ marginBottom: 0 }}
            onClick={onClickHandler2}
          >
            Learn More
          </Link>
        </Card>
      </Grid>
    </ImageListItem>
  );
};

export default AnimeCard;
