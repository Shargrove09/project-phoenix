import { useState } from "react";
import { ActionIcon, Box, Card, Image, Text } from "@mantine/core";
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
    <Card className={classes.dcard__container} onClick={handleExpandClick}>
      <Card.Section className={classes.dcard__header} display={"flex"}>
        <Text
          className={classes.dcard__headerText}
          fw={700}
          pl={10}
          size={"lg"}
        >
          {animeData.title}
        </Text>
        <div>
          <ActionIcon aria-label="more-info" onClick={handleInfoButtonClick}>
            <InfoIcon />
          </ActionIcon>

          <ActionIcon aria-label="share" onClick={handleShareBtnClick}>
            <ShareIcon />
          </ActionIcon>
        </div>
      </Card.Section>

      <Box className="dcard__content" display={"flex"} h={"50%"}>
        <Image
          className="dcard__card_media"
          src={animeData.images.jpg.image_url}
          w={"auto"}
          mah={{ base: 160, md: 321 }}
          title={`${animeData.title}_cover_picture`}
        />
        <Text mah={200} ml={20} lineClamp={4} truncate={"end"}>
          {" "}
          {animeData.synopsis}
        </Text>
      </Box>
    </Card>
  );
};

export default DetailedAnimeCard;
