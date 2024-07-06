import React from "react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Anime } from "../../common/Anime";

type SeasonalCarouselProps = {
  animeList: Anime[];
};

interface Props {
  animeList: Anime[];
}

const SeasonalCarousel = (props: Props) => {
  const { animeList } = props;
  console.log("Anime List: ", animeList);

  return (
    <Carousel>
      {animeList.map((anime) => (
        <CarouselSlide key={anime.mal_id}>
          <img src={anime.images.jpg.image_url} alt={anime.title} />
          <h3>{anime.title}</h3>
        </CarouselSlide>
      ))}
    </Carousel>
  );
};

export default SeasonalCarousel;
