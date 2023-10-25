import { createContext } from "react";

// Friend Data stores IDs and we load those IDs into the App friendSearch functionality?

export const FriendsContext = createContext({
  friendData: [],
  friendSearch: (data) => ({}),
  setFriendData: (data) => {},
  validateFriendData: (data) => {},
});
