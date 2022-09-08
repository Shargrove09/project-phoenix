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
import Friends from "./pages/Friends";
import { SearchContext } from "./context/search";

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

  const setData = (data) => {
    setAnimeData(data);
  };

  const setSingle = (data) => {
    setSingleData(data);
  };

  const search = (searchTerm) => {
    return fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
    ).then((response) => response.json());
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* PASS THIS THEME TO MAIN NAV THEN TO NAV DRAWER*/}
      <SearchContext.Provider
        value={{ search, animeData, singleData, setData, setSingle }}
      >
        <Router>
          <MainNavigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
              <Route path="/single-view" element={<SingleView />} />
              <Route path="/friends" element={<Friends />} />
              {/*Need to add Navigate component here in future*/}
            </Routes>
          </main>
        </Router>
      </SearchContext.Provider>
    </ThemeProvider>
  );
}

export default App;
