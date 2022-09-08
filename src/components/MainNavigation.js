import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import NavDrawer from "../components/NavDrawer";

import "./MainNavigation.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 20001,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    textDecoration: "none",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const search = useContext(SearchContext);
  const [input, setInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    search.search(input).then((data) => {
      search.setData(data.results);
      localStorage.setItem("myData", JSON.stringify(data.results));
      setInput("");
      navigate("/results");
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className="MainNavigation__toolbar">
          <Link to="/" className={classes.title}>
            <Grid container>
              <Grid item>
                <NavDrawer />
              </Grid>
              <Grid item>
                <img
                  alt="Gurren Lagann"
                  src={`${process.env.PUBLIC_URL}/gurren_lagann_logo.png`}
                  height={25}
                  width={25}
                  className="MainNavigation__logo"
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" noWrap>
                  Project Phoenix - WWA Hub
                </Typography>
              </Grid>
            </Grid>
          </Link>
          <form className={classes.search} onSubmit={handleSearch}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}
