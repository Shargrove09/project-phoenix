import React, { useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import { Loader } from "@mantine/core";
import { Box } from "@mui/system";

import "./AnimeCarousel.scss";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";

interface Props {
  shows: any[];
}

const AnimeCarousel = (props: Props) => {
  const { shows } = props;
  const { searchById, setSingle } = useSearchContext();
  const navigate = useNavigate();

  useEffect(() => {}, [shows]);

  if (!Array.isArray(shows)) {
    // If shows is not an array, show a loading indicator
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Loader className="animeCarousel__loader" />
      </Box>
    );
  }

  const handleRecommendedClick = async (malID: number) => {
    console.log("Handling Click: ", malID);
    const recommendedResult = await searchById(malID);
    setSingle(recommendedResult.data);
    localStorage.setItem("singleData", JSON.stringify(recommendedResult.data));
    navigate("/single-view");
  };

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
          <Carousel.Slide
            className="animeCarousel__slide"
            key={index}
            onClick={() => handleRecommendedClick(show.entry.mal_id)}
          >
            {/* Render your show content here, for example: */}
            <h3 className="animeCarousel__slide_title">{show.entry.title}</h3>
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
