import React, { useState } from "react";
import { Typography, Paper, ImageListItem, Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { useSearchContext } from "../context/useSearchContext";
import Grid from "@mui/material/Unstable_Grid2";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import "./FriendCard.scss";

interface Props {}

const FriendCard = (props) => {
  const { searchById, setAnimeData } = useSearchContext();
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  console.log("Friend Card Props: ", props);

  let img_url = "BLANK";
  let userName = "NO USER";

  let lastOnline: Date = new Date();
  let lastOnlineDate: Date = new Date();
  let recentlyWatched = [];
  let recentlyRead = [];

  let lastOnlineMonth = 0;
  let lastOnlineDay = 0;
  let lastOnlineYear = 0;

  let friendData = props?.friend || {};

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

    recentlyRead = friendData?.updates?.manga ?? [];

    // Only take Month date year from lastOnline Date object
    let lastOnlineMonth = lastOnline.getUTCMonth() + 1;
    let lastOnlineDay = lastOnline.getUTCDate();
    let lastOnlineYear = lastOnline.getUTCFullYear();
    let lastOnlineDate =
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
      <Grid
        container
        xs={12}
        className={`friendCard ${isFlipped ? "flip" : ""}`}
        sx={{ backgroundColor: "#424242" }}
      >
        {!isFlipped ? (
          <div className={"friendCard__front"}>
            <div className="friendCard__header">
              <StyledAvatar
                className="friendCard__avatar"
                children={undefined}
              />
              <div className="friendCard__header_text">
                <Typography
                  variant="h5"
                  component="h2"
                  className="friendCard__userName"
                >
                  {userName}
                </Typography>
                <Typography className="friendCard__last_online">
                  Last online:{" "}
                  {lastOnlineMonth + "/" + lastOnlineDay + "/" + lastOnlineYear}
                </Typography>
              </div>

              <Button
                className="friendCard__flip_btn"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <AutorenewIcon />
              </Button>
            </div>
            <div className="friendCard__recent_header">Latest Updates</div>
            <Grid
              container
              className="friendCard__recent_grid"
              direction={"row"}
            >
              {/*ANIME ENTRY */}
              <Grid
                container
                className="friendCard__recently_watched"
                xs={6}
                direction={"column"}
              >
                <div style={{ textAlign: "center" }}>Anime Updates </div>
                {recentlyWatched.map(function (anime, idx) {
                  return (
                    <Grid
                      container
                      xs={12}
                      key={idx}
                      className="friendCard__recently_watched_list_item_container"
                    >
                      <img
                        src={anime?.entry.images.jpg.image_url}
                        alt={anime?.entry.title}
                        className="friendCard__recent_thumbnail"
                        onClick={() =>
                          handleRecentlyWatchedImageClick2(anime?.entry.mal_id)
                        }
                      />
                      <Grid
                        xs={6}
                        className="friendCard__recent_info_container"
                      >
                        <a
                          className="friendCard__recent_entry_title friendCard__recent_watched_title"
                          href={anime.entry.url}
                        >
                          {anime?.entry.title.length > 24
                            ? `${anime?.entry.title.substring(0, 24)}...`
                            : anime?.entry.title}
                        </a>
                        <Grid className="friendCard__recently_watched_status">
                          Status:
                          {anime?.status} Score: {anime?.score}
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>

              {/*MANGA ENTRY */}
              <Grid
                className="friendCard__recently_read"
                xs={6}
                direction={"column"}
              >
                <div style={{ textAlign: "center" }}>Manga Updates </div>
                {recentlyRead.map((manga, idx) => {
                  return (
                    <Grid
                      container
                      xs={12}
                      key={idx}
                      className="friendCard__recently_read_list_item_container"
                    >
                      <img
                        src={manga.entry.images.jpg.image_url}
                        alt={manga.entry.title}
                        className="friendCard__recent_thumbnail"
                        onClick={() =>
                          handleRecentlyWatchedImageClick2(manga.entry.mal_id)
                        }
                      />

                      <Grid
                        xs={6}
                        className="friendCard__recent_info_container"
                      >
                        <a
                          className="friendCard__recent_entry_title friendCard__recent_manga_title"
                          href={manga.entry.url}
                        >
                          {manga.entry.title.length > 24
                            ? `${manga.entry.title.substring(0, 24)}...`
                            : manga.entry.title}
                        </a>
                        <Grid className="friendCard__recently_watched_status">
                          Status:
                          {manga.status} Score: {manga.score}
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className="friendCard__back ">
            <Grid className="friendCard__back_container" container>
              Stats
              <Button
                className="friendCard__flip_btn"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <AutorenewIcon />
              </Button>
              <Grid>
                <p>Days Watched: </p>
                <p>Episodes Watched: </p>
                <p>Mean Score: </p>
                <p>Total Entries: </p>
                <p>On Hold: </p>
                <p>Plan to watch: </p>
                <p>Watching: </p>
                <p>Rewatched: </p>
                <p>Dropped: </p>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
      )
    </ImageListItem>
  );
};

export default FriendCard;
