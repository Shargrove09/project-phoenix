import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  SwipeableDrawer,
  Typography,
  Toolbar,
  Box,
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
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
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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

const CustomSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#3A3A3A",
    zIndex: theme.zIndex.appBar - 1, // Adjust the z-index to stack the drawer below the app bar
  },
}));

export default function SearchAppBar() {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key == "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsNavDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Project Phoenix
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <CustomSwipeableDrawer
        anchor="left"
        open={isNavDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        color="#3A3A3A"
      >
        <List>
          <ListItem
            disablePadding
            component={Link}
            to={"/"}
            style={{ color: "white" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon className="navDrawer__icon" />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            component={Link}
            to={"/results"}
            style={{ color: "white" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ContentPasteSearchIcon className="navDrawer__icon" />
              </ListItemIcon>
              <ListItemText primary={"Results"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            component={Link}
            to={"/single-view"}
            style={{ color: "white" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <SavedSearchIcon className="navDrawer__icon" />
              </ListItemIcon>
              <ListItemText primary={"Last Searched Anime"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            component={Link}
            to={"/friends"}
            style={{ color: "white" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon className="navDrawer__icon" />
              </ListItemIcon>
              <ListItemText primary={"Friends"} />
            </ListItemButton>
          </ListItem>
        </List>
      </CustomSwipeableDrawer>
    </Box>
  );
}
