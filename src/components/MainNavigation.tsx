// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSearchContext } from "../context/useSearchContext";
// import { AppBar, Toolbar, Typography, Grid, alpha } from "@mui/material";

// import InputBase from "@mui/material/InputBase";
// import { Theme, makeStyles, useTheme } from "@mui/material/styles";
// import SearchIcon from "@material-ui/icons/Search";

// import NavDrawer from "./NavDrawer";

// import "./MainNavigation.scss";

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 20001,
//   },
//   toolbar: theme.mixins.toolbar,
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     display: "none",
//     textDecoration: "none",
//     color: "white",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

// export default function SearchAppBar() {
//   //const classes = useStyles();
//   const navigate = useNavigate();

//   const { search, setAnimeData } = useSearchContext();

//   const [input, setInput] = useState("");

//   const handleSearch = (event) => {
//     event.preventDefault();
//     search(input).then((data) => {
//       setAnimeData(data.data);
//       localStorage.setItem("animeSearchResultData", JSON.stringify(data.data));
//       setInput("");
//       navigate("/results");
//     });
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="sticky" className={classes.appBar}>
//         <Toolbar className="MainNavigation__toolbar">
//           <Grid container direction="row">
//             <Grid item>
//               <NavDrawer />
//             </Grid>

//             <Grid item className="MainNavigation__logoContainer">
//               <Link to="/" className={classes.title}>
//                 <img
//                   alt="Gurren Lagann"
//                   src={`${process.env.PUBLIC_URL}/gurren_lagann_logo.png`}
//                   height={25}
//                   width={25}
//                   className="MainNavigation__logo"
//                 />
//               </Link>
//             </Grid>
//             <Grid item>
//               <Typography variant="h6" noWrap>
//                 Project Phoenix
//               </Typography>
//             </Grid>
//           </Grid>
//           <form className={classes.search} onSubmit={handleSearch}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ "aria-label": "search" }}
//               value={input}
//               onChange={(event) => setInput(event.target.value)}
//             />
//           </form>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
