import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import SingleView from "./pages/SingleView";
import MainNavigation from "./components/MainNavigation";
import FriendsView from "./pages/FriendsView";
import { SearchProvider } from "./context/useSearchContext";
import { FriendsContext } from "./context/friends";

import { createTheme, ThemeProvider } from "@material-ui/core";

import "./App.css";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const [animeData, setAnimeData] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [friendData, setFriendListData] = useState([]);

  const setData = (data) => {
    setAnimeData(data);
  };

  const setSingle = (data) => {
    setSingleData(data);
  };

  const setFriendData = (data) => {
    console.log("Friend Data to be added in app", data);

    if (friendData.indexOf(data) === -1) {
      console.log("APP if entered");
      setFriendListData((friendData) => [...friendData, data]);
    }
    console.log("Friend Data after push in App", friendData);
  };

  const search = async (searchTerm) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
    );
    return await response.json();
  };

  const searchById = async (searchId) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${searchId}/full`
    );
    return await response.json();
  };

  const friendSearch = async (friendName) => {
    // Do I need an async function?
    const response = await fetch(
      `https://api.jikan.moe/v4/users/${friendName}/full`
    );
    return await response.json();
  };

  const validateFriendData = (dataArr) => {
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

    setFriendListData(unique);
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <FriendsContext.Provider
          value={{
            friendData,
            setFriendData,
            friendSearch,
            validateFriendData,
          }}
        >
          <Router>
            <MainNavigation />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
                <Route path="/single-view" element={<SingleView />} />
                <Route path="/friends" element={<FriendsView />} />
                {/*Need to add Navigate component here in future*/}
              </Routes>
            </main>
          </Router>
        </FriendsContext.Provider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
