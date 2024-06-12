import React, { useEffect, useState } from "react";
import FriendList from "../components/FriendList";
import { useFriendsContext } from "../context/useFriendsContext"; //Wrap imports in curly braces when they aren't default exports
import { Box, Typography } from "@mui/material";
import FriendModal from "../components/FriendModal/FriendModal";

const FriendsView = () => {
  const { validateFriends, setFriendsList, friendsList } = useFriendsContext();
  const [dataExists, setDataExists] = useState(true);

  useEffect(() => {
    validateFriends(friendsList);
    if (friendsList === (undefined || null) || friendsList?.length === 0) {
      try {
        let localStorage_myFriendsData = JSON.parse(
          localStorage.getItem("myFriendsData") || "[]"
        );
        if (localStorage_myFriendsData === null) {
          // Going in this if statement no matter what
          // Handle usecase where user not found?
          throw Error("localStorage data null!");
        } else {
          // Else Unecessary
          setFriendsList(localStorage_myFriendsData);
          setDataExists(true);
        }
      } catch (error) {
        setDataExists(false);
      }
    }
  }, []);

  // Did not add 'friends' as a dependency in order to remove infinite rendering

  // TWO options to fix having to refresh after friend search 1) move handleAdd func from modal to here pass to modal as prop
  // then use that as dependecny for useFfect
  // 2) useFfect dependency for handleClick in FriendModal DIDNT WORK

  return (
    <>
      {/* className="friendsView__modal" <- Removed from friend modal component below*/}
      <FriendModal></FriendModal>
      <Box mt={2}>
        {(dataExists && <FriendList />) || (
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