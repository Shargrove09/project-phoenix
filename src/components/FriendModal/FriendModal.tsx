import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import { FormControl, IconButton, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FriendsContext } from "../../context/friends";

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

  const friends = useContext(FriendsContext);

  const [input, setInput] = useState("");

  const appenedToLocalStorage = (data) => {
    var oldStorage = JSON.parse(localStorage.getItem("myFriendsData")) || [];

    oldStorage.push(data[0]);
    localStorage.setItem("myFriendsData", JSON.stringify(oldStorage));
  };

  const handleAddFriend = (event) => {
    event.preventDefault(); // I think i need the page to refresh so maybe delete this
    friends.friendSearch(input).then((data) => {
      console.log("FriendModal data in", data);
      const dataValues = Object.values(data);
      console.log("DataVALUES IN MODAL", dataValues);
      friends.setFriendData(dataValues);
      appenedToLocalStorage(dataValues);
    });
  };

  return (
    <div>
      <Button
        className="friendModal__button"
        onClick={handleOpen}
        variant="contained"
      >
        Add Friends
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
          <form>
            <FormControl type="submit" className="friendModal__formControl">
              <TextField
                autoFocus="true"
                placeholder="Search for a friend (username)"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="friendModal__input"
                inputProps={{ style: { color: "white", width: "100%" } }} // Not doing anything
              />
              <IconButton
                className="friendModal__iconButton"
                variant="contained"
                color="primary"
                type="submit"
                disabled={!input}
                onClick={handleAddFriend}
              >
                <SearchIcon />
              </IconButton>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FriendModal;
