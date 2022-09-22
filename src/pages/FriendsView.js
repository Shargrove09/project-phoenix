import React, { useEffect, useContext, useState } from "react";
import FriendList from "../components/FriendList";
import { FriendsContext } from "../context/friends"; //Wrap imports in curly braces when they aren't default exports
import { Box, Typography } from "@material-ui/core";
import FriendModal from "../components/FriendModal/FriendModal";

const FriendsView = () => {
  const friends = useContext(FriendsContext);
  const [dataExists, setDataExists] = useState(true);

  console.log("FriendsData from context", friends.friendData);

  useEffect(() => {
    if (friends.friendData === undefined || friends.friendData.length === 0) {
      try {
        friends.setFriendData(
          JSON.parse(localStorage.getItem("myFriendsData"))
        );
        setDataExists(true);
      } catch (error) {
        console.log(error);
        setDataExists(false);
      }
    }
  }, [friends]);

  return (
    <>
      <FriendModal className="friendsView_modal"></FriendModal>
      <Box mt={2}>
        {(dataExists && <FriendList data={friends.friendData} />) || (
          <Typography variant="h4">Data does not exist</Typography>
        )}
      </Box>
    </>
  );
};

export default FriendsView;
