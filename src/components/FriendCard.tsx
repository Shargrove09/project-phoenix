import * as React from "react";
import { Typography, Paper, ImageListItem, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { useSearchContext } from "../context/useSearchContext";
import Grid from "@mui/material/Unstable_Grid2";

import "./FriendCard.scss";

interface Props {}

const FriendCard = (props) => {
  const { searchById, setAnimeData } = useSearchContext();
  console.log("props in friend card", props);

  var img_url = "BLANK";
  var userName = "NO USER";

  var lastOnline: Date = new Date();
  var recentlyWatched = [];
  var recentlyRead = [];

  var friendData = props?.friend || {};

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

  if (!props.isLoading) {
    img_url = friendData?.images?.jpg?.image_url || backUpImg; // Try 225 x 334
    userName = friendData?.username || "NULL";
    lastOnline = new Date(friendData?.last_online);

    recentlyWatched = friendData?.updates?.anime ?? [];

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
    <ImageListItem className="friendCard__listItem">
      <Grid container xs={12}>
        <Paper
          className="friendCard__paper"
          sx={{ backgroundColor: "#424242" }}
        >
          <div className="friendCard__header">
            {/* Grid Item Applicable*/}
            <StyledAvatar className="friendCard__avatar" children={undefined} />
            <Typography
              variant="h5"
              component="h2"
              className="friendCard__userName"
            >
              {userName}
            </Typography>
            <Typography className="friendCard__last_online">
              Last online: {lastOnlineDate}
            </Typography>
            <Button>F</Button>
          </div>
          <div className="friendCard__recent_header">Latest Updates</div>
          <Grid container className="friendCard__recent_grid">
            <div
              style={{
                margin: "auto",
                width: "auto",

                color: "#C2C0C0",
              }}
            ></div>
            <Grid container className="friendCard__recently_watched" xs={6}>
              <div style={{ textAlign: "center" }}>Anime Updates </div>
              {recentlyWatched.map(function (anime, idx) {
                return (
                  <Grid
                    container
                    xs={12}
                    key={idx}
                    className="friendCard__recently_watched_list_item_container"
                    spacing={0}
                  >
                    <img
                      src={anime?.entry.images.jpg.image_url}
                      alt={anime?.entry.title}
                      className="friendCard__recentlyWatchedThumbnail"
                      onClick={() =>
                        handleRecentlyWatchedImageClick2(anime?.entry.mal_id)
                      }
                    />
                    <Grid
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
                      <Grid className="friendCard__recentlyWatchedStatus">
                        Status:
                        {anime?.status} Score: {anime?.score}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>

            {/*MANGA ENTRY */}
            <Grid className="friendCard__recentlyRead" xs={6}>
              <div style={{ textAlign: "center" }}>Manga Updates </div>
              {/* Need a component for recentlyWatchedList and then for recentlyWatched Anime*/}
              {recentlyRead.map((manga, idx) => {
                return (
                  <Grid
                    container
                    xs={12}
                    key={idx}
                    className="friendCard__recentlyWatchedListItemContainer"
                    spacing={0}
                  >
                    <Grid
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
                      <Grid className="friendCard__recentlyWatchedStatus">
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
