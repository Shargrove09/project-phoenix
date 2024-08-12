import { useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Box, Loader, Text } from "@mantine/core";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import classes from "./AnimeCarousel.module.scss";

interface Props {
  shows: any[];
}

const AnimeCarousel = (props: Props) => {
  const { shows } = props;
  const { searchById, setSingle } = useSearchContext();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  console.log("Is mobile? ", isMobile);

  useEffect(() => {}, [shows]);

  if (!Array.isArray(shows)) {
    // If shows is not an array, show a loading indicator
    return (
      <Box>
        <Loader className="animeCarousel__loader" />
      </Box>
    );
  }

  const handleRecommendedClick = async (malID: number) => {
    const recommendedResult = await searchById(malID);
    setSingle(recommendedResult.data);
    localStorage.setItem("singleData", JSON.stringify(recommendedResult.data));
    navigate("/single-view");
  };

  return (
    <Carousel
      className={classes.animeCarousel}
      controlsOffset={"xs"}
      loop
      p={"lg"}
      slideGap={"xs"}
      slideSize={isMobile ? "100%" : "25%"}
      slidesToScroll={isMobile ? 1 : 3}
      withIndicators
    >
      {shows.map((show, index) => (
        <Carousel.Slide
          className={classes.animeCarousel__slide}
          key={index}
          onClick={() => handleRecommendedClick(show.entry.mal_id)}
        >
          {/* Render your show content */}
          <Text className={classes.animeCarousel__slide_title} truncate={"end"}>
            {show.entry.title}
          </Text>
          <img
            src={show.entry.images.jpg.image_url}
            alt={show.entry.title + " small-image-card"}
            height={300}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default AnimeCarousel;
