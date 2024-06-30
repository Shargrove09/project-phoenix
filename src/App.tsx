import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results/Results";
import SingleView from "./pages/SingleView";
// import MainNavigation from "./components/MainNavigation";
import FriendsView from "./pages/FriendsView";
import { SearchProvider } from "./context/useSearchContext";
import { FriendsProvider } from "./context/useFriendsContext";

import { createTheme, MantineProvider, virtualColor } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./App.css";
import MainToolBar from "./components/MainToolBar/MainToolBar";

<>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,600&display=swap"
    rel="stylesheet"
  />
</>;


const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "pink",
      light: "cyan",
    }),
    background: virtualColor({
      name: "primary",
      dark: "pink",
      light: "cyan",
    }),
    brand: [
      "#f8f9fa", // Shade 0: Lightest
      "#e9ecef", // Shade 1
      "#dee2e6", // Shade 2
      "#ced4da", // Shade 3
      "#adb5bd", // Shade 4
      "#6c757d", // Shade 5
      "#495057", // Shade 6
      "#343a40", // Shade 7
      "#212529", // Shade 8
      "#121416", // Shade 9: Darkest
    ],
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <SearchProvider>
        <FriendsProvider>
          <Router>
            <MainToolBar />
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
    </MantineProvider>
  );
}

export default App;
