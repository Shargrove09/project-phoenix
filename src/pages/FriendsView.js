import React, { useEffect, useContext, useState } from "react";
import FriendList from "../components/FriendList";
import { FriendsContext } from "../context/friends"; //Wrap imports in curly braces when they aren't default exports
import { Box, Typography } from "@material-ui/core";
import FriendModal from "../components/FriendModal/FriendModal";

const FriendsView = () => {
  const friends = useContext(FriendsContext);
  const [dataExists, setDataExists] = useState(true);

  useEffect(() => {
    console.log("FriendsData", friends.friendData);
    if (
      friends.friendData === (undefined || null) ||
      friends.friendData?.length === 0
    ) {
      try {
        var localStorage_myFriendsData = JSON.parse(
          localStorage.getItem("myFriendsData")
        );
        if (localStorage_myFriendsData === null)
          throw Error("localStorage data null!");
        friends.setFriendData(localStorage_myFriendsData);
        setDataExists(true);
      } catch (error) {
        setDataExists(false);
      }
    }
  }, [friends]);

  // TWO options to fix having to refresh after friend search 1) move handleAdd func from modal to here pass to modal as prop
  // then use that as dependecny for useFfect
  // 2) useFfect dependency for handleClick in FriendModal DIDNT WORK

  return (
    <>
      <FriendModal className="friendsView_modal"></FriendModal>
      <Box mt={2}>
        {(dataExists && <FriendList data={friends.friendData} />) || (
          <Typography variant="h4">
            No friends loaded. Click The "Add Friends" button to add some
            friends here!
          </Typography>
        )}
      </Box>
    </>
  );
};

export default FriendsView;
