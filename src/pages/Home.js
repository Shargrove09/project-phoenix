import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/search";
import { FormControl, Input, IconButton, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import "./Home.scss";

const Home = () => {
  const search = useContext(SearchContext);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); //Won't allow page to refresh when you submit input
    search.search(input).then((data) => {
      search.setData(data.data); // Should try data.data.results (Actually results doesnt exist in v4)
      localStorage.setItem("myData", JSON.stringify(data.data)); //Allowed to set Strings
      navigate("/results");
    });
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <Grid item>
          <img
            alt="Gurren Lagann"
            src={`${process.env.PUBLIC_URL}/searchbar_img.jpeg`}
            height={240}
            width={800}
            className="home__searchBarImage"
          />
        </Grid>
        <Grid item>
          <form className="home__form">
            <FormControl type="submit" className="home__formControl">
              <Input
                placeholder="Search for an anime..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="home__input"
              />
              {/*Getting what's inside of event*/}
              <IconButton
                className="home__iconButton"
                variant="contained"
                color="primary"
                type="submit"
                disabled={!input}
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
