// import * as React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import PeopleIcon from "@mui/icons-material/People";
// import HomeIcon from "@mui/icons-material/Home";
// import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
// import SavedSearchIcon from "@mui/icons-material/SavedSearch";
// import { IconButton } from "@mui/material";
// import { makeStyles } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";

// import "./NavDrawer.scss";

// const useStyles = makeStyles((theme) => ({
//   toolbar: theme.mixins.toolbar,

//   root: {
//     color: "blue",
//   },
// }));

// export default function TemporaryDrawer() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({
//     left: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
// <List>
//   <ListItem
//     disablePadding
//     component={Link}
//     to={"/"}
//     style={{ color: "white" }}
//   >
//     <ListItemButton>
//       <ListItemIcon>
//         <HomeIcon className="navDrawer__icon" />
//       </ListItemIcon>
//       <ListItemText primary={"Home"} />
//     </ListItemButton>
//   </ListItem>
//   <ListItem
//     disablePadding
//     component={Link}
//     to={"/results"}
//     style={{ color: "white" }}
//   >
//     <ListItemButton>
//       <ListItemIcon>
//         <ContentPasteSearchIcon className="navDrawer__icon" />
//       </ListItemIcon>
//       <ListItemText primary={"Results"} />
//     </ListItemButton>
//   </ListItem>
//   <ListItem
//     disablePadding
//     component={Link}
//     to={"/single-view"}
//     style={{ color: "white" }}
//   >
//     <ListItemButton>
//       <ListItemIcon>
//         <SavedSearchIcon className="navDrawer__icon" />
//       </ListItemIcon>
//       <ListItemText primary={"Last Searched Anime"} />
//     </ListItemButton>
//   </ListItem>
//   <ListItem
//     disablePadding
//     component={Link}
//     to={"/friends"}
//     style={{ color: "white" }}
//   >
//     <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon className="navDrawer__icon" />
//       </ListItemIcon>
//       <ListItemText primary={"Friends"} />
//     </ListItemButton>
//   </ListItem>
// </List>
//       <Divider />
//     </Box>
//   );

//   return (
//     <div>
//       {["left"].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <IconButton size="small" onClick={toggleDrawer(anchor, true)}>
//             <MenuIcon />
//           </IconButton>
//           <Drawer
//             anchor={"left"}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             variant="temporary"
//             PaperProps={{
//               sx: {
//                 backgroundColor: "#363535",
//                 color: "white",
//               },
//             }}
//           >
//             <div className={classes.toolbar} />
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
