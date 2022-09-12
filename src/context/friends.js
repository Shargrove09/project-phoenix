import { createContext } from "react";

export const FriendsContext = createContext({
  friendsData: [],
  setFriendsData: () => [],
});
