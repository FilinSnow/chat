import moment from "moment";
import React, { useState } from "react";
import defaultUser from '../../img/defaultUser.png'
import { IMessage } from "../../utils/interfaces/interfaces";
import OutsideClickHandler from 'react-outside-click-handler';

const getReadableTime = (time: number | string) => {
  const t = new Date(time);
  const minutes = (t.getMinutes() < 10 ? "0" : "") + t.getMinutes();

  return `${t.getHours()}:${minutes}`;
};

const reactionsArray = [
  {
    emoji: '😀',
    count: 3
  },
  {
    emoji: '❤️',
    count: 1
  },
  {
    emoji: '💩',
    count: 9
  }
];

const allowedEmojies = ['😀', '❤️', '💩', '👍', '👎'];

const Message = ({ message, firstCombined, lastCombined, theme = 'default', user: userStorage, oldDays }: IMessage) => {
  console.log("theme=", theme)
  const { createData, user, text, _id } = message;
  const { firstName, lastName, email, avatar } = user;
  const [isShowingReactions, setIsShowingReactions] = useState(false);
  const shouldHideName = lastCombined === user.email;
  const shouldCombineMessage = firstCombined === user.email;

  const displayName = `${firstName} ${lastName}`
  const isOwner = user?._id === userStorage?._id;
  const isAvatar = avatar.includes('default.png') ? defaultUser : avatar;
  
  const admindUids = [
    "dkikot.exceedteam@gmail.com",
    "vproskurin.exceedteam@gmail.com",
  ];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${firstName} ${lastName} [admin]`;

  const messageTime = getReadableTime(createData);
  const isOldDayMessage = oldDays.find((at) => at === createData);

  const addReaction = (emoji: string, id: string | undefined, uid: string) => {
    const react = {
      emoji: emoji,
      message_id: id,
      user_id: uid
    };
    console.log(react);
    setIsShowingReactions(false)
  }

  return (
    <div key={createData} className={isOwner ? "message-owner" : "message"} >
      {theme === "default" ? (
        <div className="message-content">
          <React.Fragment key={createData}>
            {!!isOldDayMessage && (
              <div className="old-day">
                {oldDays[oldDays.length - 1] === createData ? (
                  <p>today</p>
                ) : (
                  <p>{moment(createData).format("DD MMMM YYYY")}</p>
                )}
              </div>
            )}

            <div className="message-content-text">
              {/* {index === 0 && (
                <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  {displayName}
                </div>
              )} */}
              <div>{text}</div>
              <p className="message-date">{messageTime}</p>
            </div>
          </React.Fragment>
        </div>
      ) : (
        <OutsideClickHandler onOutsideClick={() => setIsShowingReactions(false)}>
          <div 
            className="message-container"
            onClick={() => setIsShowingReactions(true)}
          >
            {!shouldHideName && <p className="user-name">{isAdmin ? adminName : displayName}</p>}
            <React.Fragment key={createData}>
              {!!isOldDayMessage && (
                <div className="old-day">
                  {oldDays[oldDays.length - 1] === createData &&
                    moment(Number(oldDays[oldDays.length - 1])).format(
                      "DD MMMM YYYY"
                    ) === moment().format("DD MMMM YYYY") ? (
                    <p>today</p>
                  ) : (
                    <p>{moment(createData).format("DD MMMM YYYY")}</p>
                  )}
                </div>
              )}
              <div className="message-content">
                {text}
                <div className="message-footer">
                  <div className='reactions'>
                    {/* {reactionsArray.map((item: any, key: number) => {
                      return (
                        <div
                          key={key}
                          className="emoji-badge" 
                          onClick={() => addReaction(item.emoji, _id, user._id)}
                        >
                          <span className='emoji'>{item.emoji}</span>
                          <span className='emoji-count'>{item.count}</span>
                        </div>);
                    })} */}
                  </div>
                  <p className={isOwner ? "message-date__owner" : "message-date"}>
                    {messageTime}
                  </p>
                </div>
              </div>
              {isShowingReactions && 
                <div className="pick-reaction">
                  {allowedEmojies.map((item: any, key: number) => {
                    return (
                      <div className="emoji-badge" key={key} onClick={() => addReaction(item, _id, user._id)}>
                        <span className='emoji'>{item}</span>
                      </div>);
                  })}
                </div>
              }
            </React.Fragment>
          </div>
          </OutsideClickHandler>)
        }
        {!shouldCombineMessage ? 
          <img src={isAvatar} className="avatar" alt="avatar" /> 
          : 
          <div className='avatar-placeholder'></div>
        }
      </div>
  );
};

export default Message;
