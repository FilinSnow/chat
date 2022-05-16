import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import defaultUser from "../../img/defaultUser.png";
import PopoverProfile from "../PopoverProfile/PopoverProfile";
import { IMessage } from "../../utils/interfaces/interfaces";
import Text from "./Text";

const getReadableTime = (time: number | string) => {
  const t = new Date(time);
  const minutes = (t.getMinutes() < 10 ? "0" : "") + t.getMinutes();

  return `${t.getHours()}:${minutes}`;
};


const Message = ({ message, user: userStorage, oldDays }: IMessage) => {
  const { createData, user } = message[0];
  const { firstName, lastName, email, avatar } = user;
  const displayName = `${firstName} ${lastName}`;
  const isOwner = user._id === userStorage?._id;
  const isAvatar = avatar.includes("defaultAvatar.png") ? defaultUser : avatar;
  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null);


  const admindUids = [
    "dkikot.exceedteam@gmail.com",
    "vproskurin.exceedteam@gmail.com",
  ];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${firstName} ${lastName} [admin]`;

  const handleClick = (event: React.MouseEvent<HTMLImageElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  
  return (
    <div key={createData} className={isOwner ? "message-owner" : "message"}>
      <div className="message-container">
        <p className="user-name">{isAdmin ? adminName : displayName}</p>
        {message.map((item) => {
          const messageTime = getReadableTime(item.createData);
          const isOldDayMessage = oldDays.find((at) => at === item.createData);

          return (
            <React.Fragment key={item.createData}>
              {!!isOldDayMessage && (
                <div className="old-day">
                  {oldDays[oldDays.length - 1] === item.createData &&
                    moment(Number(oldDays[oldDays.length - 1])).format(
                      "DD MMMM YYYY"
                    ) === moment().format("DD MMMM YYYY") ? (
                    <p>today</p>
                  ) : (
                    <p>{moment(item.createData).format("DD MMMM YYYY")}</p>
                  )}
                </div>
              )}
              <div className="message-content">
                <Text item={item}/>
                <p
                  className={isOwner ? "message-date__owner" : "message-date"}
                >
                  {messageTime}
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <img
        src={isAvatar}
        className="avatar"
        alt="avatar"
        onClick={handleClick}
      />
      <PopoverProfile
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        userId={user._id}
      />
    </div>
  );
};

export default Message;
