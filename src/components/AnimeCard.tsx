import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/useSearchContext";
import { ActionIcon, Box, Card, Image, Text } from "@mantine/core";
import { IconCaretRight } from "@tabler/icons-react";

import classes from "./AnimeCard.module.scss";

const AnimeCard = (props: any) => {
  const navigate = useNavigate();

  const { setSingle, searchById } = useSearchContext();

  const onClickHandler2 = () => {
    searchById(props.anime.mal_id).then((anime: any) => {
      setSingle(anime.data);
      localStorage.setItem("singleData", JSON.stringify(anime.data));
      navigate("/single-view");
    });
  };

  const title = props.anime.title;

  const imageUrl = props.anime.images.jpg.image_url;

  // Default to No Synopsis if anime doesn't have a synopsis
  const synopsisDef = props.anime.synopsis || "No Synopsis Available";

  const synopsis =
    synopsisDef.length > 30
      ? `${synopsisDef.substring(0, 30)}...`
      : synopsisDef;

  // container item takes up only as much space as it needs and no more
  return (
    <Card className={classes.animeCard}>
      {/* 321 is the default height of MAL image */}
      <Card.Section
        className={classes.animeCard__img_container}
        h={340}
        w={225}
        pt={10}
        m={"auto"}
      >
        <Image
          className={classes.animeCard__img}
          w="auto"
          mah={321}
          fit="contain"
          src={imageUrl}
          alt={title}
        />
      </Card.Section>
      <Box display={"flex"} className={classes.animeCard__info}>
        <Text
          className={classes.animeCard__title}
          fw={600}
          size={"xl"}
          truncate={"end"}
        >
          {title}
        </Text>
        <ActionIcon onClick={onClickHandler2} ml={8}>
          <IconCaretRight />
        </ActionIcon>
      </Box>
    </Card>
  );
};

export default AnimeCard;
