import React, { useCallback, useEffect, useState, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./EditModal.scss";
import { TextField } from "@mui/material";
import defaultUser from "../../img/defaultUser.png";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Input = styled("input")({
  display: "none",
});

const EditModal = ({
  openEditModal,
  handleCloseEditModal,
  userInfo,
  editInfo,
  setEditInfo,
}: any) => {
  const userString: any = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [editAvatar, setEditAvatar] = useState<any>({});

  const saveChange = () => {
    if (
      editInfo.firstName.trim() &&
      editInfo.firstName.trim() &&
      editInfo.firstName.trim() &&
      editInfo.firstName.trim()
    ) {
      axios
        .patch(
          `https://docker-chat-app.herokuapp.com/user/patch-me`,
          editInfo,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          handleCloseEditModal(editInfo);
        });
    } else {
      alert("Все поля должны быть заполнены");
    }
  };

  useEffect(() => {
    if (editAvatar["0"] !== undefined) {
      const formData = new FormData();
      formData.append("file", editAvatar["0"]);

      axios
        .post(`https://docker-chat-app.herokuapp.com/upload/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setEditInfo({
            ...editInfo,
            avatar: `https://docker-chat-app.herokuapp.com/images/${res.data}`,
          });
        });
    }
  }, [editAvatar]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openEditModal}
      onClose={() => handleCloseEditModal(userInfo)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openEditModal}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Edit your profile
          </Typography>
          <div className="main_editModal">
            <div className="editModal_info">
              <div>
                <div className="editModal_input">
                  <p>FirstName</p>
                  <TextField
                    id="demo-helper-text-misaligned-no-helper"
                    label="Name"
                    value={editInfo.firstName}
                    onChange={(e) =>
                      setEditInfo({ ...editInfo, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="editModal_input">
                  <p>LastName</p>
                  <TextField
                    id="demo-helper-text-misaligned-no-helper"
                    label="Name"
                    value={editInfo.lastName}
                    onChange={(e) =>
                      setEditInfo({ ...editInfo, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="editModal_input">
                  <p>Email</p>
                  <TextField
                    id="demo-helper-text-misaligned-no-helper"
                    label="Name"
                    value={editInfo.email}
                    onChange={(e) =>
                      setEditInfo({ ...editInfo, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="editModal_photo">
                <p>Profile photo</p>
                <img
                  src={
                    editInfo.avatar === "defaultAvatar.png"
                      ? defaultUser
                      : editInfo.avatar
                  }
                />
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => setEditAvatar(e.target.files)}
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                </Stack>
                <div
                  className="editModal_buttonRemove"
                  onClick={() =>
                    setEditInfo({ ...editInfo, avatar: "defaultAvatar.png" })
                  }
                >
                  Remove Photo
                </div>
              </div>
            </div>
            <div className="editModal_buttons">
              <div
                className="editModal_buttonCancel"
                onClick={() => handleCloseEditModal(userInfo)}
              >
                Cancel
              </div>
              <div
                className="editModal_buttonSave"
                onClick={() => saveChange()}
              >
                Save Changes
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditModal;
