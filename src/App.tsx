import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results/Results";
import SingleView from "./pages/SingleView";
import MainNavigation from "./components/MainNavigation";
import FriendsView from "./pages/FriendsView";
import { SearchProvider } from "./context/useSearchContext";
import { FriendsProvider } from "./context/useFriendsContext";

import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import from @mui/material
import CssBaseline from "@mui/material/CssBaseline"; // Import CssBaselin

import "./App.css";

<link
  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,600&display=swap"
  rel="stylesheet"
/>;

const theme = createTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#3A3A3A ",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchProvider>
        <FriendsProvider>
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
        </FriendsProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
