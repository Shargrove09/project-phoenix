import { Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ImageList } from "@material-ui/core";
import { FriendsContext } from "../context/friends";
import FriendCard from "../components/FriendCard";

const FriendsView = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [friendsDataExists, setFriendsDataExists] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Can use context when consuming friends in other part of app for now not needed
  const friends = useContext(FriendsContext);

  //UseState to take input to get new Friends
  useEffect(() => {
    setLoading(true);

    fetch(`https://api.jikan.moe/v4/users/Shoujo-ai/full`)
      .then((response) => response.json())
      .then((data) => {
        setFriendsData([...friendsData, data]);
        setFriendsDataExists(true);
      });

    setLoading(false);
  }, []);

  console.log("Friends Data: ", friendsData);

  return isLoading ? (
    <div> LOADING </div>
  ) : (
    <div>
      {(friendsDataExists &&
        friendsData.map((data) => (
          <FriendCard data={data} isLoading={isLoading} />
        ))) || (
        <Typography variant="h4" component="h2">
          No Friends Data
        </Typography>
      )}
    </div>
  );
};

export default FriendsView;
