import moment from "moment";
import React from "react";
import defaultUser from '../../img/defaultUser.png'
import { IMessage } from "../../utils/interfaces/interfaces";


const getReadableTime = (time: number | string) => {
  const t = new Date(time);
  const minutes = (t.getMinutes() < 10 ? "0" : "") + t.getMinutes();

  return `${t.getHours()}:${minutes}`;
};


const Message = ({ message, theme, user: userStorage, oldDays }: IMessage) => {
  const { createData, user } = message[0];
  const { firstName, lastName, email, avatar } = user;
  const displayName = `${firstName} ${lastName}`
  const isOwner = user?._id === userStorage?._id;
  const isAvatar = avatar.includes('default.png') ? defaultUser : avatar
  const admindUids = [
    "dkikot.exceedteam@gmail.com",
    "vproskurin.exceedteam@gmail.com",
  ];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${firstName} ${lastName} [admin]`;

  return (
    <div key={createData} className={isOwner ? "message-owner" : "message"}>
      {theme === "default" ? (
        <div className="message-content">
          {message.map((item, index) => {
            const messageTime = getReadableTime(item.createData);
            const isOldDayMessage = oldDays.find((at) => at === item.createData);
            return (
              <React.Fragment key={item.createData}>
                {!!isOldDayMessage && (
                  <div className="old-day">
                    {oldDays[oldDays.length - 1] === item.createData ? (
                      <p>today</p>
                    ) : (
                      <p>{moment(item.createData).format("DD MMMM YYYY")}</p>
                    )}
                  </div>
                )}

                <div className="message-content-text">
                  {index === 0 && (
                    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                      {displayName}
                    </div>
                  )}
                  <div>{item.text}</div>
                  <p className="message-date">{messageTime}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
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
                  {item.text ? item.text : <audio src={item.voice} controls></audio>}
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
      )}
      <img src={isAvatar} className="avatar" alt="avatar" />
    </div>
  );
};

export default Message;
