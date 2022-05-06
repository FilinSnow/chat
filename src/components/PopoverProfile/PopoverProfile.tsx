import React, { useCallback, useEffect, useState, useRef } from "react";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import "./PopoverProfile.scss";
import axios from "axios";
import defaultUser from "../../img/defaultUser2.jpeg";
import EditModal from "../editModal/EditModal";

const PopoverProfile = ({ anchorEl, setAnchorEl, userId }: any) => {
  const navigate = useNavigate();
  const userString: any = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [userInfo, setUserInfo] = useState<any>({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = (userInfo: any) => {
    setEditInfo({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      avatar: userInfo.avatar,
      email: userInfo.email,
    });
    setOpenEditModal(false);
  };

  const [editInfo, setEditInfo] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
  });

  useEffect(() => {
    setEditInfo({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      avatar: userInfo.avatar,
      email: userInfo.email,
    });
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(`https://docker-chat-app.herokuapp.com/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <div className="popover_container">
        <img
          src={
            editInfo.avatar === "defaultAvatar.png"
              ? defaultUser
              : editInfo.avatar
          }
          alt=""
        />
        <div className="popover_main_info">
          <div className="popover_container_info">
            <div className="popover_info">
              <span>
                {editInfo?.firstName} {editInfo?.lastName}
              </span>
              {/* <span>
                  Full Stack Developer Taganrog
                </span> */}
              <a
                onClick={() => navigate("/profile", { state: { id: userId } })}
              >
                View full profile
              </a>
            </div>
            <div className="popover_buttons">
              <div className="popover_button">Edit status</div>
              <div className="popover_button" onClick={handleOpenEditModal}>
                Edit profile
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
        userInfo={userInfo}
        editInfo={editInfo}
        setEditInfo={setEditInfo}
      />
    </Popover>
  );
};

export default PopoverProfile;
