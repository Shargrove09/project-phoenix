import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { FormControl, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFriendsContext } from "../../context/useFriendsContext";
import AddIcon from "@mui/icons-material/Add";

import "./FriendModal.scss";

const style = {
  backgroundColor: "#363535",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FriendModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { friendSearch, addToFriendsList } = useFriendsContext();

  const [input, setInput] = useState("");

  //
  const appendToLocalStorage = (data:any) => {
    let oldStorage = JSON.parse(localStorage.getItem("myFriendsData") || "[]");

    oldStorage.push(data);
    localStorage.setItem("myFriendsData", JSON.stringify(oldStorage));
  };

  const handleAddFriend = (event: any) => {
    event.preventDefault(); // I think i need the page to refresh so maybe delete this
    friendSearch(input).then((data) => {
      // Need to add this data to the friendslist - Should Check if Data is valid somewhere
      addToFriendsList(data.data);

      // Set to local storage as backup
      appendToLocalStorage(data.data);

      // Close Modal on Successful Friend Add
      handleClose();
    });
  };

  return (
    <div className="friendModal__container">
      <Button
        className="friendModal__button"
        onClick={handleOpen}
        variant="contained"
        sx={{
          marginTop: 15,
          marginRight: 15,
          borderRadius: "50%",
          padding: 0,
          height: 50,
          width: 50,
          minWidth: 50,
        }}
      >
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="friendModal__modalTitle" // Not doing anything
          >
            Add Friends
          </Typography>
          <form className="friendModal__form">
            <TextField
              autoFocus={true}
              placeholder="Search for a friend (username)"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="friendModal__input"
              inputProps={{ style: { color: "white", width: "100%" } }} // Not doing anything
            />
            <IconButton
              className="friendModal__iconButton"
              color="primary"
              type="submit"
              disabled={!input}
              onClick={handleAddFriend}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FriendModal;