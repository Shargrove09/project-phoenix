import { useNavigate } from "react-router-dom";
// Old way
// import { SearchContext } from "../context/useSearchContext";
import { useSearchContext } from "../context/useSearchContext";
import { Card, NavLink, Text } from "@mantine/core";

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

  // TODO: Prob can just use text truncation
  const title =
    props.anime.title.length > 15
      ? `${props.anime.title.substring(0, 15)}...`
      : props.anime.title;

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
      <div className={classes.animeCard__img_container}>
        <img className={classes.animeCard__img} src={imageUrl} alt={title} />
      </div>
      <Text variant="h5" component="h3" className={classes.animeCard__title}>
        {" "}
        {/* component uses render of h2 (in this case) with size of h5 Takes h2 but turns into h5 */}
        {title}
      </Text>
      <Text
        variant="body2"
        component="h2"
        className={classes.animeCard__synopsis}
      >
        {synopsis}
      </Text>
      <NavLink
        component="button"
        variant="body1"
        style={{ marginBottom: 0 }}
        onClick={onClickHandler2}
      >
        Learn More
      </NavLink>
    </Card>
  );
};

export default AnimeCard;
