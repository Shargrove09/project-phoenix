import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results/Results";
import SingleView from "./pages/SingleView";
import FriendsView from "./pages/FriendsView";
import { SearchProvider } from "./context/useSearchContext";
import { FriendsProvider } from "./context/useFriendsContext";
import { createTheme, MantineProvider } from "@mantine/core";
import MainToolBar from "./components/MainToolBar/MainToolBar";
import { ColorSchemeProvider } from "./context/useColorSchemeContext";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./App.css";

<>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,600&display=swap"
    rel="stylesheet"
  />
</>;

const theme = createTheme({
  primaryColor: "cyan",
  primaryShade: { dark: 6, light: 7 },
});

function App() {
  return (
    <ColorSchemeProvider>
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
    </ColorSchemeProvider>
  );
}

export default App;
