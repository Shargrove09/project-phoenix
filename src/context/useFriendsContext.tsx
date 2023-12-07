// OLD FRIEND CONTEXT
// import { createContext } from "react";

// // Friend Data stores IDs and we load those IDs into the App friendSearch functionality?

// export const FriendsContext = createContext({
//   friendData: [],
//   friendSearch: (data) => ({}),
//   setFriendData: (data) => {},
//   validateFriendData: (data) => {},
// });

import React, { createContext, useContext, useState } from "react";
import { Friend } from "../common/Friend";

interface FriendsContextValue {
  addToFriendsList: (data: any) => void;
  friendsList: any[];
  friendSearch: (friendName: string) => Promise<any>;
  setFriendsList: React.Dispatch<React.SetStateAction<any[]>>;
  validateFriends: (dataArr) => void;
}

interface Props {
  children: React.ReactNode;
}

const FriendsContext = createContext<FriendsContextValue>(undefined);

export const FriendsProvider: React.FC<Props> = ({ children }) => {
  // TODO: Type this appropriately
  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const addToFriendsList = (newFriendData: Friend) => {
    console.log("Friend Data to be added in app", newFriendData);

    if (friendsList.indexOf(newFriendData) === -1) {
      console.log("APP if entered");
      setFriendsList((friendData) => [...friendData, newFriendData]);
    }
    console.log("Friend Data after push in App", friendsList);
  };

  const validateFriends = (dataArr) => {
    console.log("dataArr in App", dataArr);
    const validatedFriendArray = [];

    const unique = dataArr.filter((element) => {
      const isDuplicate = validatedFriendArray.includes(element.mal_id);

      if (!isDuplicate) {
        validatedFriendArray.push(element.mal_id);
        return true;
      }
      return false;
    });

    setFriendsList(unique);
  };

  const friendSearch = async (friendName: string) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/users/${friendName}/full`
    );

    return await response.json();
  };

  return (
    <FriendsContext.Provider
      value={{
        addToFriendsList,
        friendsList,
        setFriendsList,
        friendSearch,
        validateFriends,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriendsContext = () => useContext(FriendsContext);
