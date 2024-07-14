import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/useSearchContext";

import {
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Grid, Card, Text } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import { Anime } from "../common/Anime";

import RedditCard from "../components/RedditCard/RedditCard";
import ShowCalendar from "../components/ShowCalendar/ShowSchedule";
import SeasonalCarousel from "../components/SeasonalCarousel/SeasonalCarousel";

import classes from "./Home.module.scss";

const Home = () => {
  const { search, setAnimeData, setSingle, searchById } = useSearchContext();

  const [input, setInput] = useState("");
  const [airingShows, setAiringShows] = useState<Anime[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [isAiringShowsLoading, setIsAiringShowsLoading] =
    useState<boolean>(true);
  const [carouselShows, setCarouselShows] = useState<Anime[]>([]);
  const [selectedDateShows, setSelectedDateShows] = useState<Anime[]>([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getAiringShows();
  }, []);

  useEffect(() => {
    if (airingShows.length > 0) {
      const currentDate = new Date();
      handleDateSelect(currentDate);
    }
  }, [airingShows]);

  const navigate = useNavigate();

  const topAiringAnimeToShow = expanded
    ? airingShows?.slice(0, 10)
    : airingShows?.slice(0, 5);

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

      const verifiedAiringShows = verifyNoAnimeDuplicates(
        airingShowsResult.data
      );
      setAiringShows(verifiedAiringShows);

      console.log("Airing Shows: ", airingShowsResult);

      // Extract carousel images and set loading state to false
      const images = verifiedAiringShows.map((show: Anime) => show);
      setCarouselShows(images);
      setIsAiringShowsLoading(false);
    } catch (error) {
      console.error("Error fetching airing shows", error);
    }
  };

  const verifyNoAnimeDuplicates = (animeList: Anime[]) => {
    const idSet = new Set<number>();
    const animeResults: Anime[] = [];

    for (const obj of animeList) {
      if (!idSet.has(obj.mal_id)) {
        idSet.add(obj.mal_id);
        animeResults.push(obj);
      }
    }

    return animeResults;
  };

  const handleAiringShowEntryClick = async (show: Anime) => {
    // When a currently airing entry is clicked user should be directed to single anime page
    // for that entry

    // Get Complete Anime resource data and provide to single
    const fullShow = await searchById(show.mal_id);

    setSingle(fullShow.data);
    localStorage.setItem("singleData", JSON.stringify(fullShow.data));
    navigate("/single-view");
  };

  const handleDateSelect = (selectedDate: Date) => {
    // Filter shows based on the selected date and update the state
    const filteredShows = airingShows.filter((show) => {
      const startDate = new Date(show.aired.from);
      const numberOfEpisodes = show.episodes || 0;

      // Generate an array of airing dates for the show
      const airingDates = generateAiringDates(startDate, numberOfEpisodes);

      // Check if the selected date is included in the array of airing dates
      return airingDates.some(
        (airingDate) =>
          airingDate.toISOString().split("T")[0] ===
          selectedDate.toISOString().split("T")[0]
      );
    });

    setSelectedDateShows(filteredShows);
  };

  function generateAiringDates(
    startDate: Date,
    numberOfEpisodes: number
  ): Date[] {
    const airingDates: Date[] = [];

    // Iterate through each episode and calculate the airing date
    for (
      let episodeNumber = 1;
      episodeNumber <= numberOfEpisodes;
      episodeNumber++
    ) {
      const airingDate = new Date(startDate);

      // Calculate the number of days to add for each episode
      const daysToAdd = (episodeNumber - 1) * 7;

      // Add the calculated days to the airing date
      airingDate.setDate(startDate.getDate() + daysToAdd);

      airingDates.push(airingDate);
    }

    return airingDates;
  }

  return (
    <>
      <Grid className={classes.home__gridRow1}>
        <Grid.Col
          className={classes.home__scheduleContainer}
          span={{ base: 12, md: 4 }}
        >
          <Card className={classes.home__schedule}>
            <CardHeader
              className={classes.home__card_header}
              title="Daily Schedule"
            />
            <ShowCalendar onDateSelect={handleDateSelect} />{" "}
            {/* Display the shows for the selected date */}
            {selectedDateShows.map((show) => (
              <div
                className={classes.home__scheduledShows}
                key={show.title}
                onClick={() => {
                  handleAiringShowEntryClick(show);
                }}
              >
                {show.title} - {show.broadcast.string}
              </div>
            ))}
          </Card>
        </Grid.Col>
        <Grid.Col
          className={classes.home__formContainer}
          span={{ base: 12, md: 4 }}
        >
          <Text
            className={classes.home__formHeader}
            fw={900}
            gradient={{ from: "yellow", to: "red", deg: 90 }}
            size="xl"
            variant="gradient"
          >
            Project Phoenix
          </Text>
          <form className={classes.home__form}>
            <TextField
              autoFocus={true}
              placeholder="Search for an anime..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className={classes.home__input}
            ></TextField>
            <IconButton
              className={classes.home__iconButton}
              color="primary"
              type="submit"
              disabled={!input}
              onClick={handleAnimeSearch}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Grid.Col>
        <Grid.Col
          className={classes.home__airingContainer}
          span={{ base: 12, md: 4 }}
        >
          <Card className={classes.home__airing}>
            <CardHeader
              className={classes.home__airingHeader}
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
            <CardContent className={classes.home__airingEntryContent}>
              {topAiringAnimeToShow.map((anime, index) => (
                <div
                  key={index}
                  className={classes.home__airingEntry}
                  onClick={() => handleAiringShowEntryClick(anime)}
                >
                  <img
                    src={anime.images.jpg.small_image_url}
                    alt={anime + "small-image-card"}
                    className={classes.home__airingEntryImg}
                  />
                  <strong>{anime.title}</strong>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid className={classes.home__gridRow2}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          {" "}
          <RedditCard />
        </Grid.Col>
        <Grid.Col
          className={classes.home__seasonalContainer}
          span={{ base: 12, md: 6 }}
        >
          <Card className={classes.home__seasonal}>
            <div
              className={
                classes.home__seasonalHeader + classes.home__cardHeader
              }
              title="Seasonal Anime"
            />
            <div className={classes.home__seasonalEntryContent}>
              {isAiringShowsLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <SeasonalCarousel animeList={carouselShows} />
              )}
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Home;
