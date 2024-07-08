import React from "react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Anime } from "../../common/Anime";

import "./SeasonalCarousel.scss"

type SeasonalCarouselProps = {
  animeList: Anime[];
};



const SeasonalCarousel = (props: SeasonalCarouselProps) => {
  const { animeList } = props;
  console.log("Anime List: ", animeList);

  return (
    <Carousel withIndicators loop className="seasonalCarousel">
      {animeList.map((anime) => (
        <CarouselSlide className="seasonalCarousel__slide" key={anime.mal_id}>
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <h3>{anime.title}</h3>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default SeasonalCarousel;
