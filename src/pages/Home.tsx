import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/useSearchContext";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Grid from "@mui/material/Unstable_Grid2";
import { FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Home.scss";
import { Anime } from "../common/Anime";
import ImageCarousel from "../components/SeasonalCarousel/SeasonalCarousel";
import SwipeableTextMobileStepper from "../components/SeasonalCarousel/SeasonalCarouselSwipeable";

const Home = () => {
  const { search, setAnimeData, searchById, setSingle } = useSearchContext();

  const [input, setInput] = useState("");
  const [airingShows, setAiringShows] = useState<Anime[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [isAiringShowsLoading, setIsAiringShowsLoading] =
    useState<boolean>(true);
  const [carouselShows, setCarouselShows] = useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getAiringShows();
  }, []);

  const navigate = useNavigate();
  console.log("Loading: ", isAiringShowsLoading);

  const topAiringAnimeToShow = expanded
    ? airingShows.slice(0, 10)
    : airingShows.slice(0, 5);

  // User searches anime
  const handleAnimeSearch = (event: SyntheticEvent) => {
    event.preventDefault(); //Won't allow page to refresh when you submit input
    search(input).then((searchResult) => {
      setAnimeData(searchResult.data);
      localStorage.setItem(
        "animeSearchResultData",
        JSON.stringify(searchResult.data)
      ); //Allowed to set Strings
      navigate("/results");
    });
  };

  const getAiringShows = async () => {
    try {
      const airingResponse = await fetch(
        `https://api.jikan.moe/v4/seasons/now`
      );
      const airingShowsResult = await airingResponse.json();
      setAiringShows(airingShowsResult.data);

      // Extract carousel images and set loading state to false
      const images = airingShowsResult.data.map((show: Anime) => show);
      setCarouselShows(images);
      setIsAiringShowsLoading(false);
    } catch (error) {
      console.error("Error fetching airing shows", error);
    }
  };

  const handleAiringShowEntryClick = (show) => {
    // When a currently airing entry is clicked user should be directed to single anime page
    // for that entry

    // Can reuse data from airing data fetch
    console.log("Handling Airing Show Entry w/ : ", show);
    setSingle(show);
    localStorage.setItem("singleData", JSON.stringify(show));
    navigate("/single-view");

    return null;
  };

  return (
    <Grid
      container
      className={"home__grid"}
      direction="column"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid
        container
        className={"home__grid-row-1"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid lg={3}></Grid>
        <Grid xs={12} sm={6} md={6} className="home__searchBarImg_container">
          <img
            alt="Gurren Lagann"
            src={`${process.env.PUBLIC_URL}/searchbar_img.jpeg`}
            height={240}
            width={800}
            className="home__searchBarImage"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3} className="home__airing_container">
          <Card className="home__airing" sx={{ backgroundColor: "#424242" }}>
            <CardHeader
              className="home__airing_header home__card_header"
              title="Top Airing Anime"
              action={
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon sx={{ color: "#c2c0c0" }} />
                </IconButton>
              }
            />
            <CardContent className="home__airing_entry_content">
              {topAiringAnimeToShow.map((anime, index) => (
                <div
                  key={index}
                  className="home__airing_entry"
                  onClick={() => handleAiringShowEntryClick(anime)}
                >
                  {}
                  <img
                    src={anime.images.jpg.small_image_url}
                    alt={anime + "small-image-card"}
                    className="home__airing_entry_img"
                  />
                  <strong>{anime.title}</strong>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        className={"home__grid-row-2"}
        justifyContent="center"
        alignItems="center"
      >
        <Grid lg={3}></Grid>
        <Grid xs={12} sm={6} md={6} className="home__searchBar_container">
          <form className="home__form">
            <TextField
              autoFocus={true}
              placeholder="Search for an anime..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="home__input"
              inputProps={{ style: { color: "white" } }}
            ></TextField>
            <IconButton
              className="home__iconButton"
              color="primary"
              type="submit"
              disabled={!input}
              onClick={handleAnimeSearch}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Grid>
        <Grid xs={12} sm={6} md={3} lg={3} className="home__seasonal_container">
          <Card className="home__seasonal" sx={{ backgroundColor: "#424242" }}>
            <CardHeader
              className="home__seasonal_header home__card_header"
              title="Seasonal Anime"
              action={
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon sx={{ color: "#c2c0c0" }} />
                </IconButton>
              }
            />
            <CardContent className="home__seasonal_entry_content">
              {isAiringShowsLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <SwipeableTextMobileStepper shows={carouselShows} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
