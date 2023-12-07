import * as React from "react";
import { Typography, Paper, ImageListItem, Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { useSearchContext } from "../context/useSearchContext";

import "./FriendCard.scss";

const backUpImg = () => {
  return (
    <img
      alt="Gurren Lagann"
      src={`${process.env.PUBLIC_URL}/gurren_lagann_logo.png`}
      height={25}
      width={25}
      className="MainNavigation__logo"
    />
  );
};

const FriendCard = (props) => {
  // const jikanjs = require("@mateoaranda/jikanjs"); Do this later

  const { searchById, setAnimeData } = useSearchContext();

  var img_url = "BLANK";
  var userName = "NO USER";
  // TODO: get right date
  var lastOnline: Date = new Date();
  var recentlyWatched = [];
  var recentlyRead = [];

  console.log("props in FRIEND CARD", props);
  var friendData = props?.friend || {};

  if (!props.isLoading) {
    img_url = friendData?.images?.jpg?.image_url || backUpImg; // Try 225 x 334
    userName = friendData?.username || "NULL";
    lastOnline = new Date(friendData?.last_online);

    // recentlyWatched = friendData?.updates.anime;

    // recentlyRead = friendData?.updates.manga;

    // Only take Month date year from lastOnline Date object
    var lastOnlineMonth = lastOnline.getUTCMonth() + 1;
    var lastOnlineDay = lastOnline.getUTCDate();
    var lastOnlineYear = lastOnline.getUTCFullYear();
    var lastOnlineDate =
      lastOnlineMonth + "/" + lastOnlineDay + "/" + lastOnlineYear;
  }

  const StyledAvatar = ({ children, ...props }) => (
    <Avatar
      variant="rounded"
      sx={{ height: "180px", width: "180px", display: "inline-block" }}
      {...props}
    >
      <img src={img_url} alt={userName} />
      {children}
    </Avatar>
  );

  /*
  const handleRecentlyWatchedImageClick = (mal_id) => {
    console.log("MAL ID ", mal_id);
    /*
    search.searchById(mal_id).then((data) => {
      search.setData(data.results);
      localStorage.setItem("animeSearchResultData", JSON.stringify(data.results));
      navigate("/results");
    }); 
  }; */

  function handleRecentlyWatchedImageClick2(mal_id) {
    console.log("MAL ID ", mal_id);
    //event.preventDefault();
    searchById(mal_id).then((data) => {
      setAnimeData(data.results);
      localStorage.setItem(
        "animeSearchResultData",
        JSON.stringify(data.results)
      );
    });
  }

  return (
    <ImageListItem className="friendCard__container">
      <Grid container item xs={12}>
        <Paper className="friendCard__paper">
          <div className="friendCard__header">
            {" "}
            {/* Grid Item Applicable*/}
            <StyledAvatar className="friendCard__avatar" children={undefined} />
            <Typography
              variant="h5"
              component="h2"
              className="friendCard__userName"
            >
              {userName}
            </Typography>
            <Typography className="friendCard__lastOnline">
              Last online: {lastOnlineDate}
            </Typography>
          </div>
          <div style={{ margin: "auto", width: "auto", paddingTop: "5px" }}>
            Latest Updates{" "}
          </div>
          <Grid container className="friendCard__recentGrid">
            <Grid item container className="friendCard__recentlyWatched" xs={6}>
              <div style={{ textAlign: "center" }}>Anime Updates </div>
              {/* Need a component for recentlyWatchedList and then for recentlyWatched Anime*/}
              {recentlyWatched.map(function (anime, idx) {
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    key={idx}
                    className="friendCard__recentlyWatchedListItemContainer"
                    spacing={0}
                  >
                    <Grid
                      item
                      xs={4}
                      className="friendCard__recentlyWatchedListThumbnail"
                    >
                      <img
                        src={anime?.entry.images.jpg.image_url}
                        alt={anime?.entry.title}
                        className="friendCard__recentlyWatchedThumbnail"
                        onClick={() =>
                          handleRecentlyWatchedImageClick2(anime?.entry.mal_id)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className="friendCard__recentlyWatchedInfoContainer"
                    >
                      <a
                        className="friendCard__recentlyWatchedTitle"
                        href={anime.entry.url}
                      >
                        {anime?.entry.title.length > 24
                          ? `${anime?.entry.title.substring(0, 24)}...`
                          : anime?.entry.title}
                      </a>
                      <Grid item className="friendCard__recentlyWatchedStatus">
                        Status:
                        {anime?.status} Score: {anime?.score}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>

            {/*MANGA ENTRY */}
            <Grid item className="friendCard__recentlyRead" xs={6}>
              <div style={{ textAlign: "center" }}>Manga Updates </div>
              {/* Need a component for recentlyWatchedList and then for recentlyWatched Anime*/}
              {recentlyRead.map((manga, idx) => {
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    key={idx}
                    className="friendCard__recentlyWatchedListItemContainer"
                    spacing={0}
                  >
                    <Grid
                      item
                      xs={4}
                      className="friendCard__recentlyWatchedListThumbnail"
                    >
                      <img
                        src={manga.entry.images.jpg.image_url}
                        alt={manga.entry.title}
                        className="friendCard__recentlyWatchedThumbnail"
                        onClick={() =>
                          handleRecentlyWatchedImageClick2(manga.entry.mal_id)
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className="friendCard__recentlyWatchedInfoContainer"
                    >
                      <a
                        className="friendCard__recentlyWatchedTitle"
                        href={manga.entry.url}
                      >
                        {manga.entry.title.length > 24
                          ? `${manga.entry.title.substring(0, 24)}...`
                          : manga.entry.title}
                      </a>
                      <Grid item className="friendCard__recentlyWatchedStatus">
                        Status:
                        {manga.status} Score: {manga.score}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </ImageListItem>
  );
};

export default FriendCard;
