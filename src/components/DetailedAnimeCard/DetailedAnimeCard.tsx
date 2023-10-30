import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

import { Anime } from "../../common/Anime";

import "./DetailedAnimeCard.scss";

interface Props {
  animeData: Anime;
}

const DetailedAnimeCard = (props: Props) => {
  const { animeData } = props;
  return (
    <Card sx={{ backgroundColor: "#424242" }} className="dcard__container">
      <div className="dcard__header">
        <Typography className="dcard__header_text" variant="h5">
          {animeData.title}
        </Typography>
      </div>

      <CardContent className="dcard__content">
        <CardMedia
          sx={{ height: 120, width: 84 }}
          image={animeData.images.jpg.image_url}
          title={`${animeData.title}_cover_picture`}
          className="dcard__card_media"
        />
        <Typography> {animeData.synopsis}</Typography>
      </CardContent>
    </Card>
  );
};

export default DetailedAnimeCard;
