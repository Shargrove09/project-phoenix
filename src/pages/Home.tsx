import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/useSearchContext";
import { IconButton, Grid, TextField } from "@material-ui/core";
import { FormControl } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";

import "./Home.scss";

const Home = () => {
  const { search, setData } = useSearchContext();
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); //Won't allow page to refresh when you submit input
    search(input).then((data) => {
      console.log("Search Data", data);
      setData(data.data); // Should try data.data.results (Actually results doesnt exist in v4)
      localStorage.setItem("myData", JSON.stringify(data.data)); //Allowed to set Strings
      navigate("/results");
    });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
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
          {/* <form className="home__form">
            <FormControl type="submit" className="home__formControl">
              <TextField
                autoFocus="true"
                placeholder="Search for an anime..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="home__input"
                inputProps={{ style: { color: "white" } }}
              />
              {/*Getting what's inside of event*
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
          </form> */}
          <form className="home__form">
            <TextField
              autoFocus={true}
              placeholder="Search for an anime..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="home__input"
              inputProps={{ style: { color: "white" } }}
            ></TextField>
            <IconButton
              className="home__iconButton"
              color="primary"
              type="submit"
              disabled={!input}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
