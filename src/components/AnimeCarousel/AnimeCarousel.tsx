import React, { useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Loader } from "@mantine/core";
import { Box } from "@mui/system";

import "./AnimeCarousel.scss";

interface Props {
  shows: any[];
}

const AnimeCarousel = (props: Props) => {
  const { shows } = props;
  console.log("Shows in Carousel: ", shows);

  useEffect(() => {}, [shows]);

  if (!Array.isArray(shows)) {
    // If shows is not an array, show a loading indicator
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Loader className="animeCarousel__loader" />
      </Box>
    );
  }

  return (
    <div style={{ height: 400, width: "100%", display: "flex" }}>
      <Carousel
        className="animeCarousel"
        withIndicators
        loop
        align="center"
        slidesToScroll={3}
        slideGap={"xs"}
        slideSize="33.333333%"
      >
        {shows.map((show, index) => (
          <Carousel.Slide className="animeCarousel__slide" key={index}>
            {/* Render your show content here, for example: */}
            <h3>{show.entry.title}</h3>
            <img
              src={show.entry.images.jpg.image_url}
              alt={show.entry.title + " small-image-card"}
              height={300}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default AnimeCarousel;
