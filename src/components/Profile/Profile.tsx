import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import defaultUser from "../../img/defaultUser.png";
import "./Profile.scss";
import axios from "axios";
import EditModal from "../editModal/EditModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { LocationState } from "../../utils/types/types";
import { IUserInfo } from "../../utils/interfaces/interfaces";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userString: any = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
      firstName: '',
      lastName: '',
      avatar: '',
      email: '',
      _id: ''
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = (userInfo: IUserInfo) => {
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
    const {id} = location.state as LocationState

    
    axios
      .get(`https://docker-chat-app.herokuapp.com/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      });
  }, []);

  return (
    <div className="main_conteiner_profile">
      <div className="conteiner_profile">
        <div className="profile_info">
          <div className="profile_backArrow">
            <div
              className="profile_item_backArrow"
              onClick={() => navigate("/chat")}
            >
              <ArrowBackIosIcon />
            </div>
          </div>
          <img
            src={
              editInfo.avatar === "defaultAvatar.png"
                ? defaultUser
                : editInfo.avatar
            }
          />
          <div className="profile_name">
            <span>
              {editInfo?.firstName} {editInfo?.lastName}
            </span>
            {/* <span>
              Full Stack Developer Taganrog
            </span> */}
          </div>
          {userInfo._id === user._id && (
            <div className="profile_buttons">
              <div className="button_edit">
                <div className="profile_button">
                  <SentimentSatisfiedAltIcon />
                </div>
                <p>Edit status</p>
              </div>
              <div className="button_edit" onClick={handleOpenEditModal}>
                <div className="profile_button">
                  <EditIcon />
                </div>
                <p>Edit profile</p>
              </div>
              <div className="button_edit">
                <div className="profile_button">
                  <MoreHorizIcon />
                </div>
                <p>More</p>
              </div>
            </div>
          )}
        </div>
        <div className="profile_moreInfo">
          <div className="moreInfo_container">
            <p className="moreInfo_title">Display name</p>
            <span>
              {editInfo?.firstName} {editInfo?.lastName}
            </span>
          </div>
          {/* <div className="moreInfo_container">
            <p className="moreInfo_title">
              Local time
            </p>
            <span>
              3:33 PM
            </span>
          </div>
          <div className="moreInfo_container">
            <p className="moreInfo_title">
              Phone number
            </p>
            <a href="#">
              823847324732
            </a>
          </div> */}
          <div className="moreInfo_container">
            <p className="moreInfo_title">Email address</p>
            <a href="#">{editInfo.email}</a>
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
    </div>
  );
};

export default Profile;
