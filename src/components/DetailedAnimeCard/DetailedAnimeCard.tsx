import { useState } from "react";
import { ActionIcon, Box, Card, Image, ScrollArea, Text } from "@mantine/core";
import { Anime } from "../../common/Anime";
import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";

import classes from "./DetailedAnimeCard.module.scss";

interface Props {
  animeData: Anime;
}

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
    <Card
      className={classes.dcard__container}
      onClick={handleExpandClick}
      h={300}
      p={16}
      pt={8}
    >
      <Box
        className={classes.dcard__header}
        display={"flex"}
        h={"10%"}
        mb={10}
        mt={4}
      >
        <Text
          className={classes.dcard__headerText}
          fw={700}
          pl={4}
          size={"md"}
          truncate={"end"}
        >
          {animeData.title}
        </Text>
      </Box>

      <Box className={classes.dcard__content} display={"flex"} h={"75%"}>
        <Image
          mah={{ base: 160, md: 321 }}
          className="dcard__card_media"
          src={animeData.images.jpg.image_url}
          title={`${animeData.title}_cover_picture`}
          w={"auto"}
        />
        <Text className={classes.dcard__text} lineClamp={8} ml={20} mb={10}>
          {" "}
          {animeData.synopsis}
        </Text>
      </Box>
      <Box
        className={classes.dcard__headerActionsContainer}
        display={"flex"}
        h={"15%"}
        pt={8}
      >
        <ActionIcon
          aria-label="more-info"
          className="dcard__action"
          onClick={handleInfoButtonClick}
          size={"md"}
        >
          <InfoIcon />
        </ActionIcon>

        <ActionIcon
          aria-label="share"
          onClick={handleShareBtnClick}
          ml={10}
          size={"md"}
        >
          <ShareIcon />
        </ActionIcon>
      </Box>
    </Card>
  );
};

export default DetailedAnimeCard;
