import React from "react";
import FriendCard from "./FriendCard";
import { ImageList } from "@material-ui/core";

const FriendList = (props) => {
  // console.log("Props.data in FriendsList", props.data[0]);
  return (
    <ImageList>
      {props.data?.map((friend) => (
        <FriendCard
        // key={friend.mal_id}
        // username={friend.username}
        //image_url={friend.images.jpg.image_url}
        />
      ))}
    </ImageList>
  );
};

export default FriendList;
