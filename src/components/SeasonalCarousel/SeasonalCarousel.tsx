import React, { useState } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import "./SeasonalCarousel.scss";

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  const previousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(images.length - 1);
    }
  };

  // Animation for carousel sliding
  const transformStyle = {
    transform: `translateY(-${currentImageIndex * 50}%)`,
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
      <IconButton onClick={previousImage} style={{ marginBottom: "10px" }}>
        <NavigateBeforeIcon />
      </IconButton>
      <div className="scarousel__container">
        <div className="scarousel__images" style={transformStyle}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Img- ${index + 1}`}
              className="scarousel__image_entry"
            />
          ))}
        </div>
      </div>

      <IconButton onClick={nextImage} style={{ marginTop: "10px" }}>
        <NavigateNextIcon />
      </IconButton>
      <Typography
        variant="subtitle1"
        align="center"
        style={{ marginTop: "10px" }}
      >
        Image {currentImageIndex + 1} of {images.length}
      </Typography>
    </Paper>
  );
};

export default ImageCarousel;
