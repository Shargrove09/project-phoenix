import * as React from "react";
import {
  Typography,
  Link,
  Paper,
  ImageListItem,
  Grid,
  Button,
} from "@material-ui/core";
import { Avatar } from "@mui/material";
import { SearchContext } from "../context/search";
import { useNavigate } from "react-router-dom";

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

const FriendsCard = (props) => {
  // const jikanjs = require("@mateoaranda/jikanjs"); Do this later

  const search = React.useContext(SearchContext);
  const navigate = useNavigate();

  var img_url = "BLANK";
  var userName = "NO USER";
  var lastOnline = "No Date";
  var recentlyWatched = [];
  var recentlyRead = [];

  console.log("props in FRIEND CARD", props);
  var friendData = props?.friend || {};
  console.log("Non context FriendData in FriendCard", friendData);

  if (!props.isLoading) {
    img_url = friendData?.images?.jpg?.image_url || backUpImg; // Try 225 x 334
    userName = friendData?.username || "NULL";
    lastOnline = new Date(friendData?.last_online);
    recentlyWatched = friendData?.updates.anime;
    recentlyRead = friendData?.updates.manga;

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
      localStorage.setItem("myData", JSON.stringify(data.results));
      navigate("/results");
    }); 
  }; */

  function handleRecentlyWatchedImageClick2(mal_id, event) {
    console.log("MAL ID ", mal_id);
    event.preventDefault();
    search.searchById(mal_id).then((data) => {
      search.setData(data.results);
      console.log("searchDATA FROM FRIENDS", search.animeData);
      localStorage.setItem("myData", JSON.stringify(data.results));
    });
  }

  return (
    <ImageListItem className="friendCard__container">
      <Grid container item xs={12}>
        <Paper className="friendCard__paper">
          <div className="friendCard__header">
            {" "}
            {/* Grid Item Applicable*/}
            <StyledAvatar className="friendCard__avatar" />
            <Typography
              variant="h5"
              component="h2"
              className="friendCard__userName"
            >
              {userName}
            </Typography>
            <Typography
              component="subtitle2"
              className="friendCard__lastOnline"
            >
              Last online: {lastOnlineDate}
            </Typography>
          </div>
          <div style={{ margin: "auto", width: "auto" }}>Latest Updates </div>
          <Grid container className="friendCard__recentGrid">
            <Grid item container className="friendCard__recentlyWatched" xs={6}>
              Anime Updates <br />
              {/* Need a component for recentlyWatchedList and then for recentlyWatched Anime*/}
              {recentlyWatched.map(function (anime, idx) {
                return (
                  <Grid
                    container
                    item
                    className="friendCard__recentlyWatchedContainer"
                    direction="row"
                    wrap="nowrap"
                    xs={12}
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      flexWrap="nowrap"
                      wrap="nowrap"
                    >
                      <Grid item container xs={12} direction="row">
                        <li key={idx} className="recentlyWatchedListItem">
                          <Grid item xs={6}>
                            <img
                              src={anime.entry.images.jpg.image_url}
                              alt={anime.entry.title}
                              className="friendCard__recentlyWatchedThumbnail"
                              onClick={() =>
                                handleRecentlyWatchedImageClick2(
                                  anime.entry.mal_id
                                )
                              }
                            />
                          </Grid>
                          <Grid
                            item
                            className="friendCard__recentlyWatchedTitleContainer"
                            xs={6}
                          >
                            <a
                              //className="friendCard__recentlyWatchedTitle"
                              href={anime.entry.url}
                            >
                              {anime.entry.title}{" "}
                            </a>
                          </Grid>
                          <Grid /*className="friendCard__recentlyWatchedInfo"*/>
                            Status: Completed
                            {anime.entry.status} {anime.score}
                          </Grid>
                          <Grid /*className="friendCard__recentlyWatchedInfo"*/>
                            Score:
                            {anime.score}
                          </Grid>
                        </li>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>

            {/*MANGA ENTRY!!!!!!!!! */}
            <Grid item className="friendCard__recentlyRead" xs={6}>
              Manga Updates <br />
              {/* Need a component for recentlyWatchedList and then for recentlyWatched Anime*/}
              {recentlyRead.map(function (anime, idx) {
                return (
                  <Grid className="friendCard__recentlyWatchedEntry">
                    <Grid item>
                      <li key={idx}>
                        {" "}
                        <img
                          src={anime.entry.images.jpg.image_url}
                          alt={anime.entry.title}
                          className="friendCard__recentlyWatchedThumbnail"
                          onClick={() =>
                            handleRecentlyWatchedImageClick2(anime.entry.mal_id)
                          }
                        />
                        <a
                          className="friendCard__recentlyWatchedTitle"
                          href={anime.entry.url}
                        >
                          {anime.entry.title}{" "}
                        </a>
                        <Grid
                          item /*className="friendCard__recentlyWatchedInfo"*/
                        >
                          Status: Completed
                          {anime.entry.status} {anime.score}
                        </Grid>
                        <div /*className="friendCard__recentlyWatchedInfo"*/>
                          Score:
                          {anime.score}
                        </div>
                      </li>
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

export default FriendsCard;
