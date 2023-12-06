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

interface FriendsContextValue {
  addFriend: (data: any) => void;
  friendsList: any[];
  friendSearch: (data) => Promise<any>;
  setFriendsList: React.Dispatch<React.SetStateAction<any[]>>;
  validateFriends: (dataArr) => void;
}

interface Props {
  children: React.ReactNode;
}

const FriendsContext = createContext<FriendsContextValue>(undefined);

export const FriendsProvider: React.FC<Props> = ({ children }) => {
  // TODO: Type this appropriately
  const [friendsList, setFriendsList] = useState<any[]>([]);

  const addFriend = (data) => {
    console.log("Friend Data to be added in app", data);

    if (friendsList.indexOf(data) === -1) {
      console.log("APP if entered");
      setFriendsList((friendData) => [...friendData, data]);
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

  const friendSearch = async (friendName) => {
    // Do I need an async function?
    const response = await fetch(
      `https://api.jikan.moe/v4/users/${friendName}/full`
    );
    return await response.json();
  };

  return (
    <FriendsContext.Provider
      value={{
        addFriend,
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
