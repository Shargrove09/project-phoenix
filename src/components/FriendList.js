import React, { useEffect, useContext } from "react";
import FriendCard from "./FriendCard";
import { ImageList } from "@material-ui/core";
import { FriendsContext } from "../context/friends";

const FriendList = (props) => {
  console.log("Props in FriendsList", props);
  console.log("Props[0] in FriendsList", props.data[0]);
  return (
    <ImageList style={{ justifyContent: "center" }}>
      {props.data[0]?.map((friend) => (
        <FriendCard key={friend?.mal_id} friend={friend} />
      ))}
    </ImageList>
  );
};

export default FriendList;
