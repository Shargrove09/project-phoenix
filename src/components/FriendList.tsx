import React from "react";
import FriendCard from "./FriendCard";
import { ImageList } from "@material-ui/core";

const FriendList = (props) => {
  return (
    <ImageList style={{ justifyContent: "center" }}>
      {props.data[0]?.map((friend) => (
        <FriendCard key={friend?.mal_id} friend={friend} />
      ))}
    </ImageList>
  );
};

export default FriendList;
