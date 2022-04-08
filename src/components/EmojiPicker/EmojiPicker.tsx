import React, { useState } from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import "./EmojiPicker.scss";

interface IEmoji {
  value: any;
  setValue: any;
}

type Anchor = "bottom";

const EmojiPicker = ({ value, setValue }: IEmoji) => {
  const [state, setState] = useState({
    bottom: false,
  });
  const anchor = "bottom";

  const onEmojiClick = (event: any, emojiObject: any) => {
    setValue(value + emojiObject.emoji + " ");
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      className="boxWithEmoji"
    >
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus={true}
        skinTone={SKIN_TONE_MEDIUM_DARK}
        groupNames={{ smileys_people: "PEOPLE" }}
        native
      />
    </Box>
  );

  return (
    <React.Fragment key={anchor}>
      <Button className="emojiButton" onClick={toggleDrawer(anchor, true)}>
        Emoji
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        className="drawerWithEmoji"
      >
        {list(anchor)}
      </Drawer>
    </React.Fragment>
  );
};

export default EmojiPicker;
