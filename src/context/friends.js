import { createContext } from "react";

export const FriendContext = createContext({
  friendsData: [],
  singleData: {},
  setFriendsData: () => [],
});
