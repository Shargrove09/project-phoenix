import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import SingleView from "./pages/SingleView";
import MainNavigation from "./components/MainNavigation";
import FriendsView from "./pages/FriendsView";
import { SearchContext } from "./context/search";
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
    //setFriendListData((friendData) => [...friendData, data]);
    // console.log("New Friend Data: ", friendData);

    console.log("Friend Data before push in App", friendData);
    setFriendListData(data);
    console.log("Friend Data after push in App", friendData);
  };

  const search = (searchTerm) => {
    return fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
    ).then((response) => response.json());
  };

  const friendSearch = (friendName) => {
    // Do I need an async function?
    return fetch(`https://api.jikan.moe/v4/users/${friendName}/full`).then(
      (response) => response.json()
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchContext.Provider
        value={{ search, animeData, singleData, setData, setSingle }}
      >
        <FriendsContext.Provider
          value={{ friendData, setFriendData, friendSearch }}
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
      </SearchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
