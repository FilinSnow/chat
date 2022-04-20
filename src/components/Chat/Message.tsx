import moment from "moment";
import React from "react";

export type TMessage = {
  createdAt: number;
  text: string;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};
interface IMessage {
  message: Array<TMessage>;
  user: any;
  theme?: string | undefined;
  oldDays: Array<Number>;
}

const getReadableTime = (time: number) => {
  const t = new Date(time);
  const minutes = (t.getMinutes() < 10 ? "0" : "") + t.getMinutes();

  return `${t.getHours()}:${minutes}`;
};

const Message = ({ message, user, theme, oldDays }: IMessage) => {
  const { createdAt, uid, displayName, email, photoURL } = message[0];
  const isOwner = uid === user?.uid;

  console.log(oldDays, "oldDays");
  console.log(message, "message");
  console.log(oldDays[oldDays.length - 1], "oldDays[oldDays.length - 1]");
  console.log(1650446671817, "1650446671817");

  const admindUids = [
    "dkikot.exceedteam@gmail.com",
    "vproskurin.exceedteam@gmail.com",
  ];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${displayName} [admin]`;

  return (
    <div key={createdAt} className={isOwner ? "message-owner" : "message"}>
      {theme === "default" ? (
        <div className="message-content">
          {message.map((item, index) => {
            const messageTime = getReadableTime(item.createdAt);
            const isOldDayMessage = oldDays.find((at) => at === item.createdAt);
            return (
              <>
                {!!isOldDayMessage && (
                  <div className="old-day">
                    {oldDays[oldDays.length - 1] === item.createdAt ? (
                      <p>today</p>
                    ) : (
                      <p>{moment(item.createdAt).format("DD MMMM YYYY")}</p>
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
              </>
            );
          })}
        </div>
      ) : (
        <div className="message-container">
          <p className="user-name">{isAdmin ? adminName : displayName}</p>
          {message.map((item) => {
            const messageTime = getReadableTime(item.createdAt);
            const isOldDayMessage = oldDays.find((at) => at === item.createdAt);
            return (
              <>
                {!!isOldDayMessage && (
                  <div className="old-day">
                    {oldDays[oldDays.length - 1] === item.createdAt ? (
                      <p>today</p>
                    ) : (
                      <p>{moment(item.createdAt).format("DD MMMM YYYY")}</p>
                    )}
                  </div>
                )}
                <div className="message-content">
                  {item.text}
                  <p
                    className={isOwner ? "message-date__owner" : "message-date"}
                  >
                    {messageTime}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      )}
      <img src={photoURL} className="avatar" alt="avatar" />
    </div>
  );
};

export default Message;
