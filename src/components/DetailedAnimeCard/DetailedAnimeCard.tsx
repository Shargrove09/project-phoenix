import React, { useState } from "react";

import { CardActions, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

import { ActionIcon, Box, Card } from "@mantine/core";

import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { Anime } from "../../common/Anime";

import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";

import classes from "./DetailedAnimeCard.module.scss";

interface Props {
  animeData: Anime;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DetailedAnimeCard = (props: Props) => {
  const { animeData } = props;
  const [expanded, setExpanded] = useState(false);
  const { setSingle } = useSearchContext();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInfoButtonClick = () => {
    fetch(`https://api.jikan.moe/v4/anime/${animeData.mal_id}/full`)
      .then((response) => response.json())
      .then((data) => {
        setSingle(data);
        localStorage.setItem("singleData", JSON.stringify(data));
        navigate("/single-view");
      });
  };

  const handleShareBtnClick = () => {
    navigator.clipboard.writeText(animeData.url);
    alert("MAL Link copied to clipboard!");
  };

  return (
    <Card className={classes.dcard__container} onClick={handleExpandClick}>
      <div className={classes.dcard__header}>
        <Typography
          className={classes.dcard__header_text}
          sx={{ margin: "10px", fontWeight: 600, fontStyle: "italic" }}
          variant="h5"
        >
          {animeData.title}
        </Typography>
        <Card.Section className="dcard__actions">
          <ActionIcon aria-label="more-info" onClick={handleInfoButtonClick}>
            <InfoIcon />
          </ActionIcon>

          <ActionIcon aria-label="share" onClick={handleShareBtnClick}>
            <ShareIcon />
          </ActionIcon>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more info"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Card.Section>
      </div>

      <CardContent className="dcard__content">
        <CardMedia
          sx={{ height: 120, minWidth: 84 }}
          image={animeData.images.jpg.image_url}
          title={`${animeData.title}_cover_picture`}
          className="dcard__card_media"
        />
        <Typography align="inherit" sx={{ color: "white" }}>
          {" "}
          {animeData.synopsis}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div>More info coming soon</div>
      </Collapse>
    </Card>
  );
};

export default DetailedAnimeCard;
