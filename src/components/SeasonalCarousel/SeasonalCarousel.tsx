import React from "react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Anime } from "../../common/Anime";

import classes from "./SeasonalCarousel.module.scss";

type SeasonalCarouselProps = {
  animeList: Anime[];
};

const SeasonalCarousel = (props: SeasonalCarouselProps) => {
  const { animeList } = props;
  console.log("Anime List: ", animeList);

  return (
    <Carousel
      withIndicators
      loop
      className={classes.seasonalCarousel}
      classNames={{ indicator: classes.seasonalCarousel__indicator }}
    >
      {animeList.map((anime) => (
        <CarouselSlide
          className={classes.seasonalCarousel__slide}
          key={anime.mal_id}
        >
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <h3>{anime.title}</h3>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default SeasonalCarousel;
