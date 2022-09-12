import React from "react";
import FriendCard from "./FriendCard";
import { ImageList } from "@material-ui/core";

const AnimeList = (props) => {
  return (
    <ImageList>
      {props.data.map((friend) => (
        <FriendCard key={friend.mal_id} username={friend.username} />
      ))}
    </ImageList>
  );
};

export default AnimeList;
