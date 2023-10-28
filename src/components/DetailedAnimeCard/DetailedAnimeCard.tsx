import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import React from "react";

import "./DetailedAnimeCard.scss";
import { Anime } from "../../common/Anime";

interface Props {
  animeData: Anime;
}

const DetailedAnimeCard = (props: Props) => {
  const { animeData } = props;
  return (
    <Card className="dcard__container">
      {" "}
      {animeData.title}
      <CardMedia
        sx={{ height: 140, width: 140 }}
        image={animeData.images.jpg.image_url}
        title={`${animeData.title}_cover_picture`}
      />
    </Card>
  );
};

export default DetailedAnimeCard;
