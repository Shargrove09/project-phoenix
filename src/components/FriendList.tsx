import React, { useEffect } from "react";
import FriendCard from "./FriendCard";
import { ImageList } from "@mui/material";
import { useFriendsContext } from "../context/useFriendsContext";

const FriendList = (props) => {
  const { friendsList } = useFriendsContext();

  useEffect(() => {}, [friendsList]);

  return (
    <ImageList cols={3} style={{ justifyContent: "center" }}>
      {friendsList.map((friend) => (
        <FriendCard key={friend?.mal_id} friend={friend} />
      ))}
    </ImageList>
  );
};

export default FriendList;
