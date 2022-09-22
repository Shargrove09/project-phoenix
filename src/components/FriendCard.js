import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Link,
  Paper,
  ImageListItem,
  Grid,
} from "@material-ui/core";
import { Avatar } from "@mui/material";

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
  console.log("Props in FriendCard", props);
  var img_url = "BLANK";
  let userName = "NO USER";

  if (!props.isLoading) {
    img_url = props.image_url || backUpImg;
    userName = props.username;
  }

  const StyledAvatar = ({ children, ...props }) => (
    <Avatar
      sx={{ height: "180px", width: "180px", display: "inline-block" }}
      {...props}
    >
      <img src={img_url} alt={"User Profile Pic"} />
      {children}
    </Avatar>
  );

  return (
    <ImageListItem className="friendCard__container">
      <Grid container item xs={12}>
        <Paper className="friendCard__paper">
          <StyledAvatar className="friendCard__avatar" />
          <Typography
            variant="h5"
            component="h2"
            className="friendCard__userName"
          >
            {userName}
          </Typography>
        </Paper>
      </Grid>
    </ImageListItem>
  );
};

export default FriendsCard;
